'use client';

import { CodeBlock } from '@/components/common/code-block';
import { ShineBorder } from '@/components/ui/shine-border';

type GeneratedOutputProps = {
  label: string;
  output: string;
};

export function GeneratedOutput({ label, output }: GeneratedOutputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div key={output} className="relative animate-tab-enter rounded-2xl">
        <ShineBorder
          borderWidth={1}
          duration={24}
          shineColor={['var(--color-shine-border-from)', 'var(--color-shine-border-to)']}
        />
        <CodeBlock text={output} />
      </div>
    </div>
  );
}
