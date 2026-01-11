#!/usr/bin/env python3
"""
Script to help download images for PAI Theme
Run this script and follow the instructions to download images manually
or use it with browser automation tools.
"""

import os
import json
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).parent.parent.parent
IMAGES_DIR = BASE_DIR / "static" / "images"

# Required images
REQUIRED_IMAGES = {
    "hero": [
        "hero-image.webp",
        "hero-background.webp"
    ],
    "features": [
        "feature-1.webp",
        "feature-2.webp",
        "feature-3.webp",
        "feature-4.webp",
        "bg-small.webp"
    ],
    "logos": [
        "mercury.svg",
        "watershed.svg",
        "retool.svg",
        "descript.svg",
        "perplexity.svg",
        "monzo.svg",
        "ramp.svg",
        "raycast.svg",
        "arc.svg"
    ]
}

def check_images():
    """Check which images are missing"""
    missing = {}
    existing = {}
    
    for category, images in REQUIRED_IMAGES.items():
        category_dir = IMAGES_DIR / category
        category_dir.mkdir(parents=True, exist_ok=True)
        
        missing[category] = []
        existing[category] = []
        
        for image in images:
            image_path = category_dir / image
            if image_path.exists():
                existing[category].append(image)
            else:
                missing[category].append(image)
    
    return missing, existing

def print_status():
    """Print status of images"""
    missing, existing = check_images()
    
    print("=" * 60)
    print("PAI Theme - Image Status")
    print("=" * 60)
    print()
    
    for category in REQUIRED_IMAGES.keys():
        print(f"\n{category.upper()}:")
        if existing[category]:
            print(f"  ✓ Existing ({len(existing[category])}):")
            for img in existing[category]:
                print(f"    - {img}")
        
        if missing[category]:
            print(f"  ✗ Missing ({len(missing[category])}):")
            for img in missing[category]:
                print(f"    - {img}")
        else:
            print(f"  ✓ All images present!")
    
    print("\n" + "=" * 60)
    print("\nTo download missing images:")
    print("1. Open browser DevTools (F12)")
    print("2. Go to Network tab → Filter by 'img'")
    print("3. Reload page and look for image requests")
    print("4. Right-click images → Save image as...")
    print("\nOr use browser extension like 'Image Downloader'")
    print("=" * 60)

if __name__ == "__main__":
    print_status()

