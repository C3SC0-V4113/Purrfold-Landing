export type Framework = 'next' | 'astro';
export type AstroAdapter = 'node' | 'vercel' | 'netlify' | 'cloudflare';

export type FlagState = {
  framework: Framework;
  unit: boolean;
  e2e: boolean;
  commitlint: boolean;
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
  agentInclude: string;
  agentExclude: string;
  agentOptionUnit: string;
  agentOptionE2e: string;
  agentOptionCommitlint: string;
  agentOptionMcp: string;
  agentOptionMotion: string;
  agentOptionYes: string;
  agentSsr: string;
  agentAdapter: string;
  agentPm: string;
  agentPreset: string;
  agentOutro: string;
};

export const defaultFlags: FlagState = {
  framework: 'next',
  unit: true,
  e2e: false,
  commitlint: false,
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
  if (flags.framework === 'astro' && flags.pm === 'bun') return 'npm';
  return flags.pm;
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
  parts.push(flags.mcp ? '--mcp' : '--no-mcp');
  // Motion is opt-in only (no --no-motion form).
  if (flags.motion) parts.push('--motion');
  parts.push(flags.yes ? '--yes' : '');

  const pm = resolvePackageManager(flags);
  if (pm !== 'npm') parts.push('--pm', pm);
  if (flags.presetId) parts.push('--shadcn-args', '--preset', flags.presetId);

  return parts.filter(Boolean).join(' ');
}

export function buildAgentPrompt(flags: FlagState, messages: AgentPromptMessages): string {
  const parts: string[] = [];

  parts.push(messages.agentIntro.replace('{framework}', frameworkLabels[flags.framework]));

  const included: string[] = [];
  const excluded: string[] = [];

  if (flags.unit) included.push(messages.agentOptionUnit);
  else excluded.push(messages.agentOptionUnit);

  if (flags.e2e) included.push(messages.agentOptionE2e);
  else excluded.push(messages.agentOptionE2e);

  if (flags.commitlint) included.push(messages.agentOptionCommitlint);
  else excluded.push(messages.agentOptionCommitlint);

  if (flags.mcp) included.push(messages.agentOptionMcp);
  else excluded.push(messages.agentOptionMcp);

  if (flags.motion) included.push(messages.agentOptionMotion);
  if (flags.yes) included.push(messages.agentOptionYes);

  if (included.length > 0) {
    parts.push(messages.agentInclude.replace('{options}', included.join(', ')));
  }

  if (excluded.length > 0) {
    parts.push(messages.agentExclude.replace('{options}', excluded.join(', ')));
  }

  // Astro-only SSR guidance.
  if (flags.framework === 'astro' && flags.ssr) {
    parts.push(messages.agentSsr);
    if (flags.adapter !== defaultAdapter) {
      parts.push(messages.agentAdapter.replace('{adapter}', flags.adapter));
    }
  }

  const pm = resolvePackageManager(flags);
  if (pm !== 'npm') {
    parts.push(messages.agentPm.replace('{pm}', pm));
  }

  if (flags.presetId) {
    parts.push(messages.agentPreset.replace('{presetId}', flags.presetId));
  }

  parts.push(messages.agentOutro);

  return parts.join(' ');
}
