'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

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
      onClick={() => {
        void handleCopy();
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
