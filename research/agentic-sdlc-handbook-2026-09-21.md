# Agentic SDLC Handbook: candidate screening

Reviewed on 2026-09-21 against `CANDIDATES.md`, the Russian table of contents, and relevant existing chapters. Source: Daniel Meppiel's [Agentic SDLC Handbook](https://github.com/danielmeppiel/agentic-sdlc-handbook), using its published practical chapters. This is a targeted screening, not a full-book audit. Candidate names, boundaries, and teaching exercises below are our editorial adaptations. Both proposals are recorded as candidates, not accepted chapters.

## Candidate: instruction-activation-checks

Group: `context`. [The Load Lifecycle, chapter 14](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch14-the-load-lifecycle.html) separates dependency resolution, file placement, binding, and activation. The transferable idea is to locate a failure in the path by which instructions reach the agent before rewriting their wording.

Our proposed procedure distinguishes four observations: the file exists, the tool discovers it, its body enters context, and the resulting behavior follows it. These are diagnostic questions, not a claim that every tool implements four corresponding runtime stages. In particular, loading a rule does not prove compliance, and compliant output alone does not prove that the file loaded.

Proposed exercise: a migration skill exists but its conventions are absent from the generated migration. In a disposable fixture, inspect the actual tool's discovery and invocation evidence, compare explicit invocation with ordinary task selection, and verify the resulting behavior. Fix the demonstrated cause and repeat the same probe. Do not rely solely on the agent's claim that it read the skill.

Boundary: `context-engineering` covers context selection; `skills-as-packaged-workflows` covers packaging a procedure; this topic diagnoses why an intended instruction is ineffective. `agent-workflow-evals` measures behavior across representative tasks and repeated runs, rather than investigating one activation failure. Recommendation: conditional candidate; merge into the skills chapter if the example cannot sustain a distinct diagnostic procedure.

Evidence limit: the handbook's assertions about dispatchers, budget-driven down-ranking, load logs, and cross-tool file layouts were not independently verified. A chapter must establish what the selected tool actually exposes and explicitly mark unobservable stages. Do not present the author's lifecycle as a universal implementation contract.

## Candidate: bounded-retry-escalation

Group: `project-org`. [Anti-Patterns and Failure Modes, chapter 20](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch20-anti-patterns-and-failure-modes.html), sections 20.4.4 and 20.4.5, discusses repeated attempts without progress and disproportionate effort on the remaining difficult part of a task. The source recommends a retry budget and a changed approach when attempts stall.

Our proposed workflow sets an observable progress criterion and an attempt, time, or cost budget before delegation. On reaching the boundary without sufficient progress, the developer or workflow records attempted hypotheses, preserves verified work, and chooses a smaller task, new evidence, a different method, or human escalation. Rephrasing the same request is not automatically a new strategy. Exhausting the budget must leave the remaining work explicitly incomplete.

Proposed exercise: an agent repeatedly patches a failing integration test without changing the observed failure. After a task-specific attempt budget, it produces a short diagnostic handoff containing the reproducer, observed failure, attempted explanations, and the next unresolved question. The next pass investigates that question instead of repeating patches. Any saved partial result must be coherent and checked; a claimed completion percentage is insufficient.

Boundary: `premature-success` addresses stopping with unsupported success claims; this pattern addresses continuing without evidence of progress. `verified-recovery-points` supplies safe states to return to, while this pattern decides when to change strategy. `benchmark-guided-optimization` uses a budget for measured program optimization; this applies to ordinary implementation and debugging work. Recommendation: candidate with a distinct decision procedure.

Evidence limit: the source's two-failure threshold is a heuristic, not a validated universal optimum. Its suggestion to accept and commit the completed portion requires our additional condition that the portion is independently valid. Neither budget exhaustion nor a fresh session guarantees a better result.

## Additions to existing chapters

| Source | Existing destination | Proposed addition |
|---|---|---|
| [The Execution Meta-Process, chapter 18](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch18-the-execution-meta-process.html) | `isolated-parallel-work`, `tracer-bullet-tickets` | A dependency-ordered example with verification between batches and refreshed interface context before dependent work starts. Keep independently verifiable outcomes as task boundaries. |
| [The Deterministic/Probabilistic Boundary, chapter 16](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch16-deterministic-probabilistic-boundary.html) | `executable-guardrails` | Show a structured proposed action checked against a schema and allowed targets before a separate mechanism performs the write. Schema validity alone does not establish domain correctness. |
| [Primitives as Code, chapter 21](https://danielmeppiel.github.io/agentic-sdlc-handbook/handbook/ch21-primitives-as-code.html) | `skills-as-packaged-workflows`, `agent-workflow-evals` | Show two procedures whose duplicated checklist drifts; extract a shared source and track the version used. Begin with a shared local file; add packaging only when distribution needs justify it. |

These are follow-up ideas, not edits to the existing chapters. Chapter 20's recurring-correction loop also supports the existing `feedback-flywheel` candidate without creating another entry.

## Scope and source limitations

The leadership and organizational-transformation material is wider than this book's scope. Internal agent architectures and package-manager implementations do not automatically become developer-workflow patterns. An APM or PROSE tool-profile chapter is not proposed here.

Do not adopt “one file, one agent” as a universal task decomposition rule. Exclusive ownership can prevent conflicting writes, but a useful result commonly spans production code and tests. Likewise, the ability to proceed without questions does not establish that requirements are correct. Keep clarification available when new evidence exposes ambiguity.

Treat the handbook's project reports as experience reports, not general performance evidence. Verify tool-specific commands and behavior against the relevant implementation before turning these proposals into runnable examples. This note records independently phrased mechanisms and source links rather than reproducing handbook prose or diagrams.
