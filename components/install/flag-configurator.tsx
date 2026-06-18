'use client';

import { ExternalLinkIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import type { FlagState } from '@/lib/build-command';

export type BooleanFlagKey = 'unit' | 'e2e' | 'commitlint' | 'mcp' | 'yes';

export type ConfiguratorMessages = {
  title: string;
  hide: string;
  show: string;
  unit: string;
  e2e: string;
  commitlint: string;
  mcp: string;
  yes: string;
  pm: string;
  presetId: string;
  presetPlaceholder: string;
};

type FlagConfiguratorProps = {
  flags: FlagState;
  messages: ConfiguratorMessages;
  onChange: (flags: FlagState) => void;
  disabledKeys?: Set<BooleanFlagKey>;
};

const booleanFlags: BooleanFlagKey[] = ['unit', 'e2e', 'commitlint', 'mcp', 'yes'];
const packageManagers: FlagState['pm'][] = ['npm', 'pnpm', 'bun'];

export function FlagConfigurator({
  flags,
  messages,
  onChange,
  disabledKeys,
}: FlagConfiguratorProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();

  const update = (partial: Partial<FlagState>) => {
    onChange({ ...flags, ...partial });
  };

  return (
    <Collapsible className="flex flex-col gap-4" open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-medium">{messages.title}</h2>
        <CollapsibleTrigger
          className={cn(
            'inline-flex h-8 items-center justify-center rounded-2xl border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30'
          )}
        >
          {open ? messages.hide : messages.show}
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-6 data-[state=closed]:hidden">
        <div className="grid gap-4 sm:grid-cols-2">
          {booleanFlags.map((key) => {
            const id = `${baseId}-${key}`;
            const checked = flags[key];

            return (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={checked}
                  disabled={disabledKeys?.has(key)}
                  onCheckedChange={(value) => update({ [key]: value === true })}
                />
                <Label htmlFor={id} className="font-normal text-muted-foreground">
                  {messages[key]}
                </Label>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`${baseId}-pm`}>{messages.pm}</Label>
            <Select
              value={flags.pm}
              onValueChange={(value) => update({ pm: value as FlagState['pm'] })}
            >
              <SelectTrigger id={`${baseId}-pm`} aria-label={messages.pm}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {packageManagers.map((pm) => (
                  <SelectItem key={pm} value={pm}>
                    {pm}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`${baseId}-preset`}>{messages.presetId}</Label>
            <div className="flex items-center gap-2">
              <Input
                id={`${baseId}-preset`}
                placeholder={messages.presetPlaceholder}
                value={flags.presetId}
                onChange={(event) => update({ presetId: event.target.value })}
              />
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
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
