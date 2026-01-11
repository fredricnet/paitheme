# Image Setup Guide

## Quick Setup

I've copied placeholder images from your existing theme. To get the actual images:

### Option 1: Manual Download (Recommended)

1. Open browser DevTools (Press F12)
2. Go to **Network** tab
3. Filter by "img" or "image"
4. Reload the page
5. Look for image files in the network requests
6. Right-click on each image → "Save image as..."
7. Save to the appropriate folder in `static/images/`

### Option 2: Browser Extension

Use a browser extension like:
- **Image Downloader** (Chrome/Firefox)
- **Download All Images** (Chrome)

1. Install the extension
2. Use the extension to download all images
3. Organize them into the correct folders

### Option 3: Check Image Status

Run the Python script to see what's missing:

```bash
cd performance.ai-2
python3 themes/pai-theme/download_images.py
```

## Required Images

### Hero Images (`static/images/hero/`)
- `hero-image.webp` - Main hero dashboard (currently using placeholder)
- `dashboard-foreground.webp` - Value proposition section (currently using placeholder)

### Feature Images (`static/images/features/`)
- `balance-overview.webp` - Balance Overview tab
- `transaction-ledger.webp` - Transaction Ledger tab
- `initiate-transfers.webp` - Initiate Transfers tab
- `generate-export.webp` - Generate & Export tab

**Note:** Currently using placeholder images from your existing theme.

### Logo Images (`static/images/logos/`)
Download as SVG files (preferred) or PNG:
- `mercury.svg`
- `watershed.svg`
- `retool.svg`
- `descript.svg`
- `perplexity.svg`
- `monzo.svg`
- `ramp.svg`
- `raycast.svg`
- `arc.svg`

## Image Optimization

After downloading:
1. Convert to WebP format for better compression
2. Optimize with tools like:
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)
   - [TinyPNG](https://tinypng.com/)

## Current Status

✅ Hero images: Using placeholders (copied from existing theme)
✅ Feature images: Using placeholders (copied from existing theme)
❌ Logo images: Need to be downloaded

The theme will work with placeholders, but for the best experience, download the actual images.

