# Design Standard

This file is the UI/UX source of truth for this app.

## Principles

- Build the actual product surface first; avoid marketing-only landing pages.
- Prefer dense, calm, scannable layouts for operational tools.
- Use semantic tokens from `app/globals.css`.
- Keep loading, empty, error, and partial-data states explicit.
- Make controls accessible, keyboard reachable, and clearly labeled.
- Keep Spanish landing copy neutral, professional, and sober; avoid country-specific idioms.

## Routing and i18n

- Phase 1 public content lives under `app/[locale]` with supported locales `en` and `es`.
- `proxy.ts` is the single redirect authority for `/` negotiation and unsupported-locale fallback.
- Next.js 16 route `params` are async Promises; use `PageProps<'/route'>` and `LayoutProps<'/route'>` helpers and `await` params before access.
- Keep metadata, alternates, and sitemap aligned with the shared route contract in `i18n/routing.ts`.

## Components

- Use shadcn primitives before custom markup.
- Use lucide icons for icon buttons and provide accessible labels.
- Use tables for detailed records, cards for repeated metrics, and charts only when they answer a clear comparison question.
- Do not nest cards inside cards.

## Motion

- Use subtle transitions only when they clarify state.
- Respect reduced-motion preferences for non-trivial animation.
