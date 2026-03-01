# PAI Theme Project Log

This log documents significant changes, decisions, and future directives for the PAI Theme project.

---

## 2026-02-16 - Custom Heading Font Implementation

**Goal**: Replace Inter font with custom Airoman font for all headings while maintaining Inter for body text.

### Changes Made

**Font File:**
- Added `static/fonts/Airoman.otf` (33KB OpenType font)
- Font format: OpenType/CFF (OTTO magic bytes)
- File extension: .otf (matches actual format)

**CSS Updates:**
- Created @font-face declarations in both:
  - `static/css/variables.css` (lines 74-81)
  - `static/css/style.css` (lines 11-18)
- Defined CSS variable: `--font-family-heading: 'Airoman', system-ui, -apple-system, sans-serif;`
- Applied to all h1-h6 globally via `font-family: var(--font-family-heading);`
- Added explicit heading font-family to `docs.css` (h2, h3, h4) to override more specific selectors
- Font stack includes fallbacks: system-ui, -apple-system, sans-serif

**HTML Updates:**
- Added font preload in `layouts/partials/head/meta.html` (line 82)
- Preload attributes: `as="font" type="font/otf" crossorigin`
- Uses Hugo's `relURL` filter for proper path resolution

**Documentation Updates:**
- Added "Typography & Fonts" section to README.md
- Documented dual-font system (Airoman for headings, Inter for body)
- Included instructions for replacing with different font
- Updated v1.1.0 changelog with font implementation
- Updated IMPLEMENTATION_STATUS.md with completed task

### Testing

**Environment:**
- Tested in fredricnet-website (NOT legacy fredric.net)
- Hugo v0.152.2+extended
- Local module replacement via go.mod

**Verification:**
- ✅ Font file format validated (OpenType/CFF)
- ✅ CSS syntax validated (no errors)
- ✅ Font loads successfully (HTTP 200, 34KB)
- ✅ Font preload present in HTML
- ✅ @font-face declaration correct with format('opentype')
- ✅ Heading rules use var(--font-family-heading)
- ✅ CSS variable defined correctly
- ✅ Hugo watches both fredricnet-website and paitheme
- ✅ Tested across multiple page types (homepage, articles, dictionary)

### Design Decisions

1. **Dual Font System**:
   - Headings: Airoman (custom, distinctive)
   - Body text: Inter (Google Fonts, highly readable)
   - Rationale: Differentiate headings while maintaining body text readability

2. **Duplicate @font-face**:
   - Font declared in both variables.css and style.css
   - Rationale: Ensures loading reliability if @import fails

3. **Format Hint**:
   - Using `format('opentype')` instead of `format('truetype')`
   - Rationale: Font is actually OpenType/CFF, not TrueType
   - Browser silently rejects mismatched format hints

4. **Font Preloading**:
   - Added `<link rel="preload">` for performance
   - Rationale: Reduces FOIT (Flash of Invisible Text)

5. **Explicit Docs Overrides**:
   - Added font-family to .docs-content-wrapper h2/h3/h4
   - Rationale: More specific selectors in docs.css were overriding global heading rules

### Future Directives

**Potential Enhancements:**
1. **WOFF2 Version**:
   - Add WOFF2 version of Airoman for better compression
   - Update @font-face with WOFF2 as primary, OTF as fallback
   - Expected file size reduction: ~40-50%

2. **Font Weight Variants**:
   - Consider adding Airoman-Bold.otf if available
   - Would allow font-weight: 700 on headings
   - Currently using single weight (normal)

3. **Font Organization**:
   - If more custom fonts are added, create `static/css/fonts.css`
   - Separate font declarations from design tokens
   - Keep variables.css focused on CSS variables only

4. **Subsets**:
   - If font supports it, create Latin subset for smaller file size
   - Useful for international sites

5. **Variable Fonts**:
   - If Airoman variable font version exists, consider switching
   - Single file for all weights/styles
   - Better performance and flexibility

### Related Files

**Theme Files (paitheme/):**
- `static/fonts/Airoman.otf`
- `static/css/variables.css`
- `static/css/style.css`
- `static/css/docs.css`
- `layouts/partials/head/meta.html`
- `README.md`
- `IMPLEMENTATION_STATUS.md`

**Site Files (fredricnet-website/):**
- No changes required (consumes via Hugo module)
- Uses local replace: `../paitheme`

### Notes

- Inter from Google Fonts intentionally kept for body text
- All changes made in paitheme only (master theme)
- fredricnet-website consumes via local module replacement
- Legacy fredric.net directory should be ignored
- Font implementation is backward compatible (falls back to system fonts)

---

## Template for Future Entries

```markdown
## YYYY-MM-DD - Feature/Change Name

**Goal**: Brief description of what was accomplished

### Changes Made
- List of specific changes
- File paths and line numbers

### Testing
- How it was tested
- Verification steps

### Design Decisions
- Why certain choices were made
- Trade-offs considered

### Future Directives
- Potential improvements
- Related enhancements to consider

### Related Files
- List of modified files

### Notes
- Additional context
- Important considerations
```

---

## Project Guidelines

**Development Workflow:**
1. All theme edits made in `paitheme/` directory only
2. Test changes using `fredricnet-website/` via local module
3. Never edit theme files inside fredricnet-website
4. Hugo must watch both directories (verify on startup)

**Module Configuration:**
- `go.mod` must have `replace` directive: `replace github.com/fredricnet/paitheme => ../paitheme`
- `hugo.yaml` must NOT have version on module import (prevents local override)
- Run from site directory: `cd fredricnet-website && hugo server`

**Testing Checklist:**
- [ ] Hugo watches both fredricnet-website and paitheme
- [ ] Changes reflect immediately (no module cache)
- [ ] CSS/JS assets load correctly
- [ ] No console errors in browser
- [ ] Test across multiple page types
- [ ] Hard refresh browser (Cmd+Shift+R)

**Documentation Updates:**
- Update README.md for user-facing changes
- Update IMPLEMENTATION_STATUS.md for implementation tasks
- Update PROJECT_LOG.md for significant changes and directives
- Update changelog for version releases
