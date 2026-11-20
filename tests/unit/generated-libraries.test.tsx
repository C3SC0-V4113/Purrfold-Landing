import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { FoundationsSection } from '@/components/home/foundations-section';
import { generatedLibraries } from '@/components/home/generated-libraries-catalog';
import { getMessages } from '@/i18n/messages';

describe('generated app libraries', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it.each([
    ['en', 'What the generated app includes'],
    ['es', 'Qué incluye la app generada'],
  ] as const)('renders the localized libraries block (%s)', (locale, heading) => {
    render(<FoundationsSection locale={locale} />);

    expect(screen.getByRole('heading', { name: heading })).toBeDefined();
    const list = within(screen.getByRole('list', { name: heading }));
    const items = getMessages(locale).HomePage.hub.foundations.libraries.items;
    for (const library of generatedLibraries) {
      if (!('href' in library)) continue;
      const { id, href } = library;
      expect(list.getByRole('link', { name: items[id].name }).getAttribute('href')).toBe(href);
    }
    expect(list.queryByRole('link', { name: items.icons.name })).toBeNull();
  });

  it('explains the generated library options and setup', () => {
    render(<FoundationsSection locale="en" />);

    expect(screen.getByText(/shadcn init/)).toBeDefined();
    expect(screen.getByText(/--icons/)).toBeDefined();
    expect(screen.getByText(/--query/)).toBeDefined();
    expect(screen.getByText(/--motion/)).toBeDefined();
    expect(screen.getByText(/prefers-reduced-motion/)).toBeDefined();
  });
});
