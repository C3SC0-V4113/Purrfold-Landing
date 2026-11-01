export type Framework = 'next' | 'astro' | 'vite' | 'react-router';
export type AstroAdapter = 'node' | 'vercel' | 'netlify' | 'cloudflare';
export type ViteRouter = 'react-router-data' | 'react-router-declarative' | 'none';

// Order shown in every framework picker; Next.js stays first because it is the CLI default.
export const frameworks: Framework[] = ['next', 'astro', 'vite', 'react-router'];
export const viteRouters: ViteRouter[] = ['react-router-data', 'react-router-declarative', 'none'];

// Mirrors `npx purrfold info --json` -> frameworks[].rendering.defaultSsr.
export function defaultSsrFor(framework: Framework): boolean {
  return framework === 'react-router';
}

export function supportsSsr(framework: Framework): boolean {
  return framework === 'astro' || framework === 'react-router';
}

// Astro scaffolding rejects bun; every other framework accepts all three managers.
export function packageManagersFor(framework: Framework): FlagState['pm'][] {
  return framework === 'astro' ? ['npm', 'pnpm'] : ['npm', 'pnpm', 'bun'];
}

/** Applies a framework switch, resetting the options whose defaults depend on it. */
export function withFramework(flags: FlagState, framework: Framework): FlagState {
  return {
    ...flags,
    framework,
    ssr: defaultSsrFor(framework),
    pm: packageManagersFor(framework).includes(flags.pm) ? flags.pm : 'npm',
  };
}

export type FlagState = {
  framework: Framework;
  unit: boolean;
  e2e: boolean;
  commitlint: boolean;
  ci: boolean;
  mcp: boolean;
  motion: boolean;
  query: boolean;
  yes: boolean;
  ssr: boolean;
  adapter: AstroAdapter;
  router: ViteRouter;
  pm: 'npm' | 'pnpm' | 'bun';
  icons: 'lucide' | 'phosphor' | 'tabler';
  presetId: string;
};

export type AgentPromptMessages = {
  agentIntro: string;
  agentOptionsHeading: string;
  agentLineInclude: string;
  agentLineSkip: string;
  agentLineSkipOmit: string;
  agentLineValue: string;
  agentLineValueDefault: string;
  agentLabelUnit: string;
  agentLabelE2e: string;
  agentLabelCommitlint: string;
  agentLabelCi: string;
  agentLabelMcp: string;
  agentLabelMotion: string;
  agentLabelQuery: string;
  agentLabelYes: string;
  agentLabelFramework: string;
  agentLabelSsr: string;
  agentLabelAdapter: string;
  agentLabelRouter: string;
  agentLabelPm: string;
  agentLabelPreset: string;
  agentValueSsr: string;
  agentValueStatic: string;
  agentValuePrerender: string;
  routerLabels: Record<ViteRouter, string>;
  agentValuePresetNone: string;
  agentRulesHeading: string;
  agentRuleExact: string;
  agentRuleHusky: string;
  agentOutro: string;
};

export const defaultFlags: FlagState = {
  framework: 'next',
  unit: true,
  e2e: false,
  commitlint: false,
  ci: false,
  mcp: false,
  motion: false,
  query: false,
  yes: true,
  ssr: false,
  adapter: 'cloudflare',
  router: 'react-router-data',
  pm: 'npm',
  icons: 'lucide',
  presetId: 'b0',
};

// Brand names, not translatable copy — kept alongside the command builder.
export const frameworkLabels: Record<Framework, string> = {
  next: 'Next.js',
  astro: 'Astro',
  vite: 'Vite',
  'react-router': 'React Router',
};

// Astro's default SSR adapter; only surface --adapter when it diverges.
const defaultAdapter: AstroAdapter = 'cloudflare';
const defaultRouter: ViteRouter = 'react-router-data';

