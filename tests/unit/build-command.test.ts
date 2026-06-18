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
    'Scaffold a new Next.js app with purrfold (https://www.npmjs.com/package/purrfold). Read the README or run `npx purrfold@latest info --json` to discover available options.',
  agentInclude: 'Include {options}.',
  agentExclude: 'Do NOT include {options}.',
  agentOptionUnit: 'unit tests (Vitest)',
  agentOptionE2e: 'E2E tests (Playwright)',
  agentOptionCommitlint: 'commitlint + Husky',
  agentOptionMcp: 'shadcn MCP',
  agentOptionYes: 'non-interactive mode',
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
});

describe('buildAgentPrompt', () => {
  it('describes default selections with include/exclude', () => {
    const prompt = buildAgentPrompt(defaultFlags, enOutput);

    expect(prompt).toContain(enOutput.agentIntro);
    expect(prompt).toContain('Include unit tests (Vitest), non-interactive mode.');
    expect(prompt).toContain(
      'Do NOT include E2E tests (Playwright), commitlint + Husky, shadcn MCP.'
    );
    expect(prompt).not.toContain('Use npm');
    expect(prompt).toContain(enOutput.agentOutro);
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

    expect(prompt).toContain(enOutput.agentIntro);
    expect(prompt).not.toContain('Include');
    expect(prompt).toContain(
      'Do NOT include unit tests (Vitest), E2E tests (Playwright), commitlint + Husky, shadcn MCP.'
    );
    expect(prompt).toContain('Use bun as the package manager.');
    expect(prompt).toContain('Use shadcn preset preset-1.');
    expect(prompt).toContain(enOutput.agentOutro);
  });
});
