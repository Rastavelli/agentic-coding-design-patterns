# Frases para AGENTS.md

Un pequeño conjunto de reglas universales que vale la pena añadir a la
[memoria del proyecto](claude-md-memory.md) de casi cualquier repositorio. No
son configuración del proyecto ni comandos de compilación: son posturas sobre
*cómo* debe tomar decisiones el agente cuando la elección queda a su criterio.

El punto de partida es una lista de Marcos Hernanz que circuló por la red; las
dos últimas son añadidos de
[Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830).

Bloque listo para copiar:

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
```

Las reglas están en inglés: así las entiende cualquier herramienta que lea
AGENTS.md; si quieres, tradúcelas al idioma del equipo. Ten presente el límite
del capítulo [«Memoria del proyecto»](claude-md-memory.md): el archivo de
memoria *guía* el comportamiento del agente, pero no lo garantiza. Y mantén la
lista corta, o acabarás con [memoria hinchada](bloated-claude-md.md).

## Do not preserve backward compatibility

*No conserves la compatibilidad hacia atrás.*

Por defecto el agente va sobre seguro: deja campos viejos «por si acaso»,
acumula sobrecargas y amontona capas de compatibilidad alrededor de cada cambio.
En código interno mantenido por un solo equipo, eso es lastre puro: ramas
muertas y duplicación que nadie eliminará jamás. Esta regla permite al agente
cambiar el código con decisión: renombrar, borrar, reescribir firmas.

Límite: la regla encaja en aplicaciones y módulos internos. Para una biblioteca
pública o una API externa, la compatibilidad *es* el contrato con los usuarios;
allí habría que invertir la formulación.

## Choose the simplest implementation that fully meets the current requirements

*Elige la implementación más simple que cubra por completo los requisitos
actuales.*

El agente tiende a sobreingeniería: incorpora configurabilidad, abstracciones y
puntos de extensión para tareas que aún no existen. Esta regla lo devuelve a
YAGNI: resolver la tarea presente, no una futura imaginada. La palabra *fully*
importa: no es licencia para recortar, sino la exigencia de cubrir los
requisitos actuales por completo, y no más allá.

Pariente cercano del antipatrón
[«Especificación prematura»](premature-specification.md): en ambos, el daño está
en comprometer complejidad antes de que haya demanda para ella.

## Prefer established, well-maintained libraries over custom implementations

*Prefiere bibliotecas maduras y mantenidas antes que implementaciones propias.*

Sin instrucciones, el agente escribirá con gusto su propio parser de fechas, su
propia validación, su propio pool de conexiones: código que parece funcional
pero nunca pasó por el dolor de la producción ajena. Esta regla inclina la
elección hacia lo ya hecho: menos código que mantener, casos límite conocidos ya
resueltos.

Comprueba que la biblioteca sea de verdad *established* y *well-maintained* —un
repo vivo, releases recientes—, o la dependencia se convertirá en un lastre.

## Fix the cause, not the symptom

*Corrige la causa, no el síntoma.*

Ante un test que falla o un error, el agente gravita hacia el parche local:
ajustar la aserción, envolver en `try/catch`, adaptarlo a la entrada concreta.
El síntoma desaparece, la causa permanece y reaparece al lado. Esta regla exige
cavar hasta la raíz —por qué el valor era `null` en primer lugar— en vez de
amortiguar la manifestación.

Combina bien con la [Reflexión](reflection.md): antes de arreglar, el agente
explica *por qué* se rompió, y los parches se descartan en ese paso.

## Suggest best practices, even if they may require refactoring

*Propón buenas prácticas, aunque puedan requerir refactorización.*

Un agente que optimiza para «terminar la tarea con el diff más pequeño» se
encaja en silencio en código torcido y reproduce sus defectos. Esta regla le da
voz: si nota que la tarea se resuelve mejor refactorizando el código de
alrededor, que lo diga en lugar de rodearlo calladamente. La decisión sigue
siendo del humano, pero al menos la elección se vuelve consciente.

El reverso: el agente puede proponer refactorización demasiado a menudo; mantén
esta regla junto a las dos anteriores (implementación más simple, causa y no
síntoma) para que las sugerencias sigan siendo pertinentes.

## Capítulos relacionados

- [Memoria del proyecto](claude-md-memory.md) — dónde van estas frases y cómo
  funciona el archivo de memoria.
- [Memoria hinchada](bloated-claude-md.md) — por qué la lista debe mantenerse
  corta.
- [Ingeniería de contexto](context-engineering.md) — cada línea de memoria gasta
  presupuesto de atención en cada sesión.
