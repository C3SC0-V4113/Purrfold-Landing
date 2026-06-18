'use client';

import { useState } from 'react';

import {
  FlagConfigurator,
  type BooleanFlagKey,
  type ConfiguratorMessages,
} from '@/components/flag-configurator';
import { GeneratedOutput } from '@/components/generated-output';
import { PresetExample, type PresetMessages } from '@/components/preset-example';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  buildAgentPrompt,
  buildCliCommand,
  defaultFlags,
  type AgentPromptMessages,
  type FlagState,
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

  const output =
    activeTab === 'cli'
      ? buildCliCommand(resolvedFlags, messages.output.command)
      : buildAgentPrompt(resolvedFlags, messages.output);
  const outputLabel = activeTab === 'cli' ? messages.output.cliLabel : messages.output.agentLabel;

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)}>
        <TabsList>
          <TabsTrigger value="cli">{messages.tabs.cli}</TabsTrigger>
          <TabsTrigger value="agent">{messages.tabs.agent}</TabsTrigger>
        </TabsList>
      </Tabs>

      <FlagConfigurator
        flags={resolvedFlags}
        onChange={setFlags}
        messages={messages.configurator}
        disabledKeys={disabledKeys}
      />

      <GeneratedOutput label={outputLabel} output={output} />

      <PresetExample
        messages={messages.preset}
        presetId={flags.presetId}
        onPresetChange={(id) => setFlags((prev) => ({ ...prev, presetId: id }))}
      />

      {children}
    </div>
  );
}
