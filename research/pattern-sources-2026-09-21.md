# Additional pattern catalogs: research notes

Checked on 2026-09-21 against the current `CANDIDATES.md`. “New” below means absent from its source list, not newly launched. These are editorial candidates, not accepted chapters or experimentally established productivity claims. The inspected catalogs are primary evidence for their authors' pattern formulations; implementation claims are checked separately where available.

## Verified checkpoints and rollback

Backlog slug: `verified-recovery-points`; group: `project-org`; recommendation: candidate. Alex Serban's [Rollback & Reversibility](https://se-ml.github.io/agentic_patterns/08-rollback-reversibility/) explicitly calls for a verified baseline, a recovery point before risky work, checkpoints after coherent verified units, and rollback to a consistent state. The entry is dated May 25, 2026. The developer's move is to decide recovery boundaries before an agent accumulates dependent edits, so one failed attempt need not discard the entire session.

Overlap assessment: `isolated-parallel-work` covers concurrent ownership, while this applies to a single session and recovery after failure. `one-feature-at-a-time` limits scope; this preserves known-good states. The chapter would need a concrete failing multi-file change and recovery demonstration. Do not copy the source's broad `git add -A` or `git reset --hard` examples without ownership boundaries: editorial adaptation should preserve unrelated user work and account for non-Git state. Source sections verified: Intent, Correct Use, How to Apply the Pattern, Match the Rollback Level to the Failure Scope.

## Explicit cleanup after agent work

Backlog slug: `agent-residue-cleanup`; group: `project-org`; recommendation: candidate, narrower chapter or verification subsection if the treatment stays generic. Serban's [Cleanup & Hygiene](https://se-ml.github.io/agentic_patterns/09-cleanup-hygiene/) prescribes cleanup after steps, after tasks, and periodically; it lists temporary files, debug statements, dead code, unused imports, and stale documentation. It also explicitly distinguishes cleanup from removing diagnostic evidence, including failing tests. The entry is dated May 25, 2026.

Overlap assessment: passing checks in `give-agent-a-way-to-verify` does not establish that experimental scaffolding and repository residue are gone. `writer-reviewer` is a review arrangement, not an explicit cleanup phase. A worthwhile chapter would show working code that still leaves maintenance debris, a bounded cleanup pass, and renewed verification. Avoid turning this into permission for unrelated repository-wide refactoring. Source sections verified: Intent, How to Apply the Pattern, Multiple Cleanup Levels, Practices.

## Optimization with a retained best result

Backlog slug: `benchmark-guided-optimization`; group: `verification`; recommendation: candidate. Kagan's [Patterns of AI Agent Workflows](https://kagan.ai/catalog/vol-01/) names “Autoresearch (Ratchet Loop)”: make a bounded change, measure it, retain improvements, revert regressions, and keep a history of experiments. Its developer-facing form requires choosing the objective, allowed change surface, fixed evaluator, runtime budget, and stopping conditions before delegation.

The cited primary implementation, Karpathy's [autoresearch program.md](https://github.com/karpathy/autoresearch/blob/master/program.md), confirms a baseline run, one editable training file, a protected evaluation file, a five-minute training budget, a results log, and keeping or discarding experimental commits according to the measured result. It also allows simplicity to influence retention and treats crashes separately. This verifies the mechanism, not universal performance claims. No benchmark improvement figures from the catalog are adopted here.

Overlap assessment: `reflection` uses critique; this relies on an external objective and explicit retention/reversion. `agent-workflow-evals` evaluates the workflow itself; here the agent improves the software under measurement. `give-agent-a-way-to-verify` usually establishes correctness, whereas this searches among correct alternatives. Risks to discuss include optimizing an incomplete metric, measurement noise, evaluator tampering, and spending the budget on negligible gains. The original unattended loop is an implementation example; a book adaptation should make the developer's experiment contract central.

## Vetted example library as a source of context

Suggested disposition: merge into the root researcher's `working-example-library` candidate rather than add another row. [Codebase-Derived Pattern Libraries as Agent Context](https://agentpatterns.ai/context-engineering/codebase-pattern-library-context/) describes selecting useful implementations from one's own repositories and retrieving them by intent during new work. This is a concrete private-codebase variant of supplying working examples, not a separate general retrieval architecture chapter.

