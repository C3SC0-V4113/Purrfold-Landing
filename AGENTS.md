<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This project uses Next.js 16 or newer. APIs and conventions may differ from model memory. Read relevant guides in `node_modules/next/dist/docs/` before changing Next.js code.

<!-- END:nextjs-agent-rules -->

## Quality Gates

Run these before claiming implementation complete:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run format:check`
4. `npm run test`

- Run `npm run test:e2e` when E2E behavior changed.
- Prefer `CI=1 npx playwright test tests/e2e/localized-routing.spec.ts --project=chromium --workers=1` before full E2E when localized routing changes.
- `npm run doctor`
- `npm run check`

Do not use `next lint`; use the ESLint CLI.

## Localized Routing Reminders

- This repo uses locale-prefixed routing at `/en` and `/es`.
- Treat `proxy.ts` as the only redirect authority for root negotiation and unsupported locale fallback.
- Next.js 16 `params` are async; use `PageProps`/`LayoutProps` helpers and await params before reading values.
- Spanish landing copy must remain neutral/professional and avoid country-specific idioms.
- Project-owned motion is CSS-only and must follow `docs/adr/0004-css-only-animation-policy.md`.

## References

- Architecture and scripts: `README.md`
- Design rules: `DESIGN.md`
- Next.js guidance: `.agents/skills/next-best-practices/SKILL.md`
- Minimum evaluation: `.agents/skills/project-min-evaluation/SKILL.md`
- Vitest guidance: `.agents/skills/vitest/SKILL.md`
- Playwright guidance: `.agents/skills/playwright-best-practices/SKILL.md`
- Commit messages are checked with commitlint.

## shadcn MCP

For this repository, shadcn MCP is enabled through repo-level `opencode.json` and should be treated as important project tooling when working with shadcn/base-rhea components.

shadcn MCP setup is optional globally and was not run by default for every client.

```bash
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client codex
npx shadcn@latest mcp init --client opencode
```

For Codex, verify `~/.codex/config.toml` if MCP is not available:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

shadcn presets are supported through `--shadcn-args --preset <id>`.

## Claude Code

`CLAUDE.md` points to this file. `.claude/skills` should link to `.agents/skills`.
