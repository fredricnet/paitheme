---
title: "Components"
description: "UI components including cards, buttons, badges, and more"
weight: 4
---

# Components

This section demonstrates the **UI components** available in PAI Theme. These components are built using shortcodes and provide consistent styling across the theme.

## Cards

Cards are used to organize content into distinct, scannable units. The theme provides a `card` shortcode:

```markdown
{{</* card title="Feature Name" icon="star" */>}}
Card content goes here. Cards are great for highlighting features,
documentation sections, or any grouped content.
{{</* /card */>}}
```

**Note**: Cards can include icons, titles, and custom content. They're responsive and work well in grid layouts.

## Buttons

Buttons use the theme's primary color and are styled consistently:

- **Primary buttons** - Main call-to-action buttons
- **Secondary buttons** - Alternative actions
- **Ghost buttons** - Subtle actions with transparent background

**Note**: Button styles are configurable via CSS variables and can be customized to match your brand.

## Badges

Badges are small labels used for tags, status indicators, or categories. They're styled with rounded corners and use the theme's color system.

**Note**: Badges are typically used inline with text or in lists to categorize content.

## Summary

PAI Theme includes many reusable components that can be customized via CSS variables. This ensures:

- **Consistency** - All components use the same design system
- **Customization** - Easy to adjust via CSS variables
- **Responsiveness** - Components work on all screen sizes
- **Accessibility** - Proper semantic HTML and ARIA attributes
