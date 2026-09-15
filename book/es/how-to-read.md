# Cómo leer este libro

## Qué es un patrón

Un patrón describe un problema recurrente y una forma probada de resolverlo,
expresada de modo que la solución pueda aplicarse muchas veces sin reinventarla.
Un patrón no es código listo para usar, sino una idea que adaptas a tu contexto.

## Estructura de un capítulo

El libro contiene tres tipos de material: patrones, antipatrones y perfiles de
herramientas. Los patrones siguen una única plantilla para que los capítulos
sean comparables:

- **Propósito** — qué resuelve el patrón.
- **Problema** — la situación y las fuerzas que llevan al patrón.
- **Solución** — la idea a nivel de principio.
- **Estructura** — un diagrama de los recursos compartidos.
- **Cuándo aplicarlo** y **Consecuencias** — condiciones y compromisos.
- **Implementación** y **Ejemplo** — cómo llevarlo a cabo.
- **Antipatrones**, **Usos conocidos**, **Patrones relacionados**.

Los antipatrones parten de una acción errónea pero tentadora, explican sus
consecuencias y ofrecen un reemplazo positivo. Los perfiles de OpenSpec,
Superpowers y los skills de Matt Pocock funcionan como fichas prácticas:
instalación, flujo de trabajo, artefactos, diferencias y criterios de elección.
Como los comandos dependen de las versiones, cada perfil indica la fecha en que
se comprobó.

## Grupos

Los patrones se agrupan por área del trabajo con un agente: planteamiento de la
tarea, desarrollo orientado a especificaciones, trabajo con el contexto,
verificación y organización del proyecto. Los **antipatrones** viven en una
sección aparte: errores comunes al interactuar con un agente y su análisis. La
agrupación es visible en el [contenido](SUMMARY.md); dentro del repositorio todos
los capítulos son planos, cómodos de leer también en GitHub.

## Cómo elegir un patrón

No hace falta leer el libro en orden. Empieza por la situación en la que estás:

| Situación | Empieza por | Qué obtienes | Coste principal |
|-----------|-------------|--------------|-----------------|
| Un cambio pequeño pero no obvio | [Cuatro fases](explore-plan-code-commit.md) | Un enfoque acordado antes de cambiar código | Una revisión separada del plan |
| La idea aún solo está en tu cabeza | [Entrevista del agente](let-claude-interview-you.md) | Una definición autocontenida de la tarea | Hay que responder preguntas |
| Un plan terminado parece demasiado perfecto | [Grilling](grilling.md) | Huecos descubiertos y decisiones explícitas | La conversación puede revelar más trabajo |
| La funcionalidad durará más de una sesión | [Desarrollo orientado a especificaciones](spec-driven-development.md) | Especificación, plan y tareas verificables | Hay que mantener los artefactos |
| Necesitas demostrar la corrección | [Bucle de retroalimentación](give-agent-a-way-to-verify.md) | Un ciclo verificable hasta el resultado | La calidad queda limitada por el oráculo |
| El trabajo es demasiado grande o se expande | [Una funcionalidad a la vez](one-feature-at-a-time.md) y [tickets trazadores](tracer-bullet-tickets.md) | Cortes pequeños y terminados | Más puntos de coordinación |
| El trabajo debe continuar en un contexto nuevo | [Diario de progreso](progress-file.md) o [traspaso de sesión](handoff.md) | Un estado de trabajo recuperable | Los documentos exigen disciplina |
| No sabes si una idea sobrevivirá a la realidad | [Prototipo desechable](prototype-to-answer.md) | Respuesta a una pregunta de diseño | Hay que desechar el prototipo |

El diario de progreso se mantiene continuamente; el traspaso de sesión se crea
en un límite concreto de contexto. La reflexión pide al autor que critique su
propio resultado, mientras que [Escritor y revisor](writer-reviewer.md) entrega
la comprobación a un contexto nuevo. TDD es una forma estricta del bucle de
retroalimentación para comportamientos que se pueden expresar como tests.

La [Lista de funcionalidades](feature-list-harness.md) guarda el estado
verificable de todo el trabajo, mientras Una funcionalidad a la vez limita el
alcance de una sola pasada. Los tickets trazadores sirven para dividir una
funcionalidad grande ya entendida en cortes verticales con dependencias. El
[Mapa de investigación](wayfinder.md) se aplica antes, cuando la ruta al
resultado todavía se desconoce y primero hay que resolver preguntas de
investigación.
