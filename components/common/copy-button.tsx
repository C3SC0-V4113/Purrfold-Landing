'use client';

import { CheckIcon, CopyIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { getMessages } from '@/i18n/messages';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
  text: string;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
};

const SUCCESS_TIMEOUT_MS = 2000;

export function CopyButton({ text, label = 'Copy', copiedLabel, failedLabel }: CopyButtonProps) {
  const [status, setStatus] = useState<'success' | 'failure' | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const handleCopy = async () => {
    if (timer.current) clearTimeout(timer.current);
    setStatus(null);
    setAnnouncement('');
    const locale = document.documentElement.lang.startsWith('es') ? 'es' : 'en';
    const messages = getMessages(locale).HomePage.hub.tabs;
    try {
      await navigator.clipboard.writeText(text);
      setStatus('success');
      setAnnouncement(copiedLabel ?? messages.copied);
      timer.current = setTimeout(() => {
        setStatus(null);
        setAnnouncement('');
      }, SUCCESS_TIMEOUT_MS);
    } catch {
      setStatus('failure');
      setAnnouncement(failedLabel ?? messages.copyFailed);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        aria-label={label}
        className="motion-safe:active:scale-95"
        onClick={() => {
          void handleCopy();
        }}
      >
        <span className="relative inline-grid place-items-center" aria-hidden="true">
          <CopyIcon
            className={cn(
              'col-start-1 row-start-1 motion-safe:transition-[transform,opacity] motion-safe:duration-150 motion-safe:ease-out',
              status === 'success' ? 'opacity-0 motion-safe:scale-75' : 'opacity-100'
            )}
          />
          <CheckIcon
            className={cn(
              'col-start-1 row-start-1 motion-safe:transition-[transform,opacity] motion-safe:duration-150 motion-safe:ease-out',
              status === 'success' ? 'opacity-100' : 'opacity-0 motion-safe:scale-75'
            )}
          />
        </span>
      </Button>
      <output className="sr-only">{announcement}</output>
    </>
  );
}
