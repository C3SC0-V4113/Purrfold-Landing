export type Framework = 'next' | 'astro';
export type AstroAdapter = 'node' | 'vercel' | 'netlify' | 'cloudflare';

export type FlagState = {
  framework: Framework;
  unit: boolean;
  e2e: boolean;
  commitlint: boolean;
  ci: boolean;
  mcp: boolean;
  motion: boolean;
  yes: boolean;
  ssr: boolean;
  adapter: AstroAdapter;
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
  agentLabelYes: string;
  agentLabelFramework: string;
  agentLabelSsr: string;
  agentLabelAdapter: string;
  agentLabelPm: string;
  agentLabelPreset: string;
  agentValueSsr: string;
  agentValueStatic: string;
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
  yes: true,
  ssr: false,
  adapter: 'cloudflare',
  pm: 'npm',
  icons: 'lucide',
  presetId: 'b0',
};

// Brand names, not translatable copy — kept alongside the command builder.
export const frameworkLabels: Record<Framework, string> = {
  next: 'Next.js',
  astro: 'Astro',
};

// Astro's default SSR adapter; only surface --adapter when it diverges.
const defaultAdapter: AstroAdapter = 'cloudflare';

// Astro scaffolding rejects bun, so fall back to npm for the astro path.
function resolvePackageManager(flags: FlagState): FlagState['pm'] {
  return flags.framework === 'astro' && flags.pm === 'bun' ? 'npm' : flags.pm;
}

export function buildCliCommand(flags: FlagState, baseCommand: string): string {
  const parts = baseCommand.split(' ');

  // Framework selector first (Next.js is the default, so it stays implicit).
  if (flags.framework === 'astro') {
    parts.push('--framework', 'astro');

    // --ssr and --adapter are Astro-only; they error on Next.
    if (flags.ssr) {
      parts.push('--ssr');
      if (flags.adapter !== defaultAdapter) parts.push('--adapter', flags.adapter);
    }
  }

  // Boolean flags: always explicit with --flag or --no-flag
  parts.push(flags.unit ? '--unit' : '--no-unit');
  parts.push(flags.e2e ? '--e2e' : '--no-e2e');
  parts.push(flags.commitlint ? '--commitlint' : '--no-commitlint');
  parts.push(flags.ci ? '--ci' : '--no-ci');
  parts.push(flags.mcp ? '--mcp' : '--no-mcp');
  // Motion is opt-in only (no --no-motion form).
  if (flags.motion) parts.push('--motion');
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
    optInLine(messages.agentLabelYes, flags.yes, '--yes'),
    flags.framework === 'astro'
      ? {
          kind: 'value',
          label: messages.agentLabelFramework,
          value: frameworkLabels.astro,
          flag: '--framework astro',
        }
      : { kind: 'valueDefault', label: messages.agentLabelFramework, value: frameworkLabels.next },
  ];

  // SSR and the adapter are Astro-only; they error on Next.
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
