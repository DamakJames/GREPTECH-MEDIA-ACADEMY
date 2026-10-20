# Greptech Media Academy — Brand Identity & Design System

## 1. Brand Essence & Visual Language

Greptech Media Academy is an elite creative tech institution. Its aesthetic draws inspiration from modern film schools, high-end production houses, and contemporary editorial design.

### Core Visual Principles:
- **Cinematic & Confident**: Strong visual impact, deep contrast, bold headlines, and rich photography of real media equipment (cameras, lighting, editing suites, mixing desks).
- **Clean & Editorial**: Dark hero sections transitioning into crisp, clean white and soft grey reading surfaces. No cluttered sidebars or generic academic templates.
- **Purposeful Color Usage**: Charcoal black provides depth and gravity; signal orange acts as a high-visibility accent reserved for calls to action, badges, and focal elements.
- **Restraint**: Subtle hover interactions, smooth page transitions, and purposeful typography. Avoid excessive gradients, floating particle backgrounds, or gimmicky animations.

---

## 2. Color Palette

```text
========================================================================
COLOR NAME          HEX VALUE     RGB               USAGE
========================================================================
Charcoal Black      #111820       rgb(17, 24, 32)   Primary dark surface, hero, footer, dark text
Signal Orange       #F56B0A       rgb(245, 107, 10) Primary CTA buttons, accents, highlights
Pure White          #FFFFFF       rgb(255, 255, 255)Card backgrounds, light content sections
Soft Grey           #F3F5F6       rgb(243, 245, 246)Section alternations, subtle borders, chips
========================================================================
```

### Supporting Neutral Scale
- **Dark Neutral 900**: `#111820` (Dark canvas, header, footer)
- **Dark Neutral 800**: `#1A222C` (Elevated dark card surfaces)
- **Dark Neutral 700**: `#2A3441` (Dark borders, dividers, subtle outlines)
- **Muted Text Light**: `#94A3B8` (Secondary text on dark surfaces)
- **Muted Text Dark**: `#64748B` (Secondary text on light surfaces)
- **Border Light**: `#E2E8F0` (Borders and dividers on light surfaces)
- **Light Neutral 100**: `#F3F5F6` (Background for secondary content zones)
- **Pure Canvas**: `#FFFFFF` (Content card backgrounds)

---

## 3. Typography Hierarchy

The typographic system pairs bold, modern sans-serif headings with high-legibility body type.

| Level | Size (Desktop) | Size (Mobile) | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 3.5rem (56px) | 2.25rem (36px) | 800 (Extrabold) | 1.1 | Homepage Hero Title |
| **Page Heading 1** | 2.75rem (44px) | 2rem (32px) | 700 (Bold) | 1.2 | Main page titles |
| **Section Heading 2** | 2rem (32px) | 1.5rem (24px) | 700 (Bold) | 1.3 | Major section titles |
| **Card Heading 3** | 1.25rem (20px) | 1.125rem (18px) | 600 (Semibold) | 1.4 | Course names, card titles |
| **Subheading** | 1.125rem (18px) | 1rem (16px) | 500 (Medium) | 1.5 | Section subheadings |
| **Body Large** | 1.125rem (18px) | 1rem (16px) | 400 (Regular) | 1.6 | Hero lead paragraphs |
| **Body Regular** | 1rem (16px) | 0.9375rem (15px) | 400 (Regular) | 1.6 | General copy, article text |
| **Body Small** | 0.875rem (14px) | 0.8125rem (13px) | 400 (Regular) | 1.5 | Meta info, footnotes, labels |
| **Overline / Badge** | 0.75rem (12px) | 0.75rem (12px) | 700 (Bold) | 1.0 | Uppercase category tags |

---

## 4. Component Design Specifications

### Buttons
- **Primary CTA (`.btn-primary`)**:
  - Background: `#F56B0A`
  - Text: `#FFFFFF`
  - Hover: `#D95A00` with subtle scale transition (`scale: 1.02`)
  - Padding: `12px 28px` (desktop), `10px 22px` (mobile)
  - Corner radius: `8px` (rounded-lg)
  - Font: Bold, 15px, letter-spacing +0.02em
- **Secondary CTA (`.btn-secondary`)**:
  - Background: Transparent with `#FFFFFF` or `#111820` border (1.5px)
  - Text: `#FFFFFF` on dark, `#111820` on light
  - Hover: Background fills with 10% opacity overlay
  - Padding: `12px 28px`
  - Corner radius: `8px`
- **Ghost / Text Button**:
  - Transparent background, `#F56B0A` text, underlined on hover with arrow icon `->`

### Cards
- **Dark Theme Card** (Used in dark sections):
  - Background: `#1A222C`
  - Border: 1px solid `#2A3441`
  - Corner radius: `12px` (rounded-xl)
  - Shadow: `0 4px 20px -2px rgba(0, 0, 0, 0.4)`
- **Light Theme Card** (Used in white sections):
  - Background: `#FFFFFF`
  - Border: 1px solid `#E2E8F0`
  - Corner radius: `12px` (rounded-xl)
  - Shadow: `0 4px 16px -2px rgba(17, 24, 32, 0.06)`

### Badges & Tags
- Height: 24px–28px, rounded-full
- Category tag: Background `#F56B0A` with 15% opacity, text `#F56B0A`, bold 12px uppercase

### Form Controls
- Inputs: Height 48px, background `#FFFFFF` (or `#1A222C` on dark forms), border 1px solid `#CBD5E1`, focus ring 2px `#F56B0A`
- Error states: Red border `#EF4444`, red validation feedback text below input

---

## 5. Imagery & Asset Guidelines

- **Style**: Real photographic captures of production environments:
  - Cinema cameras (RED, ARRI, Blackmagic, Sony FX series)
  - Studio lighting grids, boom mics, soundproof vocal booths
  - Multi-camera live-streaming setups, Blackmagic ATEM switchers
  - High-end color grading consoles and DaVinci Resolve setups
- **Logo Preservation Rule**:
  - The Greptech Media Academy logo must be preserved exactly as designed.
  - Never alter its proportions, remove the icon, change its colors, or replace it with a standard system font.
  - The logo should appear in the primary navigation header (height: 40px–48px) and in the footer.

---

## 6. Layout & Breakpoint System

We adhere to the standard Tailwind breakpoint system:
- **Mobile (`sm`)**: `< 640px` — Single column, collapsible slide-out drawer menu, stacked buttons
- **Tablet (`md`)**: `640px – 1023px` — Two column grid for cards, condensed navigation
- **Desktop (`lg`)**: `1024px – 1279px` — Full navigation, three column cards
- **Wide Desktop (`xl` / `2xl`)**: `1280px+` — Max container width `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)

