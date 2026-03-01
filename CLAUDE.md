# CLAUDE.md — paitheme

Hugo theme module at `github.com/fredricnet/paitheme`. Dark-mode-first, pure CSS (no framework), vanilla JS. Serves docs, blog, marketing, and dashboard layouts.

## Dev Workflow

```bash
# Always develop via the demo site, not the theme directly
cd examples/demo && hugo server

# Tag a release
git tag v1.x.x -m "Description" && git push origin v1.x.x
```

Sites consuming this theme use `go.mod replace` for local dev — do NOT add `version:` to module imports in `hugo.yaml` (it bypasses the replace directive).

## Key Architecture

| Concern | Location | Notes |
|---|---|---|
| CSS design tokens | `static/css/variables.css` | All colors, spacing, gradients as CSS vars |
| Main stylesheet | `static/css/style.css` | ~6700 lines, imports variables.css |
| Core JS | `static/js/main.js` | Mobile menu, tabs, FAQ, scroll detection |
| Docs JS | `static/js/docs.js` | Sidebar state, TOC, code copy |
| Icons data | `data/icons.yaml` | ~2500 lines of inline SVG definitions |
| Site config | `data/site.yaml` (in consuming site) | Brand, footer, schema, CTA |
| Shortcodes | `layouts/shortcodes/` | 40+ components |
| JSON-LD schemas | `layouts/partials/schema/` | Auto-applied per layout type |
| Custom font | `static/fonts/Airoman.otf` | Headings only; body uses Inter (Google Fonts) |

## Layout Sections

- `_default/` — fallback base templates
- `docs/` — sidebar tree + TOC + sessionStorage state persistence
- `dictionary/` — alphabetical glossary, similar layout to docs
- `blog/` — article schema, tags, prev/next nav
- `dashboard/` — role-based sidebar, nested subsections (financials, sales, marketing, etc.)
- `platform/`, `about/`, `pricing/`, `faq/` — marketing pages
- `dev/styleguide/` — component library for development reference

## Critical Conventions

**Header:** Centered, pill-shaped, fixed. Only as wide as its contents. Fades to 50% on scroll-down, full opacity on scroll-up. Never make it full-width.

**Dark mode:** Default. Light mode via `[data-theme="light"]` attribute — do NOT invert this assumption.

**CSS changes:** Always use CSS variables from `variables.css`. Never hardcode colors or spacing values.

**Docs sidebar:** State (expanded/collapsed groups) persisted in `sessionStorage`. Pre-paint style injection in `docs/baseof.html` prevents flash — don't break this pattern when editing sidebar logic.

**Shortcodes:** All support `.Inner | markdownify`. Use named parameters. Follow existing patterns before adding new ones.

**Schemas:** Each layout type auto-includes the appropriate JSON-LD partial (`article.html` for blog, `tech-article.html` for docs, `defined-term.html` for dictionary). Don't add schemas inline in templates.

## Adding a New Shortcode

1. Create `layouts/shortcodes/name.html`
2. Support both `.Inner` content and named params
3. Test in `examples/demo/content/dev/styleguide/`
4. Document in `SHORTCODES.md`

## Adding a New Section

1. Create `layouts/SECTION/baseof.html` + `single.html` + `list.html`
2. Add schema partial if needed in `layouts/partials/schema/`
3. Include appropriate CSS in `static/css/style.css` (add section block at bottom)

## External Dependencies

- **Mermaid.js** — CDN, loaded in `_default/baseof.html` (`chart-section` shortcode)
- **Inter** — Google Fonts (body text)
- **Airoman** — Local `.otf` (headings, preloaded in `partials/head/meta.html`)

## Files to Know

- `WORKFLOW.md` — release process, troubleshooting module issues
- `IMPLEMENTATION_STATUS.md` — what's done vs. pending
- `NEXT_STEPS.md` — roadmap
- `README.md` — user-facing docs (shortcodes, config, customization)
