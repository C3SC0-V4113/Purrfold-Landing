'use client';

import { CodeBlock } from '@/components/common/code-block';

type GeneratedOutputProps = {
  label: string;
  output: string;
};

export function GeneratedOutput({ label, output }: GeneratedOutputProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div key={output} className="animate-tab-enter">
        <CodeBlock text={output} />
      </div>
    </div>
  );
}
