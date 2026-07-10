'use client';

import { ExternalLinkIcon } from 'lucide-react';
import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
  useReducedMotion,
  type Transition,
} from 'motion/react';
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

import type { AstroAdapter, FlagState, Framework } from '@/lib/build-command';

export type BooleanFlagKey = 'unit' | 'e2e' | 'commitlint' | 'mcp' | 'motion' | 'yes';

export type ConfiguratorMessages = {
  title: string;
  hide: string;
  show: string;
  framework: string;
  unit: string;
  e2e: string;
  commitlint: string;
  mcp: string;
  motion: string;
  yes: string;
  ssr: string;
  adapter: string;
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

const booleanFlags: BooleanFlagKey[] = ['unit', 'e2e', 'commitlint', 'mcp', 'motion', 'yes'];
const adapters: AstroAdapter[] = ['node', 'vercel', 'netlify', 'cloudflare'];

// Astro scaffolding rejects bun, so the option is gated per framework.
function packageManagersFor(framework: Framework): FlagState['pm'][] {
  return framework === 'astro' ? ['npm', 'pnpm'] : ['npm', 'pnpm', 'bun'];
}

export function FlagConfigurator({
  flags,
  messages,
  onChange,
  disabledKeys,
}: FlagConfiguratorProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const shouldReduceMotion = useReducedMotion();

  const update = (partial: Partial<FlagState>) => {
    onChange({ ...flags, ...partial });
  };

  const isAstro = flags.framework === 'astro';
  const packageManagers = packageManagersFor(flags.framework);

  // Astro-only fields animate in/out with popLayout so the surrounding controls
  // reflow smoothly (ADR 0004 amendment: scoped layout animation). Movement is
  // transform + opacity, and collapses to an instant swap under reduced motion.
  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 },
    transition: (shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.2, ease: 'easeOut' }) satisfies Transition,
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

        <LazyMotion features={domMax}>
          <AnimatePresence initial={false} mode="popLayout">
            {isAstro ? (
              <m.div
                key="astro-options"
                layout={!shouldReduceMotion}
                className="grid items-start gap-4 sm:grid-cols-2"
                initial={reveal.initial}
                animate={reveal.animate}
                exit={reveal.exit}
                transition={reveal.transition}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`${baseId}-ssr`}
                    checked={flags.ssr}
                    onCheckedChange={(value) => update({ ssr: value === true })}
                  />
                  <Label htmlFor={`${baseId}-ssr`} className="font-normal text-muted-foreground">
                    {messages.ssr}
                  </Label>
                </div>

                <AnimatePresence initial={false} mode="popLayout">
                  {flags.ssr ? (
                    <m.div
                      key="astro-adapter"
                      layout={!shouldReduceMotion}
                      className="flex flex-col gap-2"
                      initial={reveal.initial}
                      animate={reveal.animate}
                      exit={reveal.exit}
                      transition={reveal.transition}
                    >
                      <Label htmlFor={`${baseId}-adapter`}>{messages.adapter}</Label>
                      <Select
                        value={flags.adapter}
                        onValueChange={(value) => update({ adapter: value as AstroAdapter })}
                      >
                        <SelectTrigger id={`${baseId}-adapter`} aria-label={messages.adapter}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {adapters.map((adapter) => (
                            <SelectItem key={adapter} value={adapter}>
                              {adapter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </m.div>
            ) : null}
          </AnimatePresence>

          <m.div
            layout={!shouldReduceMotion}
            transition={reveal.transition}
            className="grid gap-4 sm:grid-cols-2"
          >
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
          </m.div>
        </LazyMotion>
      </CollapsibleContent>
    </Collapsible>
  );
}
