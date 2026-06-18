'use client';

import { ExternalLinkIcon } from 'lucide-react';

import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { buildCliCommand, type FlagState } from '@/lib/build-command';

export type PresetMessages = {
  title: string;
  description: string;
  command: string;
  presetLabel?: string;
};

type PresetExampleProps = {
  messages: PresetMessages;
  presetId: string;
  onPresetChange: (id: string) => void;
};

export function PresetExample({ messages, presetId, onPresetChange }: PresetExampleProps) {
  const flags: FlagState = {
    unit: true,
    e2e: true,
    commitlint: true,
    mcp: false,
    yes: true,
    pm: 'npm',
    icons: 'lucide',
    presetId,
  };
  const command = buildCliCommand(flags, 'npx purrfold@latest my-app');

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{messages.title}</CardTitle>
        <CardDescription>{messages.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="preset-example-input">
              {messages.presetLabel ?? 'shadcn preset ID'}
            </Label>
            <Input
              id="preset-example-input"
              placeholder="e.g. b0"
              value={presetId}
              onChange={(event) => onPresetChange(event.target.value)}
            />
          </div>
          <a
            href="https://ui.shadcn.com/create"
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0"
            aria-label="Find shadcn presets"
          >
            <Button variant="outline" size="icon">
              <ExternalLinkIcon />
            </Button>
          </a>
        </div>
        <div className="relative">
          <ScrollArea className="max-h-[200px] rounded-2xl bg-muted">
            <pre className="p-4 pr-12 font-mono text-sm whitespace-pre-wrap">
              <code className="break-all">{command}</code>
            </pre>
          </ScrollArea>
          <div className="absolute top-2 right-3 z-10">
            <CopyButton text={command} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