The first-party [Pattern Vault getting-started guide](https://arunksingh16.github.io/pattern-vault/getting-started/) verifies codebase indexing, AST-only dry runs, curated ingestion, and intent search. It also lists remote model backends alongside local Ollama, so do not infer that every configuration keeps source code entirely local. The catalog's privacy and quality claims are conditional, not measured guarantees. Stale examples and reuse of existing bad conventions remain important limitations.

## CLI tools shared by humans and agents

Suggested slug: `shared-cli-tools`; group: `project-org`; recommendation: reserve or merge into `skills-as-packaged-workflows`. Lucas Carlson's [CLI-First Skill Design](https://www.agentic-patterns.com/patterns/cli-first-skill-design) proposes one callable command interface for both developers and agents, including structured output, meaningful exit codes, help, and automation-friendly operation. The distinctive developer action is to make important workflows directly runnable and debuggable outside the agent.

Evidence caveat: the catalog's linked “primary source” is the general Claude Code repository, which does not by itself substantiate the catalog's full prescription. Treat this as Carlson's proposal, not an official universal rule or proven production result. The page also uses “skill” more broadly than a `SKILL.md` package, so terminology needs care. Existing `skills-as-packaged-workflows` and `reproducible-agent-bootstrap` may absorb this without another chapter.

## Catalog coverage and exclusions

- [SE-ML: Agentic Coding, A Pattern Language](https://se-ml.github.io/agentic_patterns/) is directly aligned with supervised developer workflows. Most of its nine patterns duplicate existing chapters; rollback and cleanup are the useful gaps. Its introduction explicitly cautions that the patterns are not evidence-backed guarantees.
- [AgentPatterns.ai](https://agentpatterns.ai/) is newly inspected relative to the backlog. It mixes developer practices, agent architecture, papers, and product-specific guidance; follow its references before promoting claims. The vetted-example entry above has a first-party implementation trail.
- [Kagan's workflow catalog](https://kagan.ai/catalog/vol-01/) was directly readable without `www`; the `www` catalog landing page returned a browser cache miss. Most entries concern agent architecture. Autoresearch has a developer-controlled experiment setup and a verifiable implementation.
- [Awesome Agentic Patterns](https://www.agentic-patterns.com/) is the website for the already-listed `nibzard/awesome-agentic-patterns`, so it is not an independent new source family. Its maturity badges are publisher classifications, not independently verified evidence.
- [Agent Patterns Catalog](https://www.agentpatternscatalog.org/) was inspected at its landing page, but its pattern index exposed no usable article content in this pass. No candidate or implementation claim was accepted from that catalog.

## Editorial priority

Promote verified checkpoints and measured optimization first; retain cleanup as a candidate with a clear chapter-size test. Merge the private example-library variant into `working-example-library`. Keep shared CLI tools in reserve because the book already covers workflow packaging. This yields three additional distinct candidates across SE-ML and Kagan, without inflating the backlog with duplicate names.

## Walkthroughs, explanations, and working examples

Simon Willison's guide was already listed as a lead; this pass checked individual chapters. [Linear walkthroughs](https://simonwillison.net/guides/agentic-engineering-patterns/linear-walkthroughs/) demonstrates an ordered repository explanation with code snippets extracted by commands. [Interactive explanations](https://simonwillison.net/guides/agentic-engineering-patterns/interactive-explanations/) demonstrates an animated word-cloud explanation to build understanding of an existing algorithm. These support `linear-code-walkthrough` and `interactive-code-explanation`; they may become one chapter if their independent treatments are too thin. Our additional requirement to compare the explanation against the implementation is an editorial safeguard, not evidence that generated visualizations are automatically faithful.

[Hoard things you know how to do](https://simonwillison.net/guides/agentic-engineering-patterns/hoard-things-you-know-how-to-do/) demonstrates collecting working examples and combining them in subsequent tasks. It supports `working-example-library`, with the codebase-derived library above as a variant. The reusable artifact is code with evidence and assumptions, whereas a skill packages a procedure. Existing TDD and baseline-verification chapters in Willison's guide were screened as overlaps, not new rows.

## Delivery and approval load

Bartley Editions' [Agentic Pull Request](https://aipatternbook.com/agentic-pull-request) proposes packaging work with rationale, revision-specific verification evidence, and feedback that the agent can act on. It supports `reviewable-agent-delivery`, distinct from the independent reviewer arrangement in `writer-reviewer`. We use the catalog as primary evidence of its proposed formulation; its numerical examples and broader empirical claims were not adopted.

[Approval Fatigue](https://aipatternbook.com/approval-fatigue) describes repetitive confirmations becoming mechanical approval and proposes fewer, risk-sensitive decision points. It supports the antipattern candidate `approval-fatigue`, complementing executable restrictions with a discussion of human attention. The page's illustrative incidents are not treated as measured case studies.

## Learning across sessions

Rahul Garg's original [Feedback Flywheel](https://martinfowler.com/articles/reduce-friction-ai/feedback-flywheel.html), published April 8, 2026, proposes routing observations from sessions into shared context, commands, workflows, and guardrails. The broader [series](https://martinfowler.com/articles/reduce-friction-ai/) explicitly calls the expected benefits hypotheses rather than validated findings. Prefer this original over the encyclopedia's retelling, which attributes the pattern to February (the series launch) and includes quantitative examples we did not verify.

`feedback-flywheel` remains conditional: the current `claude-md-memory` chapter already tells readers to capture repeated corrections. The case for a separate chapter is the team process for reviewing, testing, maintaining, and retiring changes across several shared artifacts. Without that additional mechanism, extend the memory chapter instead.

## Collection outcome

Nine candidate rows were added to `CANDIDATES.md`, with six source families supporting them: Simon Willison, Bartley Editions, Rahul Garg on martinfowler.com, SE-ML, Kagan, and AgentPatterns.ai (example-library support). Five families are new to the previous source list; Willison was already a lead. Priority is an editorial judgment: begin with working examples, verified recovery, and benchmark-guided optimization; then evaluate the explanation and delivery topics. Keep the documented merge options open. No candidate was accepted and no existing author rejection was changed.
