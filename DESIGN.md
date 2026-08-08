---
name: Wanderly Editorial System
colors:
  surface: '#fff8f4'
  surface-dim: '#e2d8cf'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2e8'
  surface-container: '#f7ece2'
  surface-container-high: '#f1e6dd'
  surface-container-highest: '#ebe1d7'
  on-surface: '#1f1b15'
  on-surface-variant: '#57423b'
  inverse-surface: '#353029'
  inverse-on-surface: '#faefe5'
  outline: '#8a726a'
  outline-variant: '#dec0b7'
  surface-tint: '#a23f1a'
  primary: '#a23f1a'
  on-primary: '#ffffff'
  primary-container: '#e8734a'
  on-primary-container: '#581700'
  inverse-primary: '#ffb59d'
  secondary: '#4e6447'
  on-secondary: '#ffffff'
  secondary-container: '#d0eac4'
  on-secondary-container: '#546a4c'
  tertiary: '#276868'
  on-tertiary: '#ffffff'
  tertiary-container: '#629f9f'
  on-tertiary-container: '#003434'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822803'
  secondary-fixed: '#d0eac4'
  secondary-fixed-dim: '#b4cea9'
  on-secondary-fixed: '#0c2009'
  on-secondary-fixed-variant: '#374c31'
  tertiary-fixed: '#afeeed'
  tertiary-fixed-dim: '#93d1d1'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#014f50'
  background: '#fff8f4'
  on-background: '#1f1b15'
  surface-variant: '#ebe1d7'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style

This design system draws inspiration from high-end travel journalism and boutique hospitality. The personality is "The Discerning Explorer"—sophisticated but deeply welcoming. The visual direction blends **Modern Minimalism** with **Tactile/Scrapbook** elements. 

The goal is to evoke the feeling of flipping through a physical travel magazine: sun-drenched, aspirational, and deeply intentional. The UI uses generous whitespace to let high-resolution photography breathe, employing subtle overlapping layers to create a sense of depth and physical curation. Every interaction should feel like an invitation to a story rather than a utility in a tool.

## Colors

The palette is rooted in earth tones and natural pigments. 

- **Backgrounds**: Use the warm cream/sand (#FBF6EF) as the primary canvas to avoid the clinical feel of pure white. 
- **Accents**: The Terracotta (#E8734A) is reserved for high-intent actions and primary CTAs. Sage Green and Ocean Teal are used for categorization, secondary buttons, and success states.
- **Contrast**: Text and structural elements use Deep Charcoal (#2B2620) instead of black to maintain the warmth of the composition. 
- **Overlays**: When placing text over photography, use a 20-30% opacity tint of the Deep Charcoal or a warm-toned gradient to ensure legibility.

## Typography

The typography strategy relies on a classic high-contrast pairing. **Playfair Display** provides the editorial voice, used for storytelling, destination names, and section headers. **Inter** provides the functional backbone, ensuring high legibility for itineraries, metadata, and navigational elements.

- **Editorial Flourish**: Use `display-lg` for hero sections with tight letter-spacing.
- **Utility**: Labels should often use `textTransform: uppercase` with a slight letter-spacing increase to distinguish them from body copy.
- **Hierarchy**: Avoid using the serif font for small UI labels or buttons; keep the serif for "reading" and the sans-serif for "doing."

## Layout & Spacing

This design system uses a **Fluid Grid** with generous margins to mimic a magazine spread. 

- **Grid**: A 12-column grid on desktop, 4-column on mobile. Use wide gutters (24px) to maintain airiness.
- **Section Dividers**: Instead of horizontal lines, use soft, large-radius organic curves or "torn paper" style clipping paths to transition between background colors.
- **Layering**: Elements should intentionally break the grid. For example, a small caption card can overlap the corner of a full-bleed image by 32px to create the "scrapbook" feel.
- **Whitespace**: Vertical rhythm should be loose. Use `section-gap` (80px) between major content blocks to prevent the UI from feeling cluttered.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and **Ambient Shadows** rather than harsh borders.

- **Shadows**: Use multi-layered shadows with a warm tint. Instead of `rgba(0,0,0,0.1)`, use `rgba(43, 38, 32, 0.08)` to maintain harmony with the cream background. Shadows should have a large blur radius (20px+) and low spread to feel like natural sunlight.
- **Card Surfaces**: Cards should primarily use the background color or a slightly lighter "Paper" white. 
- **Z-Index Strategy**: Use depth to signify importance. Itinerary items that are "active" should lift slightly higher (increased shadow blur) than the rest of the list.

## Shapes

The shape language is organic and soft. 

- **Cards**: Use `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px) for destination cards and photography containers.
- **Interactive Elements**: Buttons, chips, and tags must be **Pill-shaped** (full border-radius) to contrast against the more structured rectangular cards.
- **Images**: Apply a slight "soft-focus" corner treatment. Avoid sharp 90-degree angles in any primary content container.

## Components

- **Buttons**: Primary buttons are pill-shaped, filled with Terracotta, and use white or cream text. Secondary buttons use a Sage Green outline or ghost style.
- **Cards**: "The Wanderly Card" features a full-bleed image with a 2:3 or 4:5 aspect ratio (editorial style). Typography is often placed in a small floating "paper" tag that overlaps the bottom-left corner.
- **Chips/Tags**: Small, pill-shaped, with a subtle Ocean Teal or Sage tint. Used for "Best for Families" or "Coastal" descriptors.
- **Input Fields**: Softly rounded (8px) with a cream-to-white gradient background. The focus state uses a 1px Terracotta border.
- **Navigation**: The bottom bar on mobile should have a slight backdrop blur (Glassmorphism) with a warm cream tint, making it feel like it's floating over the content.
- **Itinerary Timeline**: A vertical line that uses a hand-drawn or slightly irregular path rather than a perfectly straight vector, connecting nodes that represent trip stops.