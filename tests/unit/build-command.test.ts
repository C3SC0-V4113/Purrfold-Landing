import { describe, expect, it } from 'vitest';

import {
  buildAgentPrompt,
  buildCliCommand,
  defaultFlags,
  type FlagState,
} from '@/lib/build-command';

function buildFlags(overrides: Partial<FlagState> = {}): FlagState {
  return { ...defaultFlags, ...overrides };
}

const enOutput = {
  command: 'npx purrfold@latest <project-directory>',
  agentIntro:
    'Scaffold a new {framework} app with purrfold (https://www.npmjs.com/package/purrfold). Read the README or run `npx purrfold@latest info --json` to discover available options.',
  agentInclude: 'Include {options}.',
  agentExclude: 'Do NOT include {options}.',
  agentOptionUnit: 'unit tests (Vitest)',
  agentOptionE2e: 'E2E tests (Playwright)',
  agentOptionCommitlint: 'commitlint + Husky',
  agentOptionMcp: 'shadcn MCP',
  agentOptionMotion: 'Motion for React (motion-framer skill)',
  agentOptionYes: 'non-interactive mode',
  agentSsr: 'Enable Astro SSR instead of a static build.',
  agentAdapter: 'Use the {adapter} adapter for Astro SSR.',
  agentPm: 'Use {pm} as the package manager.',
  agentPreset: 'Use shadcn preset {presetId}.',
  agentOutro: 'Run `npm run check` after scaffolding to verify everything works.',
} as const;

describe('buildCliCommand', () => {
  it('renders the base command with default flags (explicit --no-* for off flags)', () => {
    expect(buildCliCommand(defaultFlags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
    );
  });

  it('omits --framework for the default Next.js framework', () => {
    expect(buildCliCommand(buildFlags({ framework: 'next' }), enOutput.command)).not.toContain(
      '--framework'
    );
  });

  it('appends all selected flags, package manager, and preset', () => {
    const flags = buildFlags({
      unit: true,
      e2e: true,
      commitlint: true,
      mcp: true,
      yes: true,
      pm: 'pnpm',
      presetId: 'b3REw8vwo',
    });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --e2e --commitlint --mcp --yes --pm pnpm --shadcn-args --preset b3REw8vwo'
    );
  });

  it('renders --no-* for every unselected boolean flag', () => {
    const flags = buildFlags({
      unit: false,
      e2e: false,
      commitlint: false,
      mcp: false,
      yes: false,
      pm: 'npm',
      presetId: '',
    });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --no-unit --no-e2e --no-commitlint --no-mcp'
    );
  });

  it('appends a custom preset overriding the default', () => {
    const flags = buildFlags({ presetId: 'abc123' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset abc123'
    );
  });

  it('omits preset when presetId is empty', () => {
    const flags = buildFlags({ presetId: '' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes'
    );
  });

  it('emits --framework astro when astro is selected', () => {
    const flags = buildFlags({ framework: 'astro' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --framework astro --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
    );
  });

  it('drops bun for astro (astro does not support bun)', () => {
    const flags = buildFlags({ framework: 'astro', pm: 'bun' });

    const command = buildCliCommand(flags, enOutput.command);
    expect(command).not.toContain('--pm bun');
    expect(command).not.toContain('bun');
  });

  it('keeps pnpm for astro', () => {
    const flags = buildFlags({ framework: 'astro', pm: 'pnpm' });

    expect(buildCliCommand(flags, enOutput.command)).toContain('--pm pnpm');
  });

  it('emits --ssr only for astro and omits --adapter at the cloudflare default', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'cloudflare' });

    const command = buildCliCommand(flags, enOutput.command);
    expect(command).toContain('--framework astro --ssr');
    expect(command).not.toContain('--adapter');
  });

  it('emits --adapter when it differs from the cloudflare default', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'node' });

    expect(buildCliCommand(flags, enOutput.command)).toContain('--ssr --adapter node');
  });

  it('never emits --ssr or --adapter for next (astro-only flags)', () => {
    const flags = buildFlags({ framework: 'next', ssr: true, adapter: 'node' });

    const command = buildCliCommand(flags, enOutput.command);
    expect(command).not.toContain('--ssr');
    expect(command).not.toContain('--adapter');
  });

  it('emits --motion when enabled (opt-in, no --no-motion form)', () => {
    expect(buildCliCommand(buildFlags({ motion: true }), enOutput.command)).toContain(
      '--no-mcp --motion --yes'
    );
    expect(buildCliCommand(buildFlags({ motion: false }), enOutput.command)).not.toContain(
      '--motion'
    );
  });
});

