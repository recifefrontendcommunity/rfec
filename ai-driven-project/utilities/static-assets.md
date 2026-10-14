```json ai-meta
{
  "id": "UTIL-002",
  "name": "Static Assets",
  "category": "utilities",
  "lang": ["en-US", "pt-BR"],
  "tags": ["assets", "public", "images", "pictures", "next-image", "favicon"],
  "dependencies": ["FEAT-003"],
  "stack": "next-app-router-website"
}
```

# Context: Static Assets
**ID**: UTIL-002
**Category**: utilities
**Last Updated**: 2026-10-13T00:00:00Z
**Dependencies**: FEAT-003
**Description**: Where images/pictures live under public/ and how they are referenced via next/image.

## Summary
Static assets live under `public/`, organized in `public/assets/` with `images/` (logos, branded card art) and `pictures/` (community photos). They are served from the web root (`/assets/...`) and consumed mostly through `next/image`.

## Key Information
- **Layout**:
  - `public/assets/images/` — `fiap.png`, `iv.png` (partner logos, FEAT-003), `FRENTE.png`, `VERSO.png` (card art), and similar branded images.
  - `public/assets/pictures/` — community event photos (`picture1.jpeg`, `picture2.jpeg`, …).
  - Favicon: `app/icon.tsx` + `app/apple-icon.tsx` generate the crab-claw icon from `components/logo-mark-path.ts` (no `favicon.ico` file any more).
- **Social preview**: not a static file — `app/opengraph-image.tsx` / `app/twitter-image.tsx` generate the PNG at request/build time from the `RFECLogo` component (see CORE-001).
- **Referencing**: paths are root-relative and omit `public` — e.g. `src="/assets/images/fiap.png"`. Prefer `next/image` `<Image>` with explicit `width`/`height` and a Portuguese `alt`.
- **Adding assets**: place files under the correct `public/assets/<images|pictures>/` folder; reference with the `/assets/...` URL. Keep filenames lowercase/kebab where possible (existing set mixes cases — match the section that uses them).
- **Optimization**: `next/image` handles responsive sizing/lazy loading; do not hand-roll `<img>` for content imagery.

## Code References
- `public/assets/images/` — logos + branded art
- `public/assets/pictures/` — community photos
- `components/partners.tsx:31` — `next/image` reference pattern (`/assets/images/...`)
- `app/icon.tsx`, `app/apple-icon.tsx` — generated favicon / touch icon

## Related Contexts
- [FEAT-003](../features/partners-carousel.md) — primary consumer of `images/` logos
- [CORE-001](../core/app-router-and-composition.md) — favicon/metadata via App Router

## Change Log
- 2026-10-13T00:00:00Z — Favicon is now generated from the logo claw instead of a static .ico.
- 2026-10-13T00:00:00Z — Documented that the social preview image is generated, not stored in public/.
- 2026-06-07T00:00:00Z — Initial context created from `public/assets/` listing.
