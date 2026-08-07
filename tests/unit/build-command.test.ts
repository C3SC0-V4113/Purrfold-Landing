import { describe, expect, it } from 'vitest';

import {
  buildAgentPrompt,
  buildCliCommand,
  defaultFlags,
  type FlagState,
} from '@/lib/build-command';

import { enInstallMessages } from './fixtures/install-messages';

function buildFlags(overrides: Partial<FlagState> = {}): FlagState {
  return { ...defaultFlags, ...overrides };
}

const enOutput = enInstallMessages.output;

describe('buildCliCommand', () => {
  it('renders the base command with default flags (explicit --no-* for off flags)', () => {
    expect(buildCliCommand(defaultFlags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-ci --no-mcp --yes --shadcn-args --preset b0'
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
      ci: true,
      mcp: true,
      yes: true,
      pm: 'pnpm',
      presetId: 'b3REw8vwo',
    });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --e2e --commitlint --ci --mcp --yes --pm pnpm --shadcn-args --preset b3REw8vwo'
    );
  });

  it('renders --no-* for every unselected boolean flag', () => {
    const flags = buildFlags({
      unit: false,
      e2e: false,
      commitlint: false,
      ci: false,
      mcp: false,
      yes: false,
      pm: 'npm',
      presetId: '',
    });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --no-unit --no-e2e --no-commitlint --no-ci --no-mcp'
    );
  });

  it('appends a custom preset overriding the default', () => {
    const flags = buildFlags({ presetId: 'abc123' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-ci --no-mcp --yes --shadcn-args --preset abc123'
    );
  });

  it('omits preset when presetId is empty', () => {
    const flags = buildFlags({ presetId: '' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-ci --no-mcp --yes'
    );
  });

  it('emits --ci when GitHub Actions workflows are selected', () => {
    expect(buildCliCommand(buildFlags({ ci: true }), enOutput.command)).toContain(
      '--no-commitlint --ci --no-mcp'
    );
  });

  it('emits --framework astro when astro is selected', () => {
    const flags = buildFlags({ framework: 'astro' });

    expect(buildCliCommand(flags, enOutput.command)).toBe(
      'npx purrfold@latest <project-directory> --framework astro --unit --no-e2e --no-commitlint --no-ci --no-mcp --yes --shadcn-args --preset b0'
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
  it('renders default flags as a per-option checklist naming every literal flag', () => {
    expect(buildAgentPrompt(defaultFlags, enOutput)).toBe(
      [
        'Scaffold a new Next.js app with purrfold (https://www.npmjs.com/package/purrfold). Read the README or run `npx purrfold@latest info --json` to discover available options.',
        '',
        'Use exactly these options:',
        '- Unit tests (Vitest): include — pass --unit',
        '- E2E tests (Playwright): skip — pass --no-e2e',
        '- Commit convention (commitlint): skip — pass --no-commitlint',
        '- GitHub Actions workflows: skip — pass --no-ci',
        '- shadcn MCP: skip — pass --no-mcp',
        '- Motion for React (motion-framer skill): skip — do not pass --motion',
        '- Non-interactive mode: include — pass --yes',
        '- Framework: Next.js — default, no flag needed',
        '- Package manager: npm — default, no flag needed',
        '- shadcn preset: b0 — pass --shadcn-args --preset b0',
        '',
        'Rules:',
        enOutput.agentRuleExact,
        enOutput.agentRuleHusky,
        '',
        enOutput.agentOutro,
      ].join('\n')
    );
  });

  it('never omits an option, so an agent never has to infer one', () => {
    const everythingOff = buildFlags({
      unit: false,
      e2e: false,
      commitlint: false,
      ci: false,
      mcp: false,
      motion: false,
      yes: false,
      presetId: '',
    });

    const prompt = buildAgentPrompt(everythingOff, enOutput);

    for (const label of [
      enOutput.agentLabelUnit,
      enOutput.agentLabelE2e,
      enOutput.agentLabelCommitlint,
      enOutput.agentLabelCi,
      enOutput.agentLabelMcp,
      enOutput.agentLabelMotion,
      enOutput.agentLabelYes,
      enOutput.agentLabelFramework,
      enOutput.agentLabelPm,
      enOutput.agentLabelPreset,
    ]) {
      expect(prompt).toContain(`- ${label}:`);
    }
  });

  it('states one option per line instead of comma-joined lists', () => {
    const labels = [
      enOutput.agentLabelUnit,
      enOutput.agentLabelE2e,
      enOutput.agentLabelCommitlint,
      enOutput.agentLabelCi,
      enOutput.agentLabelMcp,
      enOutput.agentLabelMotion,
      enOutput.agentLabelYes,
    ];
    const flags = buildFlags({ unit: true, e2e: true, commitlint: true, ci: true, mcp: true });

    const [, optionsBlock] = buildAgentPrompt(flags, enOutput).split('\n\n');
    const optionLines = optionsBlock.split('\n').slice(1);

    expect(optionLines.length).toBeGreaterThan(1);
    for (const line of optionLines) {
      expect(line).toMatch(/^- /);
      // Grouping options onto one line was the ambiguity; never more than one.
      expect(labels.filter((label) => line.includes(label)).length).toBeLessThanOrEqual(1);
    }
  });

  it('always states that Husky is not optional, whatever commitlint is set to', () => {
    expect(buildAgentPrompt(buildFlags({ commitlint: false }), enOutput)).toContain(
      enOutput.agentRuleHusky
    );
    expect(buildAgentPrompt(buildFlags({ commitlint: true }), enOutput)).toContain(
      enOutput.agentRuleHusky
    );
  });

  it('marks options as skipped with their negative flag, or as omitted when none exists', () => {
    const prompt = buildAgentPrompt(
      buildFlags({ e2e: false, ci: false, motion: false, yes: false }),
      enOutput
    );

    expect(prompt).toContain('- E2E tests (Playwright): skip — pass --no-e2e');
    expect(prompt).toContain('- GitHub Actions workflows: skip — pass --no-ci');
    expect(prompt).toContain(
      '- Motion for React (motion-framer skill): skip — do not pass --motion'
    );
    expect(prompt).toContain('- Non-interactive mode: skip — do not pass --yes');
  });

  it('names Astro in the intro and describes SSR when selected', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'node' });

    const prompt = buildAgentPrompt(flags, enOutput);

    expect(prompt).toContain('Scaffold a new Astro app with purrfold');
    expect(prompt).toContain('- Framework: Astro — pass --framework astro');
    expect(prompt).toContain('- Astro rendering: SSR (server rendering) — pass --ssr');
    expect(prompt).toContain('- Astro SSR adapter: node — pass --adapter node');
  });

  it('describes the cloudflare adapter for Astro SSR while the CLI keeps the default adapter implicit', () => {
    const flags = buildFlags({ framework: 'astro', ssr: true, adapter: 'cloudflare' });

    const prompt = buildAgentPrompt(flags, enOutput);
    const command = buildCliCommand(flags, enOutput.command);

    expect(prompt).toContain('- Astro SSR adapter: cloudflare — default, no flag needed');
    expect(command).not.toContain('--adapter');
  });

  it('names the static build for astro without SSR and omits the adapter line', () => {
    const prompt = buildAgentPrompt(buildFlags({ framework: 'astro', ssr: false }), enOutput);

    expect(prompt).toContain('- Astro rendering: static build — default, no flag needed');
    expect(prompt).not.toContain(enOutput.agentLabelAdapter);
  });

  it('does not describe SSR or adapter for next', () => {
    const prompt = buildAgentPrompt(buildFlags({ framework: 'next', ssr: true }), enOutput);

    expect(prompt).not.toContain('Astro');
    expect(prompt).not.toContain('adapter');
  });

  it('states non-default package manager and preset choices with their flags', () => {
    const flags = buildFlags({ pm: 'pnpm', presetId: 'b3REw8vwo' });

    const prompt = buildAgentPrompt(flags, enOutput);

    expect(prompt).toContain('- Package manager: pnpm — pass --pm pnpm');
    expect(prompt).toContain('- shadcn preset: b3REw8vwo — pass --shadcn-args --preset b3REw8vwo');
  });

  it('states that no preset is used when presetId is empty', () => {
    const prompt = buildAgentPrompt(buildFlags({ presetId: '' }), enOutput);

    expect(prompt).toContain('- shadcn preset: none — default, no flag needed');
  });

  it('falls back to npm in the prompt when bun is selected for astro', () => {
    const prompt = buildAgentPrompt(buildFlags({ framework: 'astro', pm: 'bun' }), enOutput);

    expect(prompt).toContain('- Package manager: npm — default, no flag needed');
    expect(prompt).not.toContain('bun');
  });

  it('marks Motion as included only when enabled', () => {
    expect(buildAgentPrompt(buildFlags({ motion: true }), enOutput)).toContain(
      '- Motion for React (motion-framer skill): include — pass --motion'
    );
    expect(buildAgentPrompt(buildFlags({ motion: false }), enOutput)).toContain(
      '- Motion for React (motion-framer skill): skip — do not pass --motion'
    );
  });
});
