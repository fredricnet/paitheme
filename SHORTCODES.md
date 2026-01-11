# Shortcodes Documentation

This theme includes reusable shortcodes for creating card-based layouts. Use these shortcodes in your markdown content files to easily add cards to product and blog pages.

## Available Shortcodes

### `feature-card`

Use this shortcode for product/features page cards.

**Parameters:**
- `title` (required): Card title
- `description` (required): Card description
- `image` (required): Main image path (e.g., `/images/homepage/features-tabs/1.webp`)
- `bg-image` (optional): Background image path for feature cards
- `link` (optional): Link URL
- `link-text` (optional): Link text (default: "Read more")
- `size` (optional): Card size - `"1"` (1 column), `"2"` (2 columns), or `"full"` (full width). Default: `"1"`

**Example:**
```markdown
{{< feature-card 
    title="Balance Overview"
    description="See your total and per-account cash in a glance."
    image="/images/homepage/features-tabs/1.webp"
    bg-image="/images/homepage/features-tabs/bg-small.webp"
    link="/features/support"
    size="1"
>}}
```

### `blog-card`

Use this shortcode for blog page cards.

**Parameters:**
- `title` (required): Card title
- `description` (required): Card description
- `image` (optional): Main image path
- `category` (optional): Category badge text (e.g., "Featured Insight", "Product update", "Customer story")
- `link` (required): Link URL
- `featured` (optional): Set to `"true"` for featured/large card
- `size` (optional): Card size - `"1"` (1 column), `"2"` (2 columns), or `"full"` (full width). Default: `"1"`

**Example:**
```markdown
{{< blog-card 
    title="5 Strategies to Optimize Cash Flow Across Multiple Bank Accounts"
    description="Maintaining healthy liquidity..."
    image="/images/blog/1.webp"
    category="Featured Insight"
    link="/blog/5-strategies-to-optimize-cash-flow"
    featured="true"
    size="full"
>}}
```

### `card-grid`

Use this shortcode as a wrapper for organizing cards in a grid layout.

**Parameters:**
- `columns` (optional): Number of columns - `"2"` or `"3"` (default: `"3"`)
- `class` (optional): Additional CSS classes

**Example:**
```markdown
{{< card-grid columns="3" >}}
  {{< feature-card ... >}}
  {{< feature-card ... >}}
  {{< feature-card ... >}}
{{< /card-grid >}}
```

## Usage Examples

### Product Page (3-column layout with 2+1 pattern)

```markdown
{{< feature-card size="1" ... >}}
{{< feature-card size="1" ... >}}
{{< feature-card size="1" ... >}}
{{< feature-card size="2" ... >}}
{{< feature-card size="1" ... >}}
```

### Blog Page (Featured + Regular cards)

```markdown
{{< blog-card featured="true" size="full" ... >}}
{{< blog-card size="1" ... >}}
{{< blog-card size="1" ... >}}
{{< blog-card size="1" ... >}}
```

## Card Sizing Guide

- **Size "1"**: 1 column width (1/3 of a 3-column grid, 1/2 of a 2-column grid)
- **Size "2"**: 2 columns width (2/3 of a 3-column grid, full width of a 2-column grid)
- **Size "full"**: Full width (spans all columns)

## Notes

- Cards automatically arrange themselves in a grid based on their size
- The grid layout is responsive and will stack to a single column on mobile devices
- Featured blog cards (`featured="true"`) automatically span the full width regardless of size parameter
- All cards maintain consistent styling and hover effects
- Images will display placeholders if the image file is not found