function resolvePackageManager(flags: FlagState): FlagState['pm'] {
  return packageManagersFor(flags.framework).includes(flags.pm) ? flags.pm : 'npm';
}

export function buildCliCommand(flags: FlagState, baseCommand: string): string {
  const parts = baseCommand.split(' ');

  // Framework selector first (Next.js is the default, so it stays implicit).
  if (flags.framework !== 'next') parts.push('--framework', flags.framework);

  // Rendering and routing flags only exist for some frameworks; elsewhere the CLI rejects them.
  if (flags.framework === 'astro' && flags.ssr) {
    parts.push('--ssr');
    if (flags.adapter !== defaultAdapter) parts.push('--adapter', flags.adapter);
  }
  if (flags.framework === 'react-router' && !flags.ssr) parts.push('--no-ssr');
  if (flags.framework === 'vite' && flags.router !== defaultRouter) {
    parts.push('--router', flags.router);
  }

  // Boolean flags: always explicit with --flag or --no-flag
  parts.push(flags.unit ? '--unit' : '--no-unit');
  parts.push(flags.e2e ? '--e2e' : '--no-e2e');
  parts.push(flags.commitlint ? '--commitlint' : '--no-commitlint');
  parts.push(flags.ci ? '--ci' : '--no-ci');
  parts.push(flags.mcp ? '--mcp' : '--no-mcp');
  // Motion is opt-in only (no --no-motion form).
  if (flags.motion) parts.push('--motion');
  if (flags.query) parts.push('--query');
  parts.push(flags.yes ? '--yes' : '');

  const pm = resolvePackageManager(flags);
  if (pm !== 'npm') parts.push('--pm', pm);
  if (flags.presetId) parts.push('--shadcn-args', '--preset', flags.presetId);

  return parts.filter(Boolean).join(' ');
}

/**
 * One rendered option of the agent prompt.
 *
 * Every option the CLI understands produces exactly one line, even when it is
 * left at its default — agents that have to infer an unstated option guess
 * wrong, so the prompt never stays silent about a choice.
 */
type PromptLine =
  | { kind: 'include' | 'skip' | 'skipOmit'; label: string; flag: string }
  | { kind: 'value'; label: string; value: string; flag: string }
  | { kind: 'valueDefault'; label: string; value: string };

// Single pass over the {token} placeholders so a value can never be reread as
// another template's token.
function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) => values[key] ?? token);
}

// Negatable flags: the CLI takes an explicit --flag or --no-flag either way.
function toggleLine(
  label: string,
  enabled: boolean,
  flag: string,
  negatedFlag: string
): PromptLine {
  return enabled ? { kind: 'include', label, flag } : { kind: 'skip', label, flag: negatedFlag };
}

// Opt-in flags have no negative form, so skipping means omitting the flag.
function optInLine(label: string, enabled: boolean, flag: string): PromptLine {
  return enabled ? { kind: 'include', label, flag } : { kind: 'skipOmit', label, flag };
}

