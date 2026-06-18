export type FlagState = {
  unit: boolean;
  e2e: boolean;
  commitlint: boolean;
  mcp: boolean;
  yes: boolean;
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
  agentOptionYes: string;
  agentPm: string;
  agentPreset: string;
  agentOutro: string;
};

export const defaultFlags: FlagState = {
  unit: true,
  e2e: false,
  commitlint: false,
  mcp: false,
  yes: true,
  pm: 'npm',
  icons: 'lucide',
  presetId: 'b0',
};

export function buildCliCommand(flags: FlagState, baseCommand: string): string {
  const parts = baseCommand.split(' ');

  // Boolean flags: always explicit with --flag or --no-flag
  parts.push(flags.unit ? '--unit' : '--no-unit');
  parts.push(flags.e2e ? '--e2e' : '--no-e2e');
  parts.push(flags.commitlint ? '--commitlint' : '--no-commitlint');
  parts.push(flags.mcp ? '--mcp' : '--no-mcp');
  parts.push(flags.yes ? '--yes' : '');

  if (flags.pm !== 'npm') parts.push('--pm', flags.pm);
  if (flags.presetId) parts.push('--shadcn-args', '--preset', flags.presetId);

  return parts.filter(Boolean).join(' ');
}

export function buildAgentPrompt(flags: FlagState, messages: AgentPromptMessages): string {
  const parts: string[] = [];

  parts.push(messages.agentIntro);

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

  if (flags.yes) included.push(messages.agentOptionYes);

  if (included.length > 0) {
    parts.push(messages.agentInclude.replace('{options}', included.join(', ')));
  }

  if (excluded.length > 0) {
    parts.push(messages.agentExclude.replace('{options}', excluded.join(', ')));
  }

  if (flags.pm !== 'npm') {
    parts.push(messages.agentPm.replace('{pm}', flags.pm));
  }

  if (flags.presetId) {
    parts.push(messages.agentPreset.replace('{presetId}', flags.presetId));
  }

  parts.push(messages.agentOutro);

  return parts.join(' ');
}
