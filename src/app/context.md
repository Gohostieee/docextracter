# Context – src/app

This folder hosts the Next.js App Router entry.

Key files
- `layout.tsx`: global metadata, font variables, and `globals.css` wiring.
- `page.tsx`: landing UI and extraction flow.
- `globals.css`: Tailwind, theme tokens, and custom UI effects.
- `api/extract/route.ts`: Main extraction API endpoint with JSR support.

## API Routes

### `/api/extract` (POST)
Main documentation extraction endpoint. Supports JavaScript-rendered (JSR) platforms.

**Request Body:**
- `url` (string, required): The URL to extract documentation from
- `guide` (string, required): Extraction guide/instructions
- `jsr` (boolean, optional, default: false): JavaScript render flag
  - When `true`: Uses local Puppeteer for full JavaScript rendering
  - When `false` or omitted: Uses fast HTTP fetch with fallback to Browserbase

**JSR Mode:**
- Initializes local Puppeteer instance
- Fetches fully-rendered HTML after JavaScript execution
- Suitable for SPA applications, React/Vue/Angular sites
- Automatically cleans up browser instance after completion

Guidance
- Prefer shadcn/ui primitives under `src/components/ui`.
- Use `AuroraBackground` + `ShineBorder` for hero/glass surfaces.
- Keep progress UX unified via `src/components/ProgressModal.tsx`.
- For JS-heavy sites, recommend using `jsr: true` flag.

Theme
- Earthy/Mocha palette is the default across dark/light modes.
- Use tokens: `--primary`, `--accent`, `--muted`, `--foreground`, etc. Avoid hard-coded hex.
- Background utilities `.bg-aurora`/`.bg-aurora-subtle` provide subtle gradients aligned to theme.

