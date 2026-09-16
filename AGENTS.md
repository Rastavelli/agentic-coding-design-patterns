# AGENTS.md

Operating guide for agents (and humans) working in this repository.

## Language

- Book content lives in `book/<locale>/` (ru/en/es); localized chapter skeletons in `templates/<locale>/`.
- Everything else — READMEs, configs, CI, and the `book/` chrome outside locale folders — is written in **English**.

## Diagrams

- Diagrams are written as ```` ```mermaid ```` fences directly in the chapter, so the labels are translated together with the prose and GitHub renders them in the repo.
- `plugins/honkit-plugin-mermaid` renders the fences into inline SVG at build time (Mermaid in headless Playwright), so diagrams also survive `honkit pdf`, which never runs JS.
- Shared palette and theme live in `mermaid.config.json`. Use the `accent`, `warn` and `muted` classes (`node:::accent`) instead of per-diagram `classDef`.
- Rendered SVGs are cached in `node_modules/.cache/honkit-mermaid`, keyed by diagram source plus theme config. The theme is read once at startup, so restart `make serve` after editing `mermaid.config.json`.
- A diagram is read inside a ~770px column. Keep it under ~1200px wide — prefer `flowchart TB` over a long left-to-right chain, and remember that a note hung off a node with `-.-` widens the diagram.

## Markdown formatting

- Do not hard-wrap prose to a fixed column width. Keep each paragraph, list item, and blockquote on one physical source line; use line breaks only for intentional Markdown structure such as headings, separate list items, tables, fenced code, and paragraph boundaries.

## Commits

- Follow [Conventional Commits](https://www.conventionalcommits.org/), written in **English**.
- Enforced locally by a `commit-msg` hook: [lefthook](https://github.com/evilmartians/lefthook) (config in `lefthook.yml`) runs [commitlint](https://commitlint.js.org/). Both come from `pnpm install`, which also installs the hooks.
- Examples: `feat: add reflection pattern`, `docs: translate preface to es`, `ci: bump actions to latest`.

## Build / preview

- `make setup` — install deps and git hooks
- `make serve` — local preview (Honkit serve)
- `make build` — static build into `./dist`
- `pnpm exec playwright install chromium` — one-off, needed to render diagrams
- `make pdf` — PDFs for all locales
- `make update` — bump all dependencies to latest (npm-check-updates)

## Structure conventions

- Patterns are flat files `book/<locale>/<slug>.md`; grouping lives only in `book/<locale>/SUMMARY.md`.
- Shared binary assets in `book/assets/<slug>/`, referenced via `../assets/<slug>/...`. Diagrams are not assets — see above.
- Canonical locale is `ru`: write a pattern in Russian first, then translate.
- New pattern ideas are tracked in [CANDIDATES.md](CANDIDATES.md) — check it before writing a chapter, and record accepted/rejected there.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for the full authoring workflow.
