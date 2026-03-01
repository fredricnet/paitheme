# PAI Theme

A modern, dark-mode Hugo theme with a clean, professional design. Built for documentation sites, blogs, and marketing pages.

## Features

- 🌙 **Dark Mode First** - Elegant dark theme with optional light mode
- 📚 **Documentation System** - Full-featured docs with sidebar navigation and TOC
- 📖 **Dictionary Section** - Alphabetically organized glossary with expandable entries
- 📝 **Blog** - Clean blog layout with featured images and author support
- ⚡ **Performance** - Minimal JavaScript, optimized CSS
- 🎨 **Customizable** - Centralized configuration for easy theming
- 🔍 **SEO Ready** - JSON-LD structured data for search engines and AI
- 🤖 **AI Ready** - Auto-generated llms.txt, robots.txt, and sitemap.xml

---

## Installation

### As Hugo Module (Recommended)

PAI Theme is available as a Hugo module for easy installation and updates:

1. Initialize your Hugo site as a module (if not already):

```bash
hugo mod init github.com/your-org/your-site
```

2. Add the theme to your `hugo.yaml`:

```yaml
module:
  imports:
    - path: github.com/fredricnet/paitheme
      version: v1.0.0  # Optional: specify version or use latest
```

3. Install the module:

```bash
hugo mod get -u github.com/fredricnet/paitheme
hugo mod tidy
```

4. Configure your site in `data/site.yaml` (see Configuration below)

5. Run Hugo:

```bash
hugo server
```

### Updating the Theme

To update to the latest version:

```bash
hugo mod get -u github.com/fredricnet/paitheme
hugo mod tidy
```

To update to a specific version:

```bash
hugo mod get -u github.com/fredricnet/paitheme@v1.1.0
hugo mod tidy
```

**Note**: After the initial fetch, Hugo uses a locally cached version for all builds until you explicitly update.

---

## Configuration

### Site Configuration (`data/site.yaml`)

The theme uses a centralized configuration file for all customizable settings:

```yaml
# data/site.yaml

# Brand / Logo
brand:
  name: "Your Site Name"
  logo:
    use_svg_icon: true      # Use built-in triangle icon
    image: "/brand/logo.svg" # Or specify a custom image
    alt: "Logo Alt Text"
  favicon: "/brand/favicon.svg"

# Header
header:
  cta:
    text: "Get Started"
    url: "/signup"
    style: "btn-primary"    # btn-primary, btn-secondary, btn-ghost
    hidden: true             # Optional: hide the CTA button entirely

# Footer
footer:
  sections:
    - title: "Product"
      links:
        - text: "Home"
          url: "/"
        - text: "Features"
          url: "/features"
  
  social:
    - platform: "twitter"
      url: "https://twitter.com/yourhandle"
      icon: "twitter"
    - platform: "github"
      url: "https://github.com/yourorg"
      icon: "github"
  
  disclaimer:
    label: "Legal Notice"
    text: "Your disclaimer text here."
  
  copyright:
    text: "Your Company Name"
  
  legal:
    - text: "Privacy Policy"
      url: "/privacy"
    - text: "Terms of Service"
      url: "/terms"
```

### Navigation Menu (`hugo.yaml`)

```yaml
menus:
  main:
    - name: "Home"
      url: "/"
      weight: 1
    - name: "Docs"
      url: "/docs/"
      weight: 2
    - name: "Blog"
      url: "/blog/"
      weight: 3
```

---

## Theme Structure

