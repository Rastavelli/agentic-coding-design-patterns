---
group: project-org
status: translated
related: [isolated-parallel-work, progress-file, give-agent-a-way-to-verify]
source_rev: f21809796e9353bbe866014510bf4a1cf5ea3b6d
---

# Inicio reproducible del agente

## Propósito

Dar a cada sesión o worktree nuevo un comando que prepare dependencias y configuración local segura, y después demuestre que el estado inicial funciona. El agente parte de un baseline verde conocido en vez de gastar contexto en arqueología de arranque.

## También conocido como

Reproducible agent bootstrap, configuración con un comando, script inicializador, baseline verde.

## Problema

Una sesión nueva abre el repositorio y no sabe cómo ponerlo en marcha. El README enumera cinco comandos, uno está obsoleto, el `.env` debe reconstruirse desde un chat, la base necesita una migración manual y la verificación exige otro servicio. El agente prueba combinaciones, cambia configuración por accidente y termina ante una prueba fallida.

Ahora nadie sabe si falló la tarea, el agente o el entorno inicial. Empezar sobre un baseline rojo mezcla defectos del producto con defectos de instalación. Cada worktree repite el coste, así que el paralelismo multiplica preparación en vez de rendimiento.

«Instalar dependencias» no basta. Estar listo significa que existen las herramientas, hay configuración segura, los servicios o fixtures están preparados y pasa una comprobación smoke mínima de extremo a extremo.

## Solución

Ofrece un único punto de entrada idempotente —como `make setup` o `./scripts/bootstrap`— que transforme un entorno limpio soportado en un **baseline verde verificado**.

El bootstrap tiene cuatro fases:

1. **Validar prerrequisitos:** comprobar versiones de runtime y herramientas en vez de confiar en un PATH casual.
2. **Preparar estado local:** dependencias, `.env` seguro, fixtures, migraciones y recursos propios de la instancia.
3. **Iniciar o describir servicios:** el comando de arranque es conocido y no tiene pasos interactivos.
4. **Demostrar preparación:** una comprobación smoke recorre un camino clave de usuario y devuelve un código claro.

El comando debe poder repetirse con seguridad. No necesita secretos de producción, no toca datos de usuario y no oculta un baseline rojo. Si falta algo, el error indica la corrección concreta.

Bootstrap se ocupa del arranque, no de toda la matriz de pruebas, y no debe actualizar dependencias por su cuenta. La reproducibilidad requiere versiones fijadas y el mismo resultado hoy y en el siguiente worktree.

## Estructura

![Estructura del inicio reproducible](../assets/reproducible-agent-bootstrap/structure.svg)

Una sesión nueva con estado desconocido invoca un comando. Este valida herramientas, crea estado seguro y ejecuta una comprobación smoke. Solo el verde abre el trabajo; el rojo lo detiene y separa el fallo del entorno del futuro diff.

## Participantes / Componentes

- **Base soportada** — versiones explícitas de SO, runtime y herramientas.
- **Comando bootstrap** — punto de entrada único e idempotente.
- **Lockfile** — fija las versiones permitidas de dependencias.
- **Configuración segura** — valores locales y fixtures sin secretos de producción.
- **Recursos aislados** — puertos, bases y nombres de contenedores de esta instancia.
- **Comprobación smoke** — prueba rápida de funcionamiento mínimo.
- **Agente** — ejecuta bootstrap antes de profundizar y registra el resultado como baseline.

## Cuándo aplicarlo

- Desarrolladores, agentes, jobs de CI o worktrees nuevos abren el repositorio con frecuencia.
- El arranque requiere más de un comando obvio o servicios externos.
- Las sesiones son cortas y la preparación repetida consume contexto apreciable.
- Las tareas paralelas necesitan instancias locales independientes.
- A menudo se descubre que las pruebas ya fallaban antes del cambio.

Para una biblioteca sin dependencias de runtime, bootstrap puede ser una línea. El patrón exige un punto de entrada verificado, no un script grande.

## Consecuencias y compromisos

