import en from '@/messages/en.json';
import es from '@/messages/es.json';

import type { Locale } from '@/i18n/routing';

export const messages = {
  en,
  es,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
