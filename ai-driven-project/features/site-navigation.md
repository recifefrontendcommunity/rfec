```json ai-meta
{
  "id": "FEAT-002",
  "name": "Site Navigation (Header / Footer / Logo)",
  "category": "features",
  "lang": ["pt-BR"],
  "tags": ["header", "footer", "logo", "navigation", "chrome", "anchors", "eventos"],
  "dependencies": ["CORE-001", "CORE-003"],
  "stack": "next-app-router-website"
}
```

# Context: Site Navigation (Header / Footer / Logo)
**ID**: FEAT-002
**Category**: features
**Last Updated**: 2026-10-13T00:00:00Z
**Dependencies**: CORE-001, CORE-003
**Description**: The persistent chrome — Header, Footer, Logo — rendered by the site layout.

## Summary
The persistent site chrome (Header, Footer, Logo) is rendered once by `app/(site)/layout.tsx` (CORE-001), wrapping all marketing and content pages. Header now links to the `/eventos` page in addition to the in-page anchors. Footer also includes an `/eventos` link. Navigation mixes anchor-based links (single-page sections) and full routes (events). `Logo` is a shared brand mark used by both components.

## Key Information
- **`components/header.tsx`** — top navigation bar (client component: hides on scroll down, reappears on scroll up; logo hover animation). Renders the RFEC logo and a nav with: a `/eventos` link (Button variant `link`) and a `/#join` CTA ("Faça Parte"). Sticky, `z-30`.
- **`components/footer.tsx`** — site footer; community links including `/eventos`, `/#about`, `/#mission`, `/#join`, `/#partners`; social icons (GitHub, LinkedIn, Instagram, email); outlined RFEC watermark (reveal on scroll) and copyright with the year computed via `new Date().getFullYear()` (static page → evaluated at build/revalidation time, so it updates on the next deploy).
- **`components/logo.tsx`** — brand mark component reused by header/footer.
- **Placement rule**: chrome belongs in `app/(site)/layout.tsx` (the route group layout), **not** in the root `app/layout.tsx`. This keeps the Studio (`/studio`) and API routes (`/api/*`) free of marketing chrome.
- **Anchor navigation**: links target section `id`s (e.g. `/#partners`) or full routes (e.g. `/eventos`). When adding nav entries, ensure anchored sections set matching `id`s.

## Code References
- `components/header.tsx:1` — header / nav (includes `/eventos` link)
- `components/footer.tsx:1` — footer (includes `/eventos` link)
- `components/logo.tsx:1` — brand mark (also rendered by `app/opengraph-image.tsx` for the social preview)
- `app/(site)/layout.tsx:1` — renders `<Header>` / `<Footer>` around `{children}`

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — site layout that mounts the chrome
- [CORE-003](../core/design-system.md) — primitives/icons used by nav
- [FEAT-001](../features/landing-page-sections.md) — sections that anchor targets point to
- [FEAT-004](../features/events-module.md) — the /eventos route that Header/Footer now link to

## Change Log
- 2026-10-13T00:00:00Z — Header is now a client component that hides on scroll; footer got an animated watermark (FEAT-005).
- 2026-10-13T00:00:00Z — Footer copyright year is now dynamic instead of hard-coded 2025; noted Logo reuse in the OG image.
- 2026-06-07T00:00:00Z — Updated: chrome moved from root layout to app/(site)/layout.tsx; Header and Footer now include /eventos link (Events Module added).
- 2026-06-07T00:00:00Z — Initial context created; notes footer relocation to layout (`cf2ee0d`).
