# PAI Theme Demo Site

This is a demo/development site for PAI Theme. It showcases all theme features with self-documenting content.

## Purpose

This demo site serves multiple purposes:

1. **Development Tool** - Test theme changes locally without pushing to GitHub
2. **Theme Showcase** - Demonstrate all theme features with examples
3. **Documentation** - Self-documenting examples of theme capabilities
4. **Testing** - Verify theme works correctly with different content types

## Getting Started

### Prerequisites

- Hugo installed (version 0.100.0 or higher)
- Go installed (for Hugo modules)

### Setup

1. Navigate to this directory:
   ```bash
   cd examples/demo
   ```

2. Install Hugo modules (if needed):
   ```bash
   hugo mod get
   ```

3. For local development, use module replace to point to parent theme:
   ```bash
   hugo mod replace github.com/fredricnet/pai-theme => ../..
   ```

4. Start the development server:
   ```bash
   hugo server
   ```

5. Open `http://localhost:1313/` in your browser

## Content Structure

The demo site includes:

- **Homepage** (`content/_index.md`) - Overview of the theme
- **Documentation** (`content/docs/`) - Docs layout examples
- **Dictionary** (`content/dictionary/`) - Glossary functionality
- **Blog** (`content/blog/`) - Blog layout examples
- **Styleguide** (`content/dev/styleguide/`) - Self-documenting component showcase

## Development Workflow

1. Make changes to theme files in the parent directory (`../..`)
2. Test changes using this demo site
3. Verify all sections work correctly
4. When satisfied, commit and push theme changes to GitHub
5. Tag new version (e.g., `v1.1.0`)

## Configuration

The demo site uses `hugo.yaml` for configuration and `data/site.yaml` for theme-specific settings. Both are already configured for the demo.

## Notes

- This is example/dummy content designed to showcase theme features
- All content includes explanatory text describing what it demonstrates
- The styleguide section is self-documenting and explains each component
