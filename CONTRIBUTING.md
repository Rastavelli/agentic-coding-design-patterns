# Contributing

The book is built from markdown with [Honkit](https://github.com/honkit/honkit). Navigation and grouping come from `book/<locale>/SUMMARY.md` — a separate file per language.

## Add a new pattern

0. Check [CANDIDATES.md](CANDIDATES.md) first. New ideas start there as a `candidate` row; adding a chapter means moving the idea to `accepted`. Rejected ideas stay documented so we don't reconsider them by accident.
1. Pick a kebab-case `slug` (e.g. `chain-of-thought`). It becomes the file name in every locale and the key under `book/assets/`.
2. Create the chapter in the canonical locale: copy [`templates/ru/pattern.md`](templates/ru/pattern.md) to `book/ru/<slug>.md` and fill it in. Do not change the section headings — they are the same across all chapters of that language.
3. Add a link in `book/ru/SUMMARY.md` under the right group heading (line order = order in the book).
4. Draw diagrams as ```` ```mermaid ```` fences right in the chapter — they are rendered to SVG at build time and translated together with the surrounding text. Use the shared `accent` / `warn` / `muted` classes (`node:::accent`) so every diagram in the book shares one palette; the theme lives in `mermaid.config.json`.
5. Anything that is genuinely a file — images, sample code — goes in `book/assets/<slug>/` and is referenced with a relative path `../assets/<slug>/...`.
6. Preview with `pnpm start`.

Anti-patterns go into the separate "Anti-patterns" chapter and use `templates/<locale>/anti-pattern.md`.

Tool profiles are not patterns. Put them under the relevant methodology section, add `kind: tool` and `checked_on: YYYY-MM-DD` to their front matter, and use the practical-card structure: installation, workflow, artifacts, distinctions, and selection criteria. Show the check date to readers because commands and product capabilities change faster than pattern descriptions.

Recheck a tool profile against the tool's primary documentation before each book release and whenever its commands or capabilities are edited. Advance `checked_on` only after that verification; changing prose alone is not evidence that the product details are current.

## Chapter front matter (optional but useful)

Honkit takes the title from the first `#` and navigation from `SUMMARY.md`. A small front matter is handy as metadata and reads well on GitHub:

```yaml
---
group: task-setting      # area (mirrors the heading in SUMMARY.md)
status: draft            # draft | review | translated | done
related: [some-slug]
source_rev:              # for NON-canonical locales only (see below)
---
```

## Translation

- The canonical locale is `ru` (`language` in `book/book.json`). A pattern is written in Russian first.
- To translate, copy `book/ru/<slug>.md` to `book/<locale>/<slug>.md`, translate the text, and add a link to `book/<locale>/SUMMARY.md` in the same group. Use the matching template under `templates/<locale>/` for the localized headings.
- In the translation's front matter set `source_rev` — the git SHA of the ru chapter at the time of translating, so staleness can be tracked:

  ```sh
  git log -1 --format=%H -- book/ru/<slug>.md
  ```

## Conventions

- Do not hard-wrap Markdown prose to a fixed column width. Keep each paragraph, list item, and blockquote on one physical source line; use line breaks only for intentional Markdown structure.
- Inside `book/<locale>/` chapters are a flat list — no group folders.
- The set of `<slug>.md` files and the `SUMMARY.md` structure should match across locales.
- Assets are shared in `book/assets/` — do not duplicate images per locale.
- All text outside the language folders (`book/<locale>/`) and the localized templates is in English.

For environment setup and commit conventions, see [AGENTS.md](AGENTS.md).
