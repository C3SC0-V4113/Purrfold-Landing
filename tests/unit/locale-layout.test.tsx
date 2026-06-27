import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LocaleLayout from '@/app/[locale]/layout';
import { getMessages } from '@/i18n/messages';

describe('LocaleLayout', () => {
  it('renders children with the localized global footer', async () => {
    const messages = getMessages('en').Footer;

    render(
      await LocaleLayout({
        children: <main>content</main>,
        params: Promise.resolve({ locale: 'en' }),
      } as LayoutProps<'/[locale]'>)
    );

    expect(screen.getByText('content')).toBeDefined();
    expect(screen.getByRole('contentinfo')).toBeDefined();
    expect(screen.getByRole('navigation', { name: messages.label })).toBeDefined();
  });
});
