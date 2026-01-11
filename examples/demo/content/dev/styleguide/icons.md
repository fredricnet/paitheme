---
title: "Icons"
description: "Icon system and usage examples - 2500+ icons from Heroicons and Material Symbols"
weight: 5
---

# Icons

This section demonstrates the **icon system** used in PAI Theme. The theme includes **2500+ icons** from Heroicons v1 and Material Symbols Outline libraries.

## Icon Libraries

PAI Theme includes icons from:

1. **Heroicons v1** - Clean, consistent SVG icons
2. **Material Symbols Outline** - Comprehensive icon set

## Usage

Icons can be used in two ways:

### In Markdown (Shortcode)

```markdown
{{</* icon name="star" */>}}
{{</* icon name="check-circle" attributes="height=24 width=24" */>}}
```

### In Templates (Partial)

```go-html-template
{{ partial "utils/icon.html" (dict "name" "star" "attributes" "height=24 width=24") }}
```

## Available Icons

All available icons are searchable by name. Common icons include:

- `star` - Star icon
- `check-circle` - Checkmark in circle
- `document` - Document icon
- `folder` - Folder icon
- `menu` - Menu/hamburger icon
- `search` - Search icon
- `github` - GitHub logo
- `twitter` - Twitter logo
- And many more...

## Customization

Icons support:

- **Size** - Adjust via `height` and `width` attributes
- **Color** - Inherits from parent element's color
- **Styling** - Can be styled with CSS like any SVG element

**Note**: Icons are SVG-based, so they scale perfectly at any size and remain crisp on all displays.

## Summary

The icon system provides:
- **2500+ icons** from two popular libraries
- **Easy usage** via shortcodes or partials
- **Scalable** SVG format for any size
- **Customizable** colors and sizes
- **Consistent** styling across the theme