function buildPromptLines(flags: FlagState, messages: AgentPromptMessages): PromptLine[] {
  const lines: PromptLine[] = [
    toggleLine(messages.agentLabelUnit, flags.unit, '--unit', '--no-unit'),
    toggleLine(messages.agentLabelE2e, flags.e2e, '--e2e', '--no-e2e'),
    toggleLine(messages.agentLabelCommitlint, flags.commitlint, '--commitlint', '--no-commitlint'),
    toggleLine(messages.agentLabelCi, flags.ci, '--ci', '--no-ci'),
    toggleLine(messages.agentLabelMcp, flags.mcp, '--mcp', '--no-mcp'),
    optInLine(messages.agentLabelMotion, flags.motion, '--motion'),
    optInLine(messages.agentLabelQuery, flags.query, '--query'),
    optInLine(messages.agentLabelYes, flags.yes, '--yes'),
    flags.framework === 'next'
      ? { kind: 'valueDefault', label: messages.agentLabelFramework, value: frameworkLabels.next }
      : {
          kind: 'value',
          label: messages.agentLabelFramework,
          value: frameworkLabels[flags.framework],
          flag: `--framework ${flags.framework}`,
        },
  ];

  // Astro: static by default, --ssr opts in (and unlocks --adapter).
  if (flags.framework === 'astro') {
    lines.push(
      flags.ssr
        ? {
            kind: 'value',
            label: messages.agentLabelSsr,
            value: messages.agentValueSsr,
            flag: '--ssr',
          }
        : { kind: 'valueDefault', label: messages.agentLabelSsr, value: messages.agentValueStatic }
    );
  }

  // React Router framework mode: SSR by default, --no-ssr prerenders instead.
  if (flags.framework === 'react-router') {
    lines.push(
      flags.ssr
        ? { kind: 'valueDefault', label: messages.agentLabelSsr, value: messages.agentValueSsr }
        : {
            kind: 'value',
            label: messages.agentLabelSsr,
            value: messages.agentValuePrerender,
            flag: '--no-ssr',
          }
    );
  }

  // Vite: React Router data mode by default; --router picks another mode.
  if (flags.framework === 'vite') {
    const value = messages.routerLabels[flags.router];
    lines.push(
      flags.router === defaultRouter
        ? { kind: 'valueDefault', label: messages.agentLabelRouter, value }
        : {
            kind: 'value',
            label: messages.agentLabelRouter,
            value,
            flag: `--router ${flags.router}`,
          }
    );
  }

  if (flags.framework === 'astro') {
    if (flags.ssr) {
      lines.push(
        flags.adapter === defaultAdapter
          ? { kind: 'valueDefault', label: messages.agentLabelAdapter, value: flags.adapter }
          : {
              kind: 'value',
              label: messages.agentLabelAdapter,
              value: flags.adapter,
              flag: `--adapter ${flags.adapter}`,
            }
      );
    }
  }

  const pm = resolvePackageManager(flags);
  lines.push(
    pm === 'npm'
      ? { kind: 'valueDefault', label: messages.agentLabelPm, value: pm }
      : { kind: 'value', label: messages.agentLabelPm, value: pm, flag: `--pm ${pm}` }
  );

  lines.push(
    flags.presetId
      ? {
          kind: 'value',
          label: messages.agentLabelPreset,
          value: flags.presetId,
          flag: `--shadcn-args --preset ${flags.presetId}`,
        }
      : {
          kind: 'valueDefault',
          label: messages.agentLabelPreset,
          value: messages.agentValuePresetNone,
        }
  );

  return lines;
}

function renderPromptLine(line: PromptLine, messages: AgentPromptMessages): string {
  switch (line.kind) {
    case 'include':
      return fill(messages.agentLineInclude, { label: line.label, flag: line.flag });
    case 'skip':
      return fill(messages.agentLineSkip, { label: line.label, flag: line.flag });
    case 'skipOmit':
      return fill(messages.agentLineSkipOmit, { label: line.label, flag: line.flag });
    case 'value':
      return fill(messages.agentLineValue, {
        label: line.label,
        value: line.value,
        flag: line.flag,
      });
    case 'valueDefault':
      return fill(messages.agentLineValueDefault, { label: line.label, value: line.value });
  }
}

export function buildAgentPrompt(flags: FlagState, messages: AgentPromptMessages): string {
  const options = buildPromptLines(flags, messages).map((line) => renderPromptLine(line, messages));

  // One option per line, each naming its literal CLI flag: comma-joined lists
  // read as ambiguous groupings and have already misled agents.
  return [
    fill(messages.agentIntro, { framework: frameworkLabels[flags.framework] }),
    [messages.agentOptionsHeading, ...options].join('\n'),
    [messages.agentRulesHeading, messages.agentRuleExact, messages.agentRuleHusky].join('\n'),
    messages.agentOutro,
  ].join('\n\n');
}
