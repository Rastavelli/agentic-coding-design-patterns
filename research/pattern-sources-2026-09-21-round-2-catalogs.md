# Additional developer-workflow catalogs: second pass

Checked on 2026-09-21 against `CANDIDATES.md` and the first-pass research notes. These three source families are newly examined for the backlog; no claim is made about their launch dates. A source can be useful without producing a new chapter. Recommendations and overlap judgments below are editorial assessments.

## Paul Duvall: AI Development Patterns

Primary catalog: [AI Development Patterns](https://github.com/PaulDuvall/ai-development-patterns). This author-maintained collection is directly about developing software with AI, organized around the development lifecycle. Much of its coverage duplicates existing planning, memory, incremental work, review, hooks, and sandbox chapters. Its maturity labels are the author's classifications, not independently established efficacy evidence.

**Candidate: `visual-specification` (`task-setting`).** The directly read [Image Spec entry](https://github.com/PaulDuvall/ai-development-patterns#image-spec) uses a focused screenshot or mockup to communicate UI layout and visual intent. The developer adds behavior and technology constraints, asks for implementation, inspects a screenshot of the running result, annotates discrepancies, and repeats. The source explicitly limits its adoption argument to UI visuals rather than treating arbitrary architecture diagrams as executable specifications.

Editorial boundary: `spec-driven-development` establishes a behavioral contract; this provides a visual input and comparison loop when prose underspecifies appearance. `give-agent-a-way-to-verify` covers feedback generally; here the reference image is part of task definition. It deserves a chapter only if the example demonstrates how to reconcile appearance, responsive states, accessibility, and behavior. A screenshot alone cannot specify all of them. The source's linked example directory was not readable through the browser tool, so only the catalog section is verified.

## Kauan Polydoro: Agentic Workflows

Primary sources: [repository](https://github.com/kauanpolydoro/agentic-workflows), [workflow catalog](https://kauanpolydoro.github.io/agentic-workflows/catalog/), and [maintainer recipe audit](https://kauanpolydoro.github.io/agentic-workflows/quality/recipe-audit). This is a collection of engineering procedures for coding agents, with declared inputs, outputs, examples, and checks. Its documentation distinguishes installation compatibility from actual external-agent execution and human outcome review. Do not turn catalog presence or a structural validation result into a claim that a workflow has been demonstrated in practice.

**Provisional candidate: `reproduce-before-fix` (`verification`).** The catalog's “Build a bounded bug reproduction” workflow isolates reproduction from repair: turn a report into sanitized reproduction inputs, a failing regression test, and a repeatability record before changing product behavior. Unlike `tdd-with-agent`, this starts with an uncertain report about an existing system and asks whether the agent has reproduced the reported failure at all. Unlike `prototype-to-answer`, the question is an observed defect, not a proposed design.

The maintainer audit provides a useful specific limitation: a three-of-three clean-run sample supports a bounded repetition claim, not universal determinism, root-cause proof, or a completed fix. This is a strong teaching distinction for agents that jump from a plausible diagnosis to edits. However, the individual recipe page and raw workflow file returned browser cache misses in this pass. The catalog and detailed first-party audit establish the proposal, but a full recipe-level check remains pending. Cite the readable catalog and audit rather than presenting an unread recipe URL as verified.

**Reserve: documentation claims checked against implementation.** The catalog's “Synchronize documentation with verified behavior” describes comparing claims against evidence at a fixed revision and retaining a drift register plus a bounded patch. The audit names patch applicability and separate post-edit checks as concrete concerns. This might become `evidence-backed-documentation`, but overlaps `agent-residue-cleanup`, `reviewable-agent-delivery`, and `domain-context-file`; do not add another row merely for the task label. Its individual recipe was also unavailable in this pass.

The readable [reference-evaluations page](https://kauanpolydoro.github.io/agentic-workflows/launch/reference-evaluations) explicitly describes a fixture agent that replays a maintained output. That verifies runner and artifact contracts, not model reasoning or real task completion. Repository and indexed audit snapshots expose different review dispositions, so this report deliberately avoids a claim that the whole current release is approved or production-ready.

## GSA-TTS: Agentic Coding Patterns

Primary sources: [repository](https://github.com/GSA-TTS/agentic-coding-patterns) and [generated catalog](https://github.com/GSA-TTS/agentic-coding-patterns/blob/main/CATALOG.md). This is a maintainer-owned community collection of coding-agent instructions, skills, workflows, and lessons; it is not a generic autonomous-agent architecture catalog. The README says no entries have yet passed its promotion gate into `recommended`, so use it as an experimental source of procedures rather than an established standard. Its federal policy setting also requires adaptation before generalizing requirements.

**Lead only: over-engineering review.** The catalog lists a dedicated `over-engineering-review` skill consuming source or a diff and producing a QA report. That is a promising way to investigate agent-generated unnecessary abstractions, but the individual skill page did not load in this pass. Its mechanism cannot responsibly be reconstructed from the title. Do not add a candidate until the primary skill has been inspected, and then compare it with `writer-reviewer`, `agent-residue-cleanup`, and the existing architecture skills.

Other listed security, documentation, and issue-to-merge workflows may be useful examples for existing chapters. A specialized review label alone does not establish a distinct transferable interaction pattern.

## Disposition

Promote `visual-specification` as a fully read proposal. Retain `reproduce-before-fix` as a promising candidate with the recipe-fetch limitation explicit. Record the GSA collection for later mining, without inventing a candidate to satisfy a source-count target. None of these findings changes an existing rejection or establishes productivity gains.
