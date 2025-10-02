# Context – src/app/subscribe

Purpose
- Provide the subscription landing with Clerk pricing and theme-aligned styling.

Design
- Uses mocha palette via global tokens; background is deep mocha `#0e0d0b` with animated Warp shader and subtle noise mask.
- Content wrapped in a subtle "shine-border" frame and glass card to match the app aesthetic.
- Clerk components are themed globally through `ClerkProvider` appearance (see `src/config/clerk-appearance.ts`).

Guidance
- Prefer tokens/classes: `text-foreground`, `bg-secondary`, `bg-accent`, `border-input`, etc.
- Avoid hard-coded hex in components; use tokens from `globals.css`.
- Keep page heading concise, with `Member Plans` pill and accent on key phrase.

Ownership
- Styling and appearance: App team
- Pricing/plan content: Clerk dashboard configuration

