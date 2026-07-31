# Phrases for AGENTS.md

A small set of universal rules worth adding to the
[project memory](claude-md-memory.md) of almost any repository. These aren't
project configuration or build commands — they're stances on *how* the agent
should make decisions when the choice is left to its discretion.

The starting point is a list by Marcos Hernanz that made the rounds online; the
last two are additions from
[Kirill Mokevnin](https://x.com/mokevnin/status/2083152573679173830).

Ready-to-copy block:

```markdown
# AGENTS.md
- Do not preserve backward compatibility.
- Choose the simplest implementation that fully meets the current requirements.
- Prefer established, well-maintained libraries over custom implementations.
- Fix the cause, not the symptom.
- Suggest best practices, even if they may require refactoring.
```

Keep the caveat from [Project Memory](claude-md-memory.md) in mind: a memory
file *guides* the agent's behavior but doesn't guarantee it. And keep the list
short — otherwise you end up with [bloated memory](bloated-claude-md.md).

## Do not preserve backward compatibility

By default the agent plays it safe: it keeps old fields "just in case," piles up
overloads, and accumulates compatibility layers around every change. In internal
code maintained by a single team, that's pure ballast — dead branches and
duplication that no one will ever remove. This rule lets the agent change code
boldly: rename, delete, rewrite signatures.

Boundary: the rule fits applications and internal modules. For a public library
or an external API, compatibility *is* the contract with users; there you'd flip
the wording.

## Choose the simplest implementation that fully meets the current requirements

The agent tends to over-engineer: it bakes in configurability, abstractions, and
extension points for tasks that don't exist yet. This rule steers it back to
YAGNI — solve the task at hand, not an imagined future one. The word *fully*
matters: it's not license to cut corners but a demand to cover the current
requirements completely — and no wider.

Close kin to the [Premature Specification](premature-specification.md)
anti-pattern: in both, the harm is complexity committed before there's any
demand for it.

## Prefer established, well-maintained libraries over custom implementations

Left without guidance, the agent will happily write its own date parser, its own
validation, its own connection pool — code that looks functional but never went
through the pain of someone else's production. This rule tips the choice toward
the off-the-shelf: less code to maintain, known edge cases already handled.

Check that the library really is *established* and *well-maintained* — a live
repo, recent releases — or the dependency becomes a liability instead.

## Fix the cause, not the symptom

Facing a failing test or an error, the agent gravitates to a local patch: adjust
the assertion, wrap it in `try/catch`, tweak it for the specific input. The
symptom disappears, the cause stays and resurfaces nearby. This rule demands
digging down to the root — why the value was `null` in the first place — instead
of muffling the manifestation.

Pairs well with [Reflection](reflection.md): before fixing, the agent explains
*why* it broke — and patches get cut off at that step.

## Suggest best practices, even if they may require refactoring

An agent optimizing for "get the task done with the smallest diff" silently
wedges itself into crooked code and reproduces its flaws. This rule gives it a
voice: if it notices the task is better solved by refactoring the surrounding
code, it should say so rather than quietly working around it. The decision stays
with the human, but at least the choice becomes deliberate.

The flip side: the agent may propose refactoring too often; keep this rule
paired with the previous two (simplest implementation, cause not symptom) so the
suggestions stay appropriate.

## Related chapters

- [Project Memory](claude-md-memory.md) — where these phrases go and how the
  memory file works.
- [Bloated Memory](bloated-claude-md.md) — why the list must stay short.
- [Context Engineering](context-engineering.md) — every line of memory spends
  attention budget in every session.
