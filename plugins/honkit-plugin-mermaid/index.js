// @ts-check
'use strict';

// Renders ```mermaid fences into inline SVG while the book is built, so the
// diagrams survive both the HTML output and `honkit pdf` (which never runs JS).
// Rendering is done by mermaid-isomorphic — Mermaid inside headless Playwright.
//
// CommonJS on purpose: honkit loads plugins with a synchronous `require()`, so
// the entry point cannot be an ES module. The ESM-only renderer is pulled in
// with a dynamic `import()` instead.

const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const cheerio = require('cheerio');

const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache', 'honkit-mermaid');

/** @type {import('mermaid').MermaidConfig} */
let mermaidConfig = {};

/** @type {import('mermaid-isomorphic').MermaidRenderer | null} */
let renderer = null;

/**
 * Cache key for a diagram: its source plus the theme it is rendered with.
 *
 * @param {string} source
 * @returns {string}
 */
function digest(source) {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(mermaidConfig))
    .update(source)
    .digest('hex')
    .slice(0, 16);
}

/**
 * @param {string} key
 * @returns {string | null}
 */
function readCached(key) {
  try {
    return fs.readFileSync(path.join(CACHE_DIR, `${key}.svg`), 'utf8');
  } catch {
    return null;
  }
}

/**
 * @param {string} source
 * @param {string} key
 * @returns {Promise<string>}
 */
async function render(source, key) {
  if (!renderer) {
    const { createMermaidRenderer } = await import('mermaid-isomorphic');
    renderer = createMermaidRenderer();
  }
  // One diagram per call, so the SVG ids are derived from the content and stay
  // unique on a page that mixes freshly rendered and cached diagrams.
  const [result] = await renderer([source], { mermaidConfig, prefix: `mermaid-${key}` });
  if (result.status === 'rejected') {
    throw new Error(`Mermaid diagram failed to render:\n${source}\n\n${result.reason}`);
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, `${key}.svg`), result.value.svg);
  return result.value.svg;
}

module.exports = {
  website: {
    assets: './assets',
    css: ['mermaid.css']
  },

  ebook: {
    assets: './assets',
    css: ['mermaid.css']
  },

  hooks: {
    init: function () {
      const options = this.config.get('pluginsConfig.mermaid', {});
      const configFile = path.resolve(process.cwd(), options.configFile || 'mermaid.config.json');
      mermaidConfig = fs.existsSync(configFile) ? JSON.parse(fs.readFileSync(configFile, 'utf8')) : {};
    },

    // Honkit has already turned the chapter's Markdown into HTML by this point,
    // so the fences arrive as <pre><code class="lang-mermaid">. Walk that HTML
    // with cheerio (honkit's own HTML parser) rather than matching it by hand.
    page: async function (page) {
      const $ = cheerio.load(page.content, null, false);
      const fences = $('pre > code.lang-mermaid');
      if (fences.length === 0) {
        return page;
      }

      const svgs = await Promise.all(
        fences.toArray().map((element) => {
          const source = $(element).text();
          const key = digest(source);
          return readCached(key) ?? render(source, key);
        })
      );

      fences.each((index, element) => {
        $(element).parent().replaceWith(`<figure class="mermaid">${svgs[index]}</figure>`);
      });

      page.content = $.html();
      return page;
    }
  }
};
