'use client';

import { CopyButton } from '@/components/common/copy-button';
import { Terminal } from '@/components/ui/terminal';
import { cn } from '@/lib/utils';

type CommandTerminalProps = {
  text: string;
  maxHeight?: string;
  className?: string;
};

export function CommandTerminal({ text, maxHeight = '200px', className }: CommandTerminalProps) {
  return (
    <div className={cn('relative text-foreground', className)}>
      <Terminal
        sequence={false}
        className="max-w-full overflow-hidden border-border/80 bg-muted/55 shadow-sm"
      >
        <span
          className="block overflow-x-auto pr-10 font-mono text-sm whitespace-pre-wrap"
          style={{ maxHeight }}
        >
          {text}
        </span>
      </Terminal>
      <div className="absolute top-2 right-3 z-10">
        <CopyButton text={text} />
      </div>
    </div>
  );
}