```
pai-theme/
├── layouts/
│   ├── _default/           # Default templates
│   │   ├── baseof.html     # Base template
│   │   ├── list.html       # List pages
│   │   └── single.html     # Single pages
│   ├── blog/               # Blog templates
│   ├── dictionary/         # Dictionary templates
│   ├── docs/               # Documentation templates
│   ├── partials/           # Reusable components
│   │   ├── brand/          # Logo partial
│   │   ├── docs/           # Docs-specific partials
│   │   ├── icons/          # Icon partials
│   │   │   └── social/     # Social media icons
│   │   ├── schema/         # JSON-LD structured data
│   │   │   ├── organization.html
│   │   │   ├── website.html
│   │   │   ├── webpage.html
│   │   │   ├── breadcrumb.html
│   │   │   ├── article.html
│   │   │   ├── tech-article.html
│   │   │   └── defined-term.html
│   │   ├── header.html     # Site header
│   │   └── footer.html     # Site footer
│   └── shortcodes/         # Hugo shortcodes
│       ├── details.html    # Expandable content
│       └── card.html       # Card component
├── static/
│   ├── brand/              # Logo & favicon files
│   ├── css/
│   │   ├── variables.css   # CSS design tokens
│   │   ├── style.css       # Main styles
│   │   ├── docs.css        # Documentation styles
│   │   └── dictionary.css  # Dictionary styles
│   └── js/
│       ├── main.js         # Main JavaScript
│       └── docs.js         # Docs functionality
└── README.md
```

---

## Customization

### Colors & Design Tokens

Edit `static/css/variables.css` to customize the color palette:

```css
:root {
    /* Base Colors */
    --bg-color: #0a0a0a;        /* Main background */
    --bg-secondary: #171717;     /* Card backgrounds */
    --text-color: #fafafa;       /* Primary text */
    --text-muted: #a3a3a3;       /* Secondary text */
    
    /* Primary / Brand */
    --primary-color: #fafafa;
    --primary-hover: #ffffff;
    
    /* Borders */
    --border-color: rgba(255, 255, 255, 0.1);
    
    /* Layout */
    --container-width: 1280px;
    --header-height: 72px;
    --radius: 8px;
}
```

### Typography & Fonts

The theme uses a dual-font system:

- **Headings (h1-h6)**: Custom "Airoman" font (OpenType)
- **Body text**: "Inter" from Google Fonts
- **Monospace**: Monaco, Menlo, Ubuntu Mono
- **Handwriting**: Caveat (for logo/special elements)

#### Custom Heading Font

The theme includes the Airoman font for all headings. This is defined in `static/css/variables.css`:

```css
--font-family-heading: 'Airoman', system-ui, -apple-system, sans-serif;
```

To replace with a different heading font:

1. Add your font file to `static/fonts/yourfont.otf` (or .ttf, .woff2)
2. Update the @font-face declaration in `static/css/variables.css`:
   ```css
   @font-face {
       font-family: 'YourFont';
       src: url('/fonts/yourfont.otf') format('opentype');
       font-weight: normal;
       font-style: normal;
       font-display: swap;
   }
   ```
3. Update the CSS variable:
   ```css
   --font-family-heading: 'YourFont', system-ui, sans-serif;
   ```
4. Update the preload in `layouts/partials/head/meta.html`:
   ```html
   <link rel="preload" href="{{ "fonts/yourfont.otf" | relURL }}" as="font" type="font/otf" crossorigin>
   ```

All headings will automatically use the new font via the `var(--font-family-heading)` CSS variable.

### Light Mode

The theme includes a light mode variant. Add `data-theme="light"` to the `<html>` element to enable it.

---

## Content Sections

### Documentation (`content/docs/`)

```markdown
---
title: "Getting Started"
description: "Quick start guide"
weight: 1
---

Your documentation content here.
```

### Dictionary (`content/dictionary/`)

```markdown
---
title: "Algorithm"
description: "A step-by-step procedure for solving a problem."
---

Full definition and examples here.
```

### Blog (`content/blog/`)

```markdown
---
title: "My Blog Post"
description: "A short summary"
date: 2024-01-01
author: "Your Name"
tags: ["hugo", "web"]
image: "/images/featured.webp"
---

Blog post content here.
```

---

## Shortcodes

### Details (Expandable Content)

```markdown
{{</* details title="Click to expand" */>}}
Hidden content here.
{{</* /details */>}}
```

