```json ai-meta
{
  "id": "INFRA-001",
  "name": "Build & Runtime",
  "category": "infrastructure",
  "lang": ["en-US"],
  "tags": ["next", "turbopack", "typescript", "scripts", "dependencies", "vercel", "sanity", "env-vars"],
  "dependencies": ["CORE-001"],
  "stack": "next-app-router-website"
}
```

# Context: Build & Runtime
**ID**: INFRA-001
**Category**: infrastructure
**Last Updated**: 2026-10-13T00:00:00Z
**Dependencies**: CORE-001
**Description**: Toolchain, npm scripts, key dependencies, TS config, and how the app runs/builds.

## Summary
Next.js 16 (App Router) + React 19 + TypeScript 5, built with Turbopack in dev. No test runner is configured. Dependencies now include the Sanity CMS stack (`next-sanity`, `sanity`, `@sanity/image-url`, `@sanity/vision`, `@sanity/webhook`, `styled-components`, `server-only`). `@/*` path alias maps to the repo root.

## Key Information
- **Runtime/framework**: `next@16.2.7`, `react@19` / `react-dom@19`, `typescript@5`.
- **npm scripts** (`package.json`):
  - `npm run dev` — Next dev server with `--turbopack`
  - `npm run build` — production build
  - `npm run start` — serve the production build
  - `npm run lint` — `eslint .` (see INFRA-002)
  - `prepare` — `husky` (installs git hooks, see INFRA-003)
- **No tests**: there is no test runner; do not assume `npm test` exists.
- **Key deps (existing)**: `embla-carousel-react` + `embla-carousel-auto-scroll` (FEAT-003), `framer-motion` (FEAT-005), `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `tailwindcss@4` + `@tailwindcss/postcss`, `tailwindcss-animate`.
- **Key deps (Sanity — added by Events Module)**:
  - `next-sanity` — typed client, `sanityFetch`, Studio helpers, draft-mode utilities
  - `sanity` — Studio core
  - `@sanity/image-url` — image URL builder for `cdn.sanity.io` assets
  - `@sanity/vision` — GROQ explorer plugin for embedded Studio
  - `@sanity/webhook` — `parseBody` for signature-verified webhook payloads
  - `styled-components` — required by the embedded Sanity Studio
  - `server-only` — guards `sanity/lib/token.ts` from client bundle inclusion
- **Environment variables** (see `.env.example`): `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`. See INFRA-004 for details.
- **TypeScript**: `tsconfig.json` sets the `@/*` → repo-root path alias (`@/components`, `@/lib/utils`, `@/sanity/lib/queries`, …). `next-env.d.ts` is generated.
- **`next.config.ts`**: adds `images.remotePatterns` for `https://cdn.sanity.io/images/**` so `next/image` can optimize Sanity-hosted images.
- **Versions are pinned** (notably React/Next); there is a `package.json#overrides` for `@types/react*`. Keep alignment when upgrading.

## Code References
- `package.json` — scripts, dependencies, overrides
- `tsconfig.json` — `@/*` path alias, compiler options
- `next.config.ts:1` — `cdn.sanity.io` remote image pattern
- `postcss.config.mjs` — Tailwind v4

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — what the build serves
- [INFRA-002](../infrastructure/linting-and-formatting.md) — lint script details
- [INFRA-003](../infrastructure/git-and-commit-conventions.md) — `prepare`/husky hooks
- [INFRA-004](../infrastructure/sanity-cms-layer.md) — Sanity CMS layer (new deps detail)

## Change Log
- 2026-10-13T00:00:00Z — Added framer-motion to key dependencies.
- 2026-06-07T00:00:00Z — Added Sanity-related dependencies (next-sanity, sanity, @sanity/image-url, @sanity/vision, @sanity/webhook, styled-components, server-only); next.config.ts now has cdn.sanity.io remote pattern; env vars documented.
- 2026-06-07T00:00:00Z — Initial context created from `package.json` and TS/Next config.
