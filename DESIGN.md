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
- Keep repeated feature data in typed catalogs and localized copy in message files; view components should compose those sources rather than duplicate them.

## Color

- The Purrfold palette is inspired by three cats and translated into semantic roles rather than literal photo samples.
- Siamese eye blue is the primary action, selected-state, focus-ring, and leading chart color.
- Faded calico cream and peach create warm surfaces, secondary controls, and the second chart color.
- Black tabby charcoal and taupe define text, dark surfaces, borders, and neutral chart colors; its olive-gold eyes provide the third chart color.
- Keep component code on semantic tokens such as `primary`, `secondary`, `muted`, and `accent`; do not apply palette values directly in components.
- Preserve WCAG AA contrast for normal text in both themes when adjusting any paired foreground and background token.

## Motion

- Use CSS-only motion; do not add Motion, Framer Motion, or another animation runtime.
- Animate only `transform` and `opacity` for movement. Color transitions may be used for state feedback.
- Use short, purposeful timings: 100–150ms for button feedback and up to 220ms for standard entrance motion.
- Use section reveal only for initial page hierarchy, card lift only on precise hover devices, and `scale(0.97)` for button press feedback.
- Do not animate layout properties such as width, height, margin, padding, or position offsets.
- Every project-owned animation must have an explicit `prefers-reduced-motion` fallback that removes animation, transition, and transform.
- Keyboard focus must remain visible and must not depend on motion or hover.