### Card

```markdown
{{</* card title="Feature" icon="star" */>}}
Card content here.
{{</* /card */>}}
```

---

## Social Icons

Available social icons (in `layouts/partials/icons/social/`):

- `facebook.html`
- `twitter.html`
- `linkedin.html`
- `instagram.html`
- `github.html`
- `youtube.html`

To add a new social icon, create a new file in `layouts/partials/icons/social/` with the SVG markup.

---

## SEO & Structured Data (JSON-LD)

The theme automatically generates JSON-LD structured data for improved SEO and AI search engine visibility (Google, Bing, Perplexity, etc.).

### Schema Types Generated

| Schema | Where | Purpose |
|--------|-------|---------|
| Organization | All pages | Company/brand information |
| WebSite | Homepage | Site-wide info + search action |
| WebPage | All pages | Basic page structure |
| BreadcrumbList | All pages | Navigation hierarchy |
| Article | Blog posts | Rich snippets for articles |
| TechArticle | Docs pages | Technical documentation |
| DefinedTerm | Dictionary | Glossary terms for AI |

### Configuration (`data/site.yaml`)

Configure your organization details for schema generation:

```yaml
# Schema / Structured Data
schema:
  organization:
    name: "Your Company"
    legal_name: "Your Company Inc."
    description: "What your company does"
    url: "https://yoursite.com"
    logo: "https://yoursite.com/brand/logo.svg"
    founding_date: "2024"
    founders:
      - name: "Founder Name"
    contact:
      email: "hello@yoursite.com"
      phone: "+1-555-000-0000"
      type: "customer service"
    address:
      street: "123 Main Street"
      city: "San Francisco"
      state: "CA"
      postal_code: "94102"
      country: "US"
    social_profiles:
      - "https://twitter.com/yourcompany"
      - "https://linkedin.com/company/yourcompany"
      - "https://github.com/yourcompany"
  
  website:
    search_enabled: true
    search_url: "/search?q={search_term_string}"
  
  default_author:
    name: "Editorial Team"
    url: "https://yoursite.com/about"
```

### Frontmatter Options

Blog posts support additional schema fields:

```yaml
---
title: "My Article"
description: "Article summary"
author: "John Doe"
author_url: "https://example.com/john"
tags: ["topic1", "topic2"]
image: "/images/featured.jpg"
---
```

Docs pages support proficiency levels:

```yaml
---
title: "Advanced API Guide"
proficiency_level: "Expert"
dependencies: "Basic knowledge of REST APIs"
---
```

---

## Auto-Generated Files

The theme automatically generates the following files on every build:

### sitemap.xml

Standard XML sitemap for search engines. Automatically includes all pages with their last modification dates.

Configuration in `hugo.yaml`:

```yaml
sitemap:
  changeFreq: 'weekly'
  priority: 0.5
  filename: 'sitemap.xml'
```

### llms.txt

