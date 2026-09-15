---
source_rev: 41ffe61445820e8cf04a836addf315d74618f395
---

# Glosario

**Agente** — programa basado en un LLM al que el desarrollador asigna tareas y que
las realiza generando y modificando código.

**Planteamiento de la tarea** — cómo el desarrollador expresa al agente qué hay
que hacer y por qué.

**Contexto** — los datos que el agente ve al trabajar: instrucciones, código,
historial, materiales adjuntos.

**Especificación** — descripción de qué debe hacer el sistema y por qué:
escenarios, requisitos, restricciones y criterios de aceptación. La solución
técnica pertenece al plan, no a la especificación.

**Plan** — descripción de cómo implementar la especificación: enfoque
arquitectónico, partes afectadas del sistema, orden del trabajo y formas de
verificarlo.

**Ventana de contexto** — cantidad limitada de texto y datos que un modelo puede
tener en cuenta en una sesión.

**Skill** — procedimiento guardado para un agente: instrucciones y, cuando hace
falta, scripts, plantillas y material de referencia para un flujo recurrente.

**Subagente** — instancia separada de un agente, con su propio contexto, a la que
el agente principal delega una parte acotada del trabajo.

**Oráculo** — fuente independiente de una respuesta correcta o incorrecta: un
test, linter, build, captura de pantalla, resultado de referencia o escenario de
usuario verificable.

**Costura de testing** — límite del sistema a través del cual se puede observar
y verificar el comportamiento sin acoplar el test a detalles de implementación.

**Ticket bala trazadora** — pequeño corte vertical de funcionalidad que atraviesa
las capas necesarias del sistema y termina en un comportamiento verificable por
separado.

**Brownfield** — sistema existente con restricciones, contratos e historial de
decisiones acumulados. **Greenfield** — sistema nuevo donde esas restricciones
aún no existen.

**SDD** — Spec-Driven Development, o desarrollo orientado a especificaciones: un
enfoque en el que una especificación acordada guía la planificación y la
implementación.

**Patrón** — solución probada a un problema recurrente de interacción con un agente.

**Antipatrón** — una forma común de empeorar las cosas: un movimiento tentador
pero dañino que tiene un reemplazo mejor.
