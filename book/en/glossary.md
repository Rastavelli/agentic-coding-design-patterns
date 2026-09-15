---
source_rev: 41ffe61445820e8cf04a836addf315d74618f395
---

# Glossary

**Agent** — an LLM-based program the developer assigns tasks to, and which carries
them out by producing and changing code.

**Task setting** — how the developer states to the agent what needs to be done and
why.

**Context** — the data the agent sees while working: instructions, code, history,
attached materials.

**Specification** — a description of what the system should do and why:
scenarios, requirements, constraints, and acceptance criteria. The technical
solution belongs in the plan, not the specification.

**Plan** — a description of how to implement the specification: the
architectural approach, affected parts of the system, work sequence, and ways
to verify it.

**Context window** — the limited amount of text and data a model can take into
account in one session.

**Skill** — a saved procedure for an agent: instructions and, when needed,
scripts, templates, and reference material for a recurring workflow.

**Subagent** — a separate agent instance with its own context, to which the main
agent delegates a bounded part of the work.

**Oracle** — an independent source of a right-or-wrong answer: a test, linter,
build, screenshot, reference result, or verifiable user scenario.

**Testing seam** — a system boundary through which behavior can be observed and
verified without coupling the test to implementation details.

**Tracer-bullet ticket** — a small vertical slice of functionality that crosses
the necessary system layers and ends in independently verifiable behavior.

**Brownfield** — an existing system with accumulated constraints, contracts,
and decision history. **Greenfield** — a new system where those constraints do
not yet exist.

**SDD** — Spec-Driven Development: an approach in which an agreed specification
guides planning and implementation.

**Pattern** — a proven solution to a recurring problem of interacting with an agent.

**Anti-pattern** — a common way to make things worse: a tempting but harmful move
that has a better replacement.
