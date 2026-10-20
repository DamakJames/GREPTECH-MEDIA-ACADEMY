# Greptech Media Academy — Asset & UI Handover Guidelines

This document provides clear instructions for supplying the official **Greptech Media Academy** brand assets, logo files, and UI designs for Stage 1 implementation.

---

## 1. Logo Asset Directory & Requirements

The project contains a dedicated asset directory ready to receive the official logo:

```text
GREPTECH-MEDIA-ACADEMY/
├── public/
│   └── assets/
│       └── logo/
│           ├── greptech-logo.png       <-- Place primary transparent logo here
│           ├── greptech-logo.svg       <-- (Optional) Vector SVG version
│           └── greptech-logo-white.png <-- (Optional) White monochrome version
```

### Logo Rules:
1. **Aspect Ratio & Proportions**: The logo must be preserved in its authentic proportions.
2. **Color Integrity**: The logo uses Charcoal Black (`#111820`), Signal Orange (`#F56B0A`), and White.
3. **Never Recreate**: Do not recreate the logo using generic web fonts.

---

## 2. Where to Place UI Designs, Wireframes & Screenshots

The user indicated:  
> *"creat the redme and roadpmp and all needed then i give you ui then you design"*

To provide the UI designs, choose one of the following methods:

### Option A: Place Image/Design Files in the Repository
Place your design exports, UI screenshots, mockups, or wireframes in:
```text
GREPTECH-MEDIA-ACADEMY/
└── docs/
    └── ui-designs/                     <-- Place screenshots, PNGs, JPEGs, or PDF mocks here
```

### Option B: Provide Figma / Design Links
If you have a Figma, Adobe XD, or web link to the designs, share the link directly in your response or paste it into a file:
```text
GREPTECH-MEDIA-ACADEMY/docs/ui-designs/DESIGN_LINKS.md
```

### Option C: Paste or Describe UI Elements Directly in Chat
You can describe the layout nuances, paste component wireframes, or upload image attachments directly into the Antigravity conversation window.

---

## 3. Production Imagery Specifications

For course banners, facilities, and student projects, high-resolution media will be stored under:

```text
public/assets/
├── hero/                              # High-impact cinematic banner photos
├── courses/                           # Photography, Cinematography, Sound gear photos
├── facilities/                        # Studio, sound stage, edit suites
└── students/                          # Showcase reels and photography portfolios
```

All image files should be optimized (WebP or compressed JPEG/PNG) to maintain sub-second loading speeds.

