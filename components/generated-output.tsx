'use client';

import { CopyButton } from '@/components/copy-button';
import { ScrollArea } from '@/components/ui/scroll-area';

type GeneratedOutputProps = {
  label: string;
  output: string;
};

export function GeneratedOutput({ label, output }: GeneratedOutputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div key={output} className="animate-tab-enter">
        <div className="relative">
          <ScrollArea className="max-h-[200px] rounded-2xl bg-muted">
            <pre className="p-4 pr-12 font-mono text-sm whitespace-pre-wrap">
              <code className="break-all">{output}</code>
            </pre>
          </ScrollArea>
          <div className="absolute top-2 right-3 z-10">
            <CopyButton text={output} />
          </div>
        </div>
      </div>
    </div>
  );
}
