# Second source survey: developer practices

Checked on 2026-09-21. This pass looks beyond the source families in the first survey. A catalog is primary evidence of its contributors' proposed practices; vendor experience reports establish what their authors say they do, not independently measured effectiveness. Editorial priorities and overlap assessments below are ours.

## Augmented Coding Patterns

[The catalog](https://ai-coding-patterns.dev/pattern-catalog/) and its [source repository](https://github.com/lexler/augmented-coding-patterns) organize developer practices, obstacles, and antipatterns with explicit relationships. This is a particularly close match to the book's scope. It is a separate project from the similarly named aicodingpatterns.com, whose indexed articles mix general programming tutorials and agent architecture.

Three individual entries were checked:

- [Approved Scenarios](https://ai-coding-patterns.dev/patterns/approved-scenarios/), documented by Ivett Ördög: review the test runner once, then review domain-readable input/output fixtures and their changes. Candidate: `approved-scenario-fixtures`. The distinctive move is reducing human review of generated test code to review of explicit expected behavior. The developer must validate expectations independently; regenerating and accepting every snapshot would defeat the purpose.
- [Constrained Tests](https://ai-coding-patterns.dev/patterns/constrained-tests/): a test format requires inputs and expectations. Treat this as support for the same candidate, not another chapter. Reject the stronger claim that this makes coverage a reliable measure of test quality: mandatory fields alone cannot establish correctness or adequacy of expectations.
- [Slice for Review](https://ai-coding-patterns.dev/patterns/slice-for-review/): split an already completed large change into coherent review units. This differs in timing from upfront ticket decomposition but can extend `reviewable-agent-delivery`. Any book example should preserve the final behavior, check intermediate states, and respect ownership of published history. The article's specific size guidance is a heuristic.

Other catalog titles remain leads; inspecting the index does not constitute reviewing every entry. Several direct pages returned cache misses and are not used as evidence here.

## HumanLayer: context operations and concise checks

[Context Forking to Save Time, Tokens and Trouble](https://www.humanlayer.dev/blog/context-forking-to-save-time-trouble-and-tokens) describes branching from a shared researched context to explore alternative designs, or returning to a point before distracting material entered the conversation. Candidate: `context-forking`. This is conversation-state branching; `isolated-parallel-work` handles filesystem isolation, and `handoff` transfers a summary. A chapter must explicitly keep conversation state and code state consistent: rewinding one does not necessarily rewind the other. Tool-specific support needs checking when writing implementation instructions.

[Context-Efficient Backpressure](https://www.humanlayer.dev/blog/context-efficient-backpressure) gives a concrete wrapper that prints a concise success result and exposes diagnostic output on failure, retaining the command's exit status. This can strengthen `context-engineering` and `give-agent-a-way-to-verify`; no new chapter is needed yet. Our adaptation would keep full logs retrievable and preserve useful warnings. The article's model-specific context thresholds and performance estimates are not adopted as general facts.

These are first-party practitioner reports, with more concrete mechanisms than a generic best-practices list. They are not controlled comparisons.

## StrongDM: independent scenarios and test environments

Justin McCarthy's [Software Factories and the Agentic Moment](https://factory.strongdm.ai/) describes end-to-end scenarios held outside the implementation codebase to reduce adaptation to visible tests. Candidate: `held-out-acceptance-scenarios`. The book's developer-facing version would have a separately maintained acceptance suite that the implementing agent cannot edit or inspect in full. That access boundary is our operational adaptation, not a verified description of StrongDM's infrastructure. Ordinary requirements remain visible. This differs from `writer-reviewer` through independence of acceptance evidence and from `agent-workflow-evals` through evaluating the delivered application. A hidden suite can still be incomplete or leak through repeated feedback.

[Digital Twin Universe](https://factory.strongdm.ai/techniques/dtu) describes behavioral doubles of external services, calibrated against their observed behavior. Reserve as a verification-environment example: substantial overlap with established service virtualization, and clone fidelity requires ongoing work. StrongDM's throughput and cost claims are not independently verified here. Its broader policy of eliminating human code review is outside what these candidate rows endorse.

[Pyramid Summaries](https://factory.strongdm.ai/techniques/pyramid-summaries) describes storing summaries at several levels and expanding selected items. Use as an example in context engineering rather than another candidate. “Reversible” should mean retaining links to fuller representations and originals, not reconstructing omitted facts from a short summary.

## Result

Three additional candidates: `approved-scenario-fixtures`, `context-forking`, and `held-out-acceptance-scenarios`. The other techniques are supporting material or reserves. See [the companion catalog survey](pattern-sources-2026-09-21-round-2-catalogs.md) for additional independent sources. No chapter is accepted by this research pass.
