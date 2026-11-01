'use client';

import { useState } from 'react';

import { CodeBlock } from '@/components/common/code-block';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { frameworkLabels, frameworks, type Framework } from '@/lib/build-command';

export type QuickInstallMessages = {
  title: string;
  cli: string;
  agent: string;
  framework: string;
  cliCommand: string;
  agentPrompt: string;
};

type QuickInstallProps = {
  messages: QuickInstallMessages;
};

export function QuickInstall({ messages }: QuickInstallProps) {
  const [framework, setFramework] = useState<Framework>('next');

  // Next.js is the CLI default, so only the other frameworks add an explicit flag.
  const frameworkFlag = framework === 'next' ? '' : ` --framework ${framework}`;
  const cliCommand = `${messages.cliCommand}${frameworkFlag}`;
  const agentPrompt = messages.agentPrompt
    .replace(/\{framework\}/g, frameworkLabels[framework])
    .replace('{frameworkFlag}', frameworkFlag);

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="sr-only">{messages.title}</h2>
      <Tabs defaultValue="cli">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="cli">{messages.cli}</TabsTrigger>
            <TabsTrigger value="agent">{messages.agent}</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{messages.framework}</span>
            <Select value={framework} onValueChange={(value) => setFramework(value as Framework)}>
              <SelectTrigger className="h-8 w-40" aria-label={messages.framework}>
                <SelectValue>{frameworkLabels[framework]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {frameworks.map((value) => (
                  <SelectItem key={value} value={value}>
                    {frameworkLabels[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="cli" className="max-w-full">
          <div className="animate-tab-enter">
            <CodeBlock text={cliCommand} />
          </div>
        </TabsContent>
        <TabsContent value="agent" className="max-w-full">
          <div className="animate-tab-enter">
            <CodeBlock text={agentPrompt} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
