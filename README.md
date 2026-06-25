# Purrfold landing

Localized Next.js 16 landing hub for explaining how Purrfold scaffolds a project, which skills it selects, which quality tools it installs, and which UI resources shape its ecosystem.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/es`. The root route is redirect-only and negotiates the locale through `proxy.ts`.

## Public routes

| Route                 | Purpose                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `/[locale]`           | Product overview, quick installation, foundations, and roadmap    |
| `/[locale]/install`   | CLI and agent installation flows                                  |
| `/[locale]/skills`    | Selected agent skills and composition guidance                    |
| `/[locale]/quality`   | Quality gates, commit hygiene, CI confidence, and runtime insight |
| `/[locale]/ecosystem` | shadcn/ui foundation and compatible community resources           |

English (`en`) is the default locale. Spanish (`es`) copy must remain neutral and professional.

## Architecture

- **Routing:** locale-prefixed App Router pages under `app/[locale]`.
- **Redirect authority:** `proxy.ts` owns root negotiation and unsupported-locale fallback.
- **Route contract:** `i18n/routing.ts` defines locales, public routes, localized paths, alternates, and external links.
- **Messages:** `messages/en.json` and `messages/es.json`, accessed through `i18n/messages.ts`.
- **UI:** shadcn/base-rhea and Base UI primitives, with semantic tokens in `app/globals.css`.
- **Rendering:** server-first; client components are reserved for actual interaction.
- **Motion:** CSS-only, compositor-friendly, and disabled for reduced-motion preferences.

See [DESIGN.md](DESIGN.md) for UI rules and [docs/adr](docs/adr) for durable decisions.

## Quality gates

Run the full local gate before claiming implementation complete:

```bash
npm run check
```

The underlying commands are:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test
npm run doctor
```

When browser behavior changes, run targeted Playwright coverage first and then the full suite:

```bash
CI=1 npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1
npm run test:e2e
```

## Add a localized page or section

1. Add the route to `phaseOneRoutes` in `i18n/routing.ts` when it is a new public page.
2. Create the server page under `app/[locale]` and await its locale params.
3. Add equivalent keys to `messages/en.json` and `messages/es.json`.
4. Reuse shadcn primitives and shared page components before adding custom markup.
5. Add unit coverage for both locales and E2E coverage for navigation or interaction changes.
6. Update metadata, sitemap expectations, navigation, and this route table when applicable.

## Add a locale

Adding a locale is a cross-cutting routing and SEO change:

1. Extend `locales` in `i18n/routing.ts`.
2. Add and register the locale message file in `i18n/messages.ts`.
3. Update proxy negotiation, metadata alternates, sitemap tests, switcher labels, and localized E2E coverage.
4. Review ADR 0001 before changing prefix or fallback behavior.

## shadcn MCP

For this repository, shadcn MCP is enabled through repo-level `opencode.json` for project-aware documentation, registry access, and component workflows. Client-specific setup remains optional:

```bash
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client codex
npx shadcn@latest mcp init --client opencode
```

Purrfold forwards official shadcn preset arguments:

```bash
npx purrfold@latest my-app --shadcn-args --preset b1L5DVZqDI --yes
```

## Maintainer references

- `AGENTS.md` — agent workflow and quality gates.
- `DESIGN.md` — visual, composition, accessibility, and motion rules.
- `docs/adr/README.md` — architecture decision index.
- `.agents/skills` — project-specific implementation and verification guidance.
- `CLAUDE.md` — Claude Code pointer to `AGENTS.md`.
