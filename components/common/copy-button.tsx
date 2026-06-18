'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
  text: string;
};

const SUCCESS_TIMEOUT_MS = 2000;

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), SUCCESS_TIMEOUT_MS);
    } catch {
      // Ignore clipboard failures so the UI remains stable.
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={copied ? 'Copied!' : 'Copy'}
      className="active:scale-95"
      onClick={() => {
        void handleCopy();
      }}
    >
      <span className="relative inline-grid place-items-center">
        <CopyIcon
          className={cn(
            'col-start-1 row-start-1 transition-all duration-150 ease-out',
            copied ? 'scale-75 opacity-0 blur-[2px]' : 'blur-0 scale-100 opacity-100'
          )}
        />
        <CheckIcon
          className={cn(
            'col-start-1 row-start-1 transition-all duration-150 ease-out',
            copied ? 'blur-0 scale-100 opacity-100' : 'scale-75 opacity-0 blur-[2px]'
          )}
        />
      </span>
    </Button>
  );
}
