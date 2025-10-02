# Context – src/components

Purpose
- Houses presentational and composite UI components for the app shell and extraction flow.

Guidance
- Prefer tokens from `globals.css` via Tailwind (e.g., `bg-primary`, `text-foreground`).
- Avoid hard-coded color hex; use theme variables for earthy/mocha palette.
- Use glass surfaces sparingly: `bg-white/5` + `border-white/10` + backdrop blur.

Theme notes
- Primary: mocha `--primary` (approx #6e5a4e)
- Accents: sand `#b08968`, terra `#c97a63`, olive `#7f8c5a`
- Text: `text-foreground` for readability on dark bg.

Key components
- `HeroSection.tsx`: hero gradients and title, aligned to new palette.
- `BottomInputBar.tsx`: input + CTA button uses theme accents.
- `ProgressModal.tsx`, `ExtractionLoader.tsx`: status coloring via tokens.