AI-readable site index following the [llmstxt.org](https://llmstxt.org/) standard. Helps AI systems like ChatGPT, Claude, and Perplexity understand your site's content.

Contents include:
- Site title and description
- Main navigation sections
- Documentation pages with descriptions
- Dictionary/glossary terms
- Recent blog posts
- Contact and social information

Template: `layouts/_default/home.llmstxt.txt`

### robots.txt

Search engine directives with references to both sitemap.xml and llms.txt.

Template: `layouts/_default/home.robotstxt.txt`

Example output:

```
User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml

# LLMs.txt for AI systems
# LLMs.txt: https://yoursite.com/llms.txt

Disallow: /dev/
Crawl-delay: 1
```

---

## Header Design

The site header is a centered, compact pill-shaped bar inspired by modern SaaS designs (e.g. Webflow):

- **Centered bar**: Horizontally centered, only as wide as logo + nav links (not full page width)
- **Logo + divider + nav**: Brand icon and site name on the left, a vertical divider, then navigation links
- **Dark translucent background**: `rgba(30, 30, 30, 0.95)` with backdrop blur
- **Pill shape**: `border-radius: 999px` for a fully rounded bar
- **No CTA button**: Set `header.cta.hidden: true` in `data/site.yaml` to hide the header CTA
- **Mobile**: Reverts to full-width bar with hamburger menu on screens < 768px

### Header Configuration

```yaml
# data/site.yaml
header:
  cta:
    text: "Get Started"       # Button label (ignored if hidden)
    url: "/signup"             # Button link
    style: "btn-primary"      # btn-primary, btn-secondary, btn-ghost
    hidden: true               # Set to true to hide the CTA button
```

### Typography Alignment

Navigation links (header) and footer links use the same font size (`0.875rem` / 14px) with regular weight (`400`) for visual consistency across the site.

---

## Local Development Setup

PAI Theme is designed as a **master theme** used by multiple sites (e.g. fredricnet-website). All theme edits are made in the paitheme directory only — never in the consuming site.

### Directory Structure

```
002-fredricnet/
├── paitheme/              # Theme (master — all edits here)
│   ├── layouts/
│   ├── static/css/
│   └── ...
├── fredricnet-website/    # Site (consumes paitheme locally)
│   ├── go.mod             # Has: replace github.com/fredricnet/paitheme => ../paitheme
│   ├── hugo.yaml          # Imports paitheme (no version pin!)
│   ├── data/site.yaml     # Site-specific config
│   └── content/
└── ...
```

### Key Rules

1. **Never edit theme files inside fredricnet-website** — all changes go in `paitheme/`
2. **go.mod** in the site must have the `replace` directive pointing to `../paitheme`
3. **hugo.yaml** must NOT have `version:` on the module import (this causes Hugo to ignore the local replace and download from GitHub)
4. **Run from site directory**: `cd fredricnet-website && hugo server`
5. **Verify local loading**: Hugo should show `Watching for changes in .../{fredricnet-website,paitheme}`

### Quick Start

```bash
cd fredricnet-website
rm -rf _vendor public
hugo mod clean
hugo server --noHTTPCache --disableFastRender
```

---

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Versioning

PAI Theme uses semantic versioning (v1.0.0, v1.1.0, v2.0.0). See version tags on [GitHub](https://github.com/fredricnet/paitheme/tags).

### Current Version

**v1.1.0** - Header redesign & improvements

### Changelog

#### v1.1.0 (2026-02-16)
- **Custom heading font**: Added Airoman OpenType font for all headings (h1-h6)
- **Typography system**: Dual-font setup with Airoman for headings, Inter for body text
- **Font preloading**: Optimized Airoman loading with rel="preload" for better performance
- **Header redesign**: Centered compact pill-shaped bar (Webflow-style) that only spans the width of logo + nav links
- **Header divider**: Vertical separator between logo/brand and navigation links
- **CTA hidden option**: `header.cta.hidden: true` in `data/site.yaml` hides the header CTA button
- **Unified link sizing**: Nav bar links and footer links use the same font size (0.875rem / 14px, regular weight 400)
- **Improved nav link colors**: Brighter nav links (white at 85% opacity) with full white on hover/active
- **Mobile responsive**: Header reverts to full-width bar on small screens (< 768px), divider hidden
- **Light mode support**: Header, divider, and nav links adapt to light theme

#### v1.0.0 (2024-01-11)
- Initial release
- Dark mode first design
- Documentation system with sidebar navigation
- Dictionary/glossary functionality
- Blog support with featured images
- SEO and AI-ready (JSON-LD, llms.txt, robots.txt)
- Demo site with self-documenting examples

---

## Development

For development workflow, testing, and contributing, see [WORKFLOW.md](WORKFLOW.md).

The theme includes a demo site at `examples/demo/` for testing changes locally without pushing to GitHub.

---

## License

MIT License - See LICENSE file for details.

---

## Credits

Built with [Hugo](https://gohugo.io/) - The world's fastest framework for building websites.
