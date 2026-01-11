---
title: "Typography"
description: "Typography examples showcasing headings, body text, lists, blockquotes, and code blocks"
weight: 2
---

# Typography

This section demonstrates how **typography** is styled in PAI Theme. The theme uses **Inter** as the primary typeface with a clean, modern scale.

## Headings

PAI Theme provides six levels of headings. Here's how they look:

# Heading 1 - Page Titles
## Heading 2 - Section Headers
### Heading 3 - Subsections
#### Heading 4 - Card Titles
##### Heading 5 - Small Headings
###### Heading 6 - Micro Headings

**Note**: Headings automatically create the table of contents on documentation pages.

## Body Text

Regular paragraph text uses comfortable line-height for readability. This makes long-form content easy to read. The typography system is designed for both light and dark modes.

**Bold text** is used for emphasis, while *italic text* provides subtle emphasis. You can also use `inline code` for technical terms.

## Lists

**Unordered List:**
- First item with some description
- Second item with more detail
- Third item in the list
  - Nested item one
  - Nested item two

**Ordered List:**
1. First step in the process
2. Second step with explanation
3. Third step to complete
   1. Sub-step A
   2. Sub-step B

**Note**: Lists are styled cleanly and support nested items.

## Blockquotes

> "Great design is not about decoration, but about solving problems with elegance and clarity."
> 
> — Design Principles

**Note**: Blockquotes are styled with a left border and distinctive background.

## Code Blocks

The theme includes syntax highlighting for code blocks:

```yaml
# Example YAML configuration
module:
  imports:
    - path: github.com/fredricnet/pai-theme
```

```javascript
// Example JavaScript function
function greet(name) {
    return `Hello, ${name}! Welcome to PAI Theme.`;
}

const message = greet('Developer');
console.log(message);
```

```css
/* Example CSS styling */
.component {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    border-radius: var(--radius);
}
```

**Note**: Code blocks support syntax highlighting for many languages and are styled with a dark background.

## Summary

This typography system provides:
- Clear hierarchy with six heading levels
- Readable body text with comfortable line-height
- Styled lists (ordered and unordered) with nesting support
- Distinctive blockquotes for quotes and callouts
- Syntax-highlighted code blocks for technical documentation
