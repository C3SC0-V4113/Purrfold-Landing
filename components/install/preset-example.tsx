'use client';

import { ExternalLinkIcon } from 'lucide-react';

import { CodeBlock } from '@/components/common/code-block';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        <CodeBlock text={command} />
      </CardContent>
    </Card>
  );
}