describe('buildAgentPrompt', () => {
  it('describes default selections with include/exclude', () => {
    const prompt = buildAgentPrompt(defaultFlags, enOutput);

    expect(prompt).toContain('Scaffold a new Next.js app with purrfold');
    expect(prompt).toContain('Include unit tests (Vitest), non-interactive mode.');
    expect(prompt).toContain(
      'Do NOT include E2E tests (Playwright), commitlint + Husky, shadcn MCP.'
    );
    expect(prompt).not.toContain('Use npm');
    expect(prompt).toContain(enOutput.agentOutro);
  });

  it('names Astro in the intro and describes SSR when selected', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'node' });

    const prompt = buildAgentPrompt(flags, enOutput);

    expect(prompt).toContain('Scaffold a new Astro app with purrfold');
    expect(prompt).toContain('Enable Astro SSR instead of a static build.');
    expect(prompt).toContain('Use the node adapter for Astro SSR.');
  });

  it('describes the cloudflare adapter for Astro SSR while the CLI keeps the default adapter implicit', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'cloudflare' });

    const prompt = buildAgentPrompt(flags, enOutput);
    const command = buildCliCommand(flags, enOutput.command);

    expect(prompt).toContain('Use the cloudflare adapter for Astro SSR.');
    expect(command).not.toContain('--adapter');
  });

  it('does not describe SSR or adapter for next', () => {
    const prompt = buildAgentPrompt(buildFlags({ framework: 'next', ssr: true }), enOutput);

    expect(prompt).not.toContain('Astro SSR');
    expect(prompt).not.toContain('adapter');
  });

  it('lists every selected and excluded option with non-default choices', () => {
    const flags = buildFlags({
      unit: true,
      e2e: true,
      commitlint: true,
      mcp: true,
      yes: true,
      pm: 'pnpm',
      presetId: 'b3REw8vwo',
    });

    const prompt = buildAgentPrompt(flags, enOutput);

    expect(prompt).toContain(
      'Include unit tests (Vitest), E2E tests (Playwright), commitlint + Husky, shadcn MCP, non-interactive mode.'
    );
    expect(prompt).not.toContain('Do NOT include');
    expect(prompt).toContain('Use pnpm as the package manager.');
    expect(prompt).toContain('Use shadcn preset b3REw8vwo.');
  });

  it('only has the exclude sentence when no boolean options are selected', () => {
    const flags = buildFlags({
      unit: false,
      e2e: false,
      commitlint: false,
      mcp: false,
      yes: false,
      pm: 'bun',
      presetId: 'preset-1',
    });

    const prompt = buildAgentPrompt(flags, enOutput);

    expect(prompt).toContain('Scaffold a new Next.js app with purrfold');
    expect(prompt).not.toContain('Include');
    expect(prompt).toContain(
      'Do NOT include unit tests (Vitest), E2E tests (Playwright), commitlint + Husky, shadcn MCP.'
    );
    expect(prompt).toContain('Use bun as the package manager.');
    expect(prompt).toContain('Use shadcn preset preset-1.');
    expect(prompt).toContain(enOutput.agentOutro);
  });

  it('includes Motion in the agent prompt only when enabled', () => {
    expect(buildAgentPrompt(buildFlags({ motion: true }), enOutput)).toContain(
      'Motion for React (motion-framer skill)'
    );
    expect(buildAgentPrompt(buildFlags({ motion: false }), enOutput)).not.toContain(
      'Motion for React'
    );
  });
});
