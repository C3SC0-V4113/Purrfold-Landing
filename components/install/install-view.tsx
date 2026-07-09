'use client';

import { useState } from 'react';

import {
  FlagConfigurator,
  type BooleanFlagKey,
  type ConfiguratorMessages,
} from '@/components/install/flag-configurator';
import { GeneratedOutput } from '@/components/install/generated-output';
import { PresetExample, type PresetMessages } from '@/components/install/preset-example';
import { SectionReveal } from '@/components/motion/section-reveal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  buildAgentPrompt,
  buildCliCommand,
  defaultFlags,
  frameworkLabels,
  type AgentPromptMessages,
  type FlagState,
  type Framework,
} from '@/lib/build-command';

import type { Locale } from '@/i18n/routing';
import type { ReactNode } from 'react';

type TabsMessages = {
  cli: string;
  agent: string;
};

type OutputMessages = AgentPromptMessages & {
  cliLabel: string;
  agentLabel: string;
  command: string;
};

export type InstallPageMessages = {
  tabs: TabsMessages;
  configurator: ConfiguratorMessages;
  output: OutputMessages;
  preset: PresetMessages;
};

type InstallViewProps = {
  locale: Locale;
  messages: InstallPageMessages;
  children?: ReactNode;
};

type ActiveTab = 'cli' | 'agent';

export function InstallView({ messages, children }: InstallViewProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cli');
  const [flags, setFlags] = useState<FlagState>(defaultFlags);

  // Force --yes in agent mode (non-interactive prompts are always --yes)
  const resolvedFlags: FlagState = activeTab === 'agent' ? { ...flags, yes: true } : flags;

  const disabledKeys: Set<BooleanFlagKey> = activeTab === 'agent' ? new Set(['yes']) : new Set();

  // Framework is the primary decision, so it lives above the flag configurator.
  const handleFrameworkChange = (framework: Framework) => {
    setFlags((prev) => ({
      ...prev,
      framework,
      // Astro scaffolding rejects bun; fall back to npm when switching to it.
      pm: framework === 'astro' && prev.pm === 'bun' ? 'npm' : prev.pm,
    }));
  };

  const output =
    activeTab === 'cli'
      ? buildCliCommand(resolvedFlags, messages.output.command)
      : buildAgentPrompt(resolvedFlags, messages.output);
  const outputLabel = activeTab === 'cli' ? messages.output.cliLabel : messages.output.agentLabel;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)}>
          <TabsList>
            <TabsTrigger value="cli">{messages.tabs.cli}</TabsTrigger>
            <TabsTrigger value="agent">{messages.tabs.agent}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{messages.configurator.framework}</span>
          <Select
            value={flags.framework}
            onValueChange={(value) => handleFrameworkChange(value as Framework)}
          >
            <SelectTrigger className="w-36" aria-label={messages.configurator.framework}>
              <SelectValue>{frameworkLabels[flags.framework]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {(['next', 'astro'] as Framework[]).map((framework) => (
                <SelectItem key={framework} value={framework}>
                  {frameworkLabels[framework]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <SectionReveal>
        <FlagConfigurator
          flags={resolvedFlags}
          onChange={setFlags}
          messages={messages.configurator}
          disabledKeys={disabledKeys}
        />
      </SectionReveal>

      <SectionReveal delay={0.04}>
        <GeneratedOutput label={outputLabel} output={output} />
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <PresetExample
          messages={messages.preset}
          presetId={flags.presetId}
          onPresetChange={(id) => setFlags((prev) => ({ ...prev, presetId: id }))}
        />
      </SectionReveal>

      {children ? <SectionReveal delay={0.12}>{children}</SectionReveal> : null}
    </div>
  );
}
