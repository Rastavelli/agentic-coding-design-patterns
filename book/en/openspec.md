---
group: sdd
kind: tool
checked_on: 2026-09-15
status: draft
related: [spec-driven-development]
source_rev: 41ffe61445820e8cf04a836addf315d74618f395
---

# OpenSpec

*Commands and capabilities checked on September 15, 2026.*

[OpenSpec](https://github.com/Fission-AI/OpenSpec) (Fission-AI) builds
[spec-driven development](spec-driven-development.md) not around a feature but
around a **change** with a propose → review → apply → archive lifecycle. The
key idea is to separate "what already is" from "what is changing": the
system's standing specifications are updated by deltas, the way migrations
update a database schema.

OpenSpec is an agent-agnostic toolkit: it supports more than 30 coding agents
and assistants, including Claude Code, Codex, Cursor, and GitHub Copilot.

## Installation

The CLI ships via npm (requires Node.js ≥ 20.19):

```sh
npm install -g @fission-ai/openspec@latest
openspec init
```

`openspec init` creates the `openspec/` directory and registers the slash
commands under the `/opsx:` prefix; `openspec update` refreshes the agent
instructions after an upgrade.

## Workflow

The command set depends on the chosen profile (`openspec config profile`).
The default profile takes a change through four steps:

1. `/opsx:explore` — thinking mode before any artifacts: the agent reads the
   code and weighs options, changing nothing.
2. `/opsx:propose <idea>` — a formal change proposal: the artifact bundle is
   created (see below). Reviewing the bundle is the checkpoint before the
   first line of code.
3. `/opsx:apply` — implementation following the task checklist.
4. `/opsx:archive` — moving the completed change to the archive and folding its
   deltas into the standing specifications.

The extended profile adds commands for long-running work: `/opsx:new`,
`/opsx:continue`, `/opsx:ff` (fast-forward), `/opsx:verify` (checking the
implementation against the artifacts), `/opsx:bulk-archive`, and
`/opsx:onboard` (rolling OpenSpec out on an existing project).

After the merge, run `/opsx:archive`: its deltas fold into the standing
specifications, and the change itself moves to the archive — the history of
decisions stays in the repository.

Command syntax depends on the agent. Codex, for example, may expose
`$openspec-propose`, while Cursor and GitHub Copilot use `/opsx-propose`;
`openspec init` prints the syntax for the selected tool.

## Artifacts

Everything lives in `openspec/`, in two zones:

| Path | What lives there |
|------|------------------|
| `openspec/specs/` | Standing specifications — the current model of what is *already built* |
| `openspec/changes/<change>/proposal.md` | Why we are changing this |
| `openspec/changes/<change>/specs/` | Requirement deltas with concrete scenarios |
| `openspec/changes/<change>/design.md` | Technical approach |
| `openspec/changes/<change>/tasks.md` | Implementation checklist |
| `openspec/changes/archive/` | Completed changes |

## What makes it different

- The specification is not a one-off feature document but a continuously
  current model of the system: at any moment you can see what the system is
  obliged to do *right now*.
- Deltas instead of rewrites: a change describes the difference against the
  current requirements, not the whole system from scratch.
- An explicit bet on brownfield: the authors describe the process as "fluid,
  not rigid; iterative, not waterfall" — the pipeline is designed for a living
  codebase, not only greenfield.
- Team workflows: specifications are team-owned, with a shared dashboard,
  cross-repository coordination, and MCP integration.

## When to choose it

OpenSpec is the best fit when the work happens in an existing system and the
main value is an accumulating, always-current model of the requirements. If
what you need is the simplest linear pipeline for new features, more linear
toolkits such as GitHub Spec Kit are a better fit (see
[Useful Links](resources.md)).
