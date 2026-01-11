#!/bin/bash

# Script to download images for PAI Theme
# Run this from the performance.ai-2 directory

# Create directories
mkdir -p static/images/hero
mkdir -p static/images/features
mkdir -p static/images/logos

echo "Downloading images for PAI Theme..."
echo "Note: You may need to manually download some images"

# For now, we'll create a guide
cat > static/images/README.md << 'EOF'
# Image Download Guide

To get the images for this theme:

1. Open browser DevTools (F12)
2. Go to Network tab and filter by "img" or "image"
3. Right-click on images and "Save image as..."

## Required Images:

### Hero Images
- hero-image.webp (or .png) - Main hero dashboard image
- dashboard-foreground.webp - Foreground version for value proposition

### Feature Images (from tabs)
- balance-overview.webp - Balance Overview tab image
- transaction-ledger.webp - Transaction Ledger tab image  
- initiate-transfers.webp - Initiate Transfers tab image
- generate-export.webp - Generate & Export tab image

### Logo Images (SVG preferred)
Download company logos as SVG files:
- mercury.svg
- watershed.svg
- retool.svg
- descript.svg
- perplexity.svg
- monzo.svg
- ramp.svg
- raycast.svg
- arc.svg

## Alternative: Use Browser Extension

You can use a browser extension like "Image Downloader" to bulk download images from the page.

## Image Optimization

After downloading, optimize images:
- Use WebP format for better compression
- Compress with tools like Squoosh or ImageOptim
- Recommended sizes:
  - Hero images: 1200-1600px width
  - Feature images: 800-1200px width
  - Logos: SVG format preferred, or 200px width PNG
EOF

echo "Created static/images/README.md with download instructions"
echo "Please follow the instructions to download the images manually"