- ➕ Un fallo antes del verde pertenece al entorno; uno nuevo después pertenece al cambio.
- ➕ Las sesiones se orientan antes y gastan contexto en el producto.
- ➕ Worktrees y CI siguen el mismo camino, reduciendo «funciona en mi máquina».
- ➕ La documentación de arranque se prueba al ejecutarse.
- ➖ Bootstrap se convierte en un producto dentro del producto y necesita mantenimiento.
- ➖ La preparación completa puede ser lenta; caché y un smoke enfocado ayudan sin saltar fases.
- ➖ La idempotencia es difícil con bases y servicios; una repetición descuidada puede borrar datos.
- ➖ Los fixtures locales pueden diferir demasiado de producción y dar falsa confianza.

## Implementación

1. Escribe el camino desde un checkout limpio hasta la primera acción de usuario exitosa. Elimina pasos que solo viven en notas personales.
2. Fija versiones de runtime y dependencias mediante lockfiles. Rechaza versiones incompatibles pronto y con un error útil.
3. Crea configuración desde un ejemplo seguro. No copies tokens reales ni sobrescribas un `.env` existente implícitamente.
4. Haz los pasos idempotentes: repetir confirma o actualiza de forma segura sin duplicar datos.
5. Aísla la instancia: deriva base, puerto y proyecto Compose del nombre del worktree o de un parámetro.
6. Termina con un smoke corto a través de la interfaz del usuario: HTTP, CLI o navegador.
7. Devuelve estado distinto de cero ante cualquier fase incompleta e imprime el siguiente paso seguro.
8. Ejecuta bootstrap en CI desde un entorno limpio para que no caduque sin ser visto.

## Ejemplo

Un servicio expone un comando:

```make
setup:
	pnpm install --frozen-lockfile
	cp -n .env.example .env.local || true
	docker compose up -d db
	pnpm db:migrate
	pnpm smoke
```

El ejemplo muestra la forma, pero necesita endurecerse: `cp -n` no debe ocultar configuración inválida, el proyecto Compose y el puerto deben parametrizarse, y smoke debe esperar la base con timeout limitado.

El agente empieza así:

```text
$ make setup
runtime: node 24.8.0 ✓
dependencies: lockfile unchanged ✓
database: agent_auth_42 ready ✓
smoke: create and read note ✓
baseline: green
```

Si smoke falla antes de editar, el agente no inicia una funcionalidad y registra el problema del entorno aparte. Si la misma comprobación falla después, el límite causal es conocido.

## Antipatrones y errores comunes

- **README en vez de comando.** Cinco pasos manuales divergen y se ejecutan distinto cada vez.
- **Solo instalación.** Hay paquetes, pero no se verifican configuración, base ni camino de usuario.
- **Secretos de producción.** El arranque local exige un token amplio de producción.
- **Setup no idempotente.** La segunda ejecución duplica fixtures, reinicia datos o rompe la primera.
- **Verde a cualquier precio.** `|| true` oculta un error y llama exitoso a un arranque parcial.
- **Versiones flotantes.** El mismo comando instala mañana otro conjunto de dependencias.
- **Recursos compartidos.** Todos los worktrees usan una base y un puerto, y chocan.
- **Suite completa pesada.** Setup tarda una hora cuando un smoke de cinco minutos demuestra el arranque; la gente deja de ejecutarlo.

## Usos conocidos

- **El harness de Anthropic para agentes de larga duración** usa un agente inicializador que crea `init.sh`; cada sesión posterior inicia el servidor y ejecuta una prueba end-to-end básica antes de trabajar.
- **Los contenedores de desarrollo** codifican runtime, paquetes y comandos de preparación en configuración versionada.
- **CI desde un checkout limpio** demuestra continuamente que la instalación funciona sin el estado de la máquina del autor.

Fuente: [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents).

## Patrones relacionados

- [Trabajo paralelo aislado](isolated-parallel-work.md) — crea worktrees; bootstrap prepara cada uno y separa recursos externos.
- [Diario de progreso](progress-file.md) — cuenta a una sesión nueva qué ocurrió después del baseline verificado.
- [Bucle de retroalimentación](give-agent-a-way-to-verify.md) — smoke es el primer bucle corto antes de implementar.
- [Una funcionalidad a la vez](one-feature-at-a-time.md) — el inicio verde garantiza que la pasada empieza una funcionalidad nueva y no repara daños heredados desconocidos.
