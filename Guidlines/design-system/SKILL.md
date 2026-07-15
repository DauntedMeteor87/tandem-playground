---
name: tandemclub-design
description: Use this skill to generate well-branded interfaces and assets for tandemclub, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — the full design guide: content voice, visual foundations, iconography, mascot, component + UI-kit index.
- `styles.css` — the single stylesheet to link; it `@import`s everything in `tokens/`.
- `tokens/` — colors (+ 4 palette moods via `data-palette`), typography, spacing, shadows, fonts.
- `components/` — React primitives (`core/`, `forms/`, `product/`); each has a `.prompt.md` with usage.
- `ui_kits/` — interactive product recreations (`mobile/`, `web/`).
- `assets/mascot/` — the orangutan stage SVGs.

## Brand in one breath
Warm Impressionist (Monet, broken brushwork, sunlit). Sunset-coral action on a
warm-cream neutral ramp; painterly photo grade; Newsreader serif for moments,
Hanken Grotesk sans for UI. Copy is warm, plain, sentence-case, second-person,
for an 18–22-year-old finding their people. Never corporate, never doomscroll-gray.
