```json ai-meta
{
  "id": "FEAT-001",
  "name": "Landing Page Sections",
  "category": "features",
  "lang": ["pt-BR"],
  "tags": ["hero", "who-we-are", "mission", "join", "sections", "content", "pt-br"],
  "dependencies": ["CORE-001", "CORE-003", "FEAT-005"],
  "stack": "next-app-router-website"
}
```

# Context: Landing Page Sections
**ID**: FEAT-001
**Category**: features
**Last Updated**: 2026-10-13T00:00:00Z
**Dependencies**: CORE-001, CORE-003, FEAT-005
**Description**: The page-block components (Hero, WhoWeAre, Mission, Join) and the title-with-tag helper.

## Summary
Each landing-page block is one component in `components/` (no `ui/` subfolder). They are stacked by `app/page.tsx` (CORE-001). All user-facing copy is Portuguese (`pt-BR`). Sections are mostly server components rendering static marketing content with Tailwind utilities.

## Key Information
- **`components/hero.tsx`** — dark hero (headline + intro + CTA) with animated background (`HeroBackground`), word-by-word `SplitText` `<h1>` and `Reveal` blocks; waits for the intro loader. First section on the page. See FEAT-005.
- **`components/ticker-band.tsx`** — tilted scroll-reactive marquee band between Hero and WhoWeAre (FEAT-005).
- **`components/upcoming-events.tsx`** — home block listing up to 3 upcoming events (stagger animation); data from FEAT-004.
- **`components/who-we-are.tsx`** — "Quem somos" block; describes the community.
- **`components/mission.tsx`** — mission/values block.
- **`components/join.tsx`** — call-to-action to join the community (links/buttons).
- **`components/title-with-tag.tsx`** — client helper that renders a section title with an animated blue bar; reused across sections. Accepts `className` + children.
- **Partners** is its own context (FEAT-003) because it adds a client-side carousel.
- **Conventions**: each section is a default-exported function component; uses Tailwind classes (token-backed); wraps content in a centered container; ids on `<section>` enable in-page anchor navigation (see FEAT-002).
- **Editing copy**: change text directly in the section component — there is no CMS or i18n dictionary; copy is inline Portuguese.

## Code References
- `components/hero.tsx:1`
- `components/who-we-are.tsx:1`
- `components/mission.tsx:1`
- `components/join.tsx:1`
- `components/title-with-tag.tsx:1` — shared title/eyebrow helper
- `components/ticker-band.tsx:1`
- `components/upcoming-events.tsx:1`
- `app/(site)/page.tsx:1` — stacking order (CORE-001)

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — where these sections are composed
- [CORE-003](../core/design-system.md) — primitives used inside sections
- [FEAT-005](../features/motion-and-visual-effects.md) — animation primitives used by the sections
- [FEAT-003](../features/partners-carousel.md) — the partners section (separate, client-side)

## Change Log
- 2026-10-13T00:00:00Z — Hero redesigned (dark, animated); added TickerBand and UpcomingEvents; TitleWithTag now animated; sections use Reveal/Parallax (FEAT-005).
- 2026-06-07T00:00:00Z — Initial context created from `components/` section files.
