---
title: "Colors & CSS Variables"
description: "Design tokens and color system for PAI Theme customization"
weight: 3
---

# Colors & CSS Variables

This section demonstrates the **color system and CSS variables** used in PAI Theme. The theme uses CSS custom properties (variables) for easy customization.

## Color Palette

PAI Theme uses a dark-mode-first color palette:

- **Background Colors**: Dark backgrounds (`--bg-color`, `--bg-secondary`)
- **Text Colors**: Light text with various contrast levels (`--text-color`, `--text-muted`)
- **Primary Color**: Accent color for links, buttons, and highlights
- **Border Color**: Subtle borders with transparency

## CSS Variables

The theme's color system is defined in `static/css/variables.css`. Key variables include:

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

## Customization

To customize colors, edit the CSS variables in `static/css/variables.css`. This allows you to:

1. **Change the color palette** - Update background and text colors
2. **Adjust contrast** - Modify text colors for better readability
3. **Customize accents** - Change primary color to match your brand
4. **Fine-tune spacing** - Adjust layout variables like container width

## Usage Example

When you modify CSS variables, all components automatically use the new colors:

- Backgrounds use `--bg-color` and `--bg-secondary`
- Text uses `--text-color` and `--text-muted`
- Borders use `--border-color`
- Buttons and links use `--primary-color`

**Note**: This variable-based system ensures consistent theming across all components.
