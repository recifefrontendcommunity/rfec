```json ai-meta
{
  "id": "FEAT-005",
  "name": "Motion & Visual Effects",
  "category": "features",
  "lang": ["pt-BR"],
  "tags": ["framer-motion", "animation", "parallax", "marquee", "intro-loader", "hero", "reduced-motion", "scroll"],
  "dependencies": ["CORE-001", "FEAT-001", "FEAT-002"],
  "stack": "next-app-router-website"
}
```

# Context: Motion & Visual Effects
**ID**: FEAT-005
**Category**: features
**Last Updated**: 2026-10-14T00:00:00Z
**Dependencies**: CORE-001, FEAT-001, FEAT-002
**Description**: framer-motion animation kit and decorative visuals (intro, hero, ticker, parallax, reveals).

## Summary
The landing page is animated with `framer-motion` (inspired by landonorris.com: splash intro, big scroll-reactive ticker, topographic lines, scroll reveals). All animation primitives are client components in `components/motion/`; section components stay server components and just import them. Everything respects `prefers-reduced-motion` through `MotionProvider` (`MotionConfig reducedMotion="user"`) plus explicit `useReducedMotion` checks in the marquee and intro.

## Key Information
- **Mounting**: `app/(site)/layout.tsx` wraps the site in `<MotionProvider>` and renders `<IntroLoader />` and `<ScrollProgress />` before the Header.
- **`intro-loader.tsx` + `intro-store.ts`** — blue splash with the crab-claw mark drawn via `pathLength`, then a curtain slide-up. Shown once per browser session (`sessionStorage` key `rfec-intro-seen`), skipped for reduced motion; locks `<html>` scroll while visible; `<noscript>` hides it without JS. `markIntroDone()` flips a tiny external store read by `useIntroDone()` so hero content (`waitIntro` prop on `Reveal`/`SplitText`) only animates once the splash is gone.
- **`reveal.tsx`** — `Reveal` (fade + slide on first view), `StaggerList`/`StaggerItem` (`<ul>`/`<li>` cascade; used by upcoming events cards).
- **`split-text.tsx`** — `SplitText`: headline words rise out of a mask; takes a `words` array (`text`, optional `className`, `br`). Used for the hero `<h1>` (renders real text, so SEO is intact).
- **`marquee.tsx`** — `Marquee`: endless ticker whose speed/direction follow scroll velocity (`useVelocity` + `useSpring`). Used by `components/ticker-band.tsx`.
- **`parallax.tsx`** — `Parallax`: drifts/scales a `fill` image inside an `overflow-hidden` parent while scrolling. Wraps images in WhoWeAre, Mission and the Join background.
- **`scroll-progress.tsx`** — blue progress bar fixed at the top.
- **`hero-background.tsx` + `topo-lines.tsx`** — decorative hero layer: self-drawing, slowly rotating topographic contour lines (deterministic generated paths, hydration-safe), a cursor-following blue glow, floating tech chips with mouse parallax (the lower ones are `lg`+ only to avoid covering text), and a faint rotated claw watermark.
- **`components/ticker-band.tsx`** — tilted blue band (two opposite marquees, filled/outlined words) between Hero and WhoWeAre; the wrapper uses `overflow-x-clip` + `bg-zinc-950` so the rotation never causes horizontal scroll.
- **Other touches**: `TitleWithTag` (client) animates its bar/label; `Header` (client) hides on scroll down and returns on scroll up; Footer has an outlined "RFEC" watermark; the Join button has a ping halo; `body` is `overflow-x-clip` and smooth scrolling is only enabled when motion is allowed.
- **Performance rules**: animate only `transform`/`opacity` (never `left/top`); no big CSS `blur()`/`backdrop-filter` on moving or sticky elements (hero glow is a radial-gradient, header and chips have no backdrop blur); endless loops are CSS keyframes (`rfec-float`, `spin` on the topo `<svg>`) so they run on the compositor and pause off-screen via `[data-active='false'] .rfec-anim`; `Marquee` and the hero pointer listener stop when out of view (`useInView`); `Parallax` only moves `y` (static `scale-[1.18]`). Judge smoothness on `npm run build && npm start`, not `npm run dev`.
- **Rules**: new animated pieces go in `components/motion/`; keep sections as server components and pass content as children; use `once: true` viewports; avoid random values during render (hydration).
- **Logo mark**: the claw path lives in `components/logo-mark-path.ts` (`LOGO_MARK_PATH`, `LOGO_MARK_VIEWBOX`) and is shared by `logo.tsx`, the intro, the hero watermark and the favicon.

## Code References
- `components/motion/` — all animation primitives
- `components/hero.tsx:1` — hero using `HeroBackground`, `SplitText`, `Reveal`
- `components/ticker-band.tsx:1` — scroll-reactive ticker band
- `components/logo-mark-path.ts:1` — shared claw path
- `app/(site)/layout.tsx:1` — `MotionProvider`, `IntroLoader`, `ScrollProgress`
- `app/globals.css` — `overflow-x-clip` on body, motion-safe smooth scroll

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — layout that mounts the provider/loader; page composition with `TickerBand`
- [FEAT-001](../features/landing-page-sections.md) — sections that consume the primitives
- [FEAT-002](../features/site-navigation.md) — animated Header and footer watermark

## Change Log
- 2026-10-14T00:00:00Z — Performance pass: CSS-driven loops, off-screen pausing, removed backdrop blur / big blur / layout-animating glow, fewer topo rings and marquee copies.
- 2026-10-13T00:00:00Z — Initial context: added framer-motion kit, intro loader, hero visuals, ticker band, parallax and reveals.
