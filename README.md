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

## Browser Support

- Chrome / Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

---

## Versioning

PAI Theme uses semantic versioning (v1.0.0, v1.1.0, v2.0.0). See version tags on [GitHub](https://github.com/fredricnet/paitheme/tags).

### Current Version

**v1.0.0** - Initial release

### Changelog

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
