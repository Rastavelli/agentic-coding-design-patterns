# Birgitta Böckeler: candidate screening

Checked on 2026-09-21 against the current `CANDIDATES.md`. These are Böckeler's articles published on Martin Fowler's site, not articles authored by Fowler. Suggested names and chapter boundaries are editorial adaptations. No change to the backlog is made by this note.

## Direct evidence from the maintainability article

[Maintainability sensors for coding agents](https://martinfowler.com/articles/sensors-for-coding-agents.html), May 27, 2026, reports two mechanisms: contextual repair advice embedded in lint and dependency errors; mutation testing followed by agent analysis of surviving changes and missing assertions. Incremental mutation checks were manual because of cost. The experiment concerns regression sensitivity, not the correctness of requirements. These are application-level observations, not general guarantees. The relevant sections are “Guidance for self-correction”, “Dependency rules”, and “Mutation testing”. All examples and chapter distinctions below are our editorial proposals.

## Candidate: mutation-guided-test-hardening

Group: `verification`. The developer gives an agent a mutation report and asks it to explain survivors, identify missing behavioral assertions, strengthen the relevant tests, and rerun the measurement. Proposed chapter exercise: a suite stays green after deliberately breaking a mapper; the agent repairs the test's observation boundary and demonstrates that the mutation is now detected.

Editorial distinction: `tdd-with-agent` specifies an implementation sequence; `give-agent-a-way-to-verify` gives a completion check. This pattern checks the sensitivity of that check. `agent-workflow-evals` measures the agent workflow, while the subject here is the delivered application's tests. `approved-scenario-fixtures` and `held-out-acceptance-scenarios` address the correctness and independence of expected behavior; they do not replace this test-strength measurement.

Recommendation: strong candidate. A chapter should separate surviving relevant changes from equivalent or irrelevant mutants, keep the behavior contract stable, and avoid making a perfect score the goal. Those are proposed authoring constraints, not claims that the article has solved every such case.

## Candidate: actionable-diagnostics

Group: `context` or `verification`. Arrange for failed checks to return the violated constraint, local rationale, relevant project API or convention, and an actionable correction path. Proposed example: an import-boundary failure explains which layer owns the operation and where the call belongs, instead of reporting only a rule name.

Editorial distinction: `executable-guardrails` makes constraints enforceable; this makes enforcement output useful for correction. `claude-md-memory` delivers standing instructions; this supplies guidance exactly when the relevant failure occurs. It could be a substantial section inside `executable-guardrails` rather than a separate chapter. The teaching example should demonstrate a changed repair decision, not merely a prettier error message.

Recommendation: conditional candidate with an explicit merge option. Do not generalize the source's exception policy into allowing agents to relax mandatory controls. A project must decide which diagnostics are advisory and which boundaries cannot be changed to make the check pass.

## Candidate anti-pattern: self-confirming-tests

[TDD inside the agent loop — theater or actual value?](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) reports tests that derive the expected answer by running the same implementation they supposedly check, even in a test-first session. It also distinguishes observing a red test from establishing that it failed for the intended reason. The exploratory comparison is small, uses narrow greenfield tasks and largely model-based judgments, so it cannot establish that TDD generally helps or fails to help.

Group: `anti-pattern`. Proposed teaching example: a test compares `transform(input)` with another invocation of `transform(input)`; replace the expected value with a reviewed domain example or independently derived oracle. Unlike `premature-success`, the fault is inside the purported evidence, not merely the decision to stop. Unlike `vibe-coding`, the developer may be following a disciplined-looking test workflow and still obtain circular evidence.

Recommendation: strong candidate if the anti-pattern chapter focuses on oracle independence. It should cross-link to approved fixtures, held-out scenarios, and mutation-guided hardening instead of duplicating those remedies in full. Test independence is a longstanding testing concern; the agent-specific teaching problem is that production code and its purported evidence can be generated together.

## Existing topics to strengthen, not multiply

[How far can we push AI autonomy in code generation?](https://martinfowler.com/articles/pushing-ai-autonomy.html), August 5, 2025, describes an executable reference application used as a coherent source of examples, plus deterministic bootstrap scripts. These support `working-example-library` and `reproducible-agent-bootstrap`; they do not justify new names. The article's orchestration experiment is not itself a developer-workflow chapter proposal.

[Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html), April 2, 2026, distinguishes guidance and feedback and discusses different quality dimensions. Use it to frame existing context, guardrail, and verification chapters. “Harness engineering” alone is too broad to add as another small pattern beside them.
