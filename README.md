# Purrfold landing

Next.js 16 landing app with strict quality tooling, localized Phase 1 routing, shadcn, React Doctor, React Scan, and agent-facing docs.

## Localized routing

Phase 1 ships locale-prefixed routes for English and Spanish:

- `/en`, `/es`
- `/[locale]/install`
- `/[locale]/skills`
- `/[locale]/quality`
- `/[locale]/ecosystem`

`/` is redirect-only and locale negotiation is handled in `proxy.ts`.

Routing and i18n decisions are documented in `docs/adr/0001-i18n-and-routing.md`.

## Development

```bash
npm run dev
```

## Quality

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test
npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1
npm run test:e2e
npm run doctor
npm run check
```

For safer local E2E iteration, prefer the localized-routing spec first and run full E2E only after targeted coverage is stable.

## Tooling

- Next.js App Router with TypeScript and Tailwind.
- shadcn UI initialized through the shadcn CLI.
- ESLint flat config with strict Next.js, React, import ordering, and Prettier integration.
- React Doctor and React Scan.
- Vitest and React Testing Library.
- Playwright E2E testing.
- Conventional commit linting.

## shadcn MCP

shadcn MCP setup was not run by default because some clients may update user-level tool config.

Manual setup commands for this package manager:

```bash
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client codex
npx shadcn@latest mcp init --client opencode
```

Codex may require user-level configuration in `~/.codex/config.toml`:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## shadcn Presets

purrfold forwards additional shadcn CLI arguments, including official presets:

```bash
npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes
npx purrfold@latest my-app --shadcn-args --preset b1sSLwZVp --yes
npx purrfold@latest my-app --shadcn-args --preset b2qMI9ufY --yes
npx purrfold@latest my-app --shadcn-args --preset b5eH0WVTX --yes
```

## Agent Docs

- `AGENTS.md`: agent workflow and quality gates.
- `DESIGN.md`: UI/UX and localized routing guardrails.
- `.agents/skills`: local and installed skills.
- `CLAUDE.md`: Claude Code pointer to `AGENTS.md`.
