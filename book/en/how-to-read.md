---
source_rev: 7e55f190b32a442a316091c9b62608c9ee3aaaec
---

# How to read this book

## What a pattern is

A pattern describes a recurring problem and a proven way to solve it, stated so
the solution can be applied many times without reinventing it. A pattern is not
ready-made code but an idea you adapt to your context.

## Chapter structure

The book contains three kinds of material: patterns, anti-patterns, and tool
profiles. Patterns follow one template so chapters stay comparable:

- **Intent** — what the pattern solves.
- **Problem** — the situation and forces that lead to the pattern.
- **Solution** — the idea at the level of principle.
- **Structure** — a diagram from the shared assets.
- **When to use** and **Consequences** — conditions and trade-offs.
- **Implementation** and **Example** — how to realize it.
- **Anti-patterns**, **Known uses**, **Related patterns**.

Anti-patterns start from a tempting wrong move, explain its consequences, and
offer a positive replacement. The OpenSpec, Superpowers, and Matt Pocock's
Skills profiles are practical cards: installation, workflow, artifacts,
distinctions, and selection criteria. Because their commands depend on tool
versions, each profile includes the date when it was checked.

## Groups

Patterns are grouped by area of working with an agent: task setting, spec-driven
development, working with context, verification, and project organization.
**Anti-patterns** live in a separate section — common mistakes when interacting
with an agent and their analysis. The grouping is visible in the
[table of contents](SUMMARY.md); inside the repository all chapters are flat, so
they are convenient to read on GitHub too.

## How to choose a pattern

You do not have to read the book in order. Start from the situation you are in:

| Situation | Start with | What you get | Main cost |
|-----------|------------|--------------|-----------|
| A small but non-obvious change | [Four Phases](explore-plan-code-commit.md) | An agreed approach before code changes | A separate plan review |
| The idea still lives only in your head | [Agent-Led Interview](let-claude-interview-you.md) | A self-contained task definition | You need to answer questions |
| A finished plan looks suspiciously smooth | [Grilling](grilling.md) | Exposed gaps and explicit decisions | The discussion may reveal more work |
| The feature will outlive one session | [Spec-Driven Development](spec-driven-development.md) | A specification, plan, and verifiable tasks | The artifacts need maintenance |
| You need demonstrable correctness | [Feedback Loop](give-agent-a-way-to-verify.md) | A verifiable loop to the result | Quality is limited by the oracle |
| The work is too large or keeps spreading | [One Feature at a Time](one-feature-at-a-time.md) and [Tracer-Bullet Tickets](tracer-bullet-tickets.md) | Small completed slices | More coordination points |
| Work must continue in a fresh context | [Progress Journal](progress-file.md) or [Session Handoff](handoff.md) | Recoverable work state | The documents require discipline |
| You do not know whether an idea survives reality | [Throwaway Prototype](prototype-to-answer.md) | An answer to one design question | The prototype must be discarded |

A progress journal is maintained continuously; a session handoff is created at
a specific context boundary. Reflection asks the author to criticize its own
work, while [Writer and Reviewer](writer-reviewer.md) gives the check to a fresh
context. TDD is a strict form of the feedback loop for behavior that can be
expressed as a test.

[Feature List](feature-list-harness.md) stores the verifiable state of the whole
body of work, while One Feature at a Time limits the scope of a single pass.
Tracer-bullet tickets are for splitting an already-understood large feature into
vertical slices with dependencies. [Investigation Map](wayfinder.md) comes
earlier—when the route to the result is still unknown and research questions
must be resolved first.
