---
title: "Hugo Module"
description: "A reusable package of Hugo components that can be imported into Hugo sites"
---

# Hugo Module

A **Hugo module** is a reusable package of Hugo components (themes, layouts, content, static files) that can be imported into Hugo sites. It's based on Go modules, so Hugo uses Go's dependency management system.

## Features

- Versioning via Git tags
- Centralized theme management
- Easy updates across multiple sites
- No file duplication

## Usage Example

```yaml
module:
  imports:
    - path: github.com/fredricnet/paitheme
```

This dictionary entry demonstrates how terms are displayed in the dictionary section of PAI Theme.
