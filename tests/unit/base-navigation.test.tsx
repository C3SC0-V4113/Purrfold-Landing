import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { BaseNavigation } from '@/components/common/base-navigation';
import { ThemeProvider } from '@/components/common/theme-provider';
import { getMessages } from '@/i18n/messages';
import { externalLinks } from '@/i18n/routing';

let mockPathname = '/en';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => mockPathname,
}));

beforeEach(() => {
  document.body.innerHTML = '';
  document.documentElement.classList.remove('dark');
  mockPathname = '/en';
});

function renderNavigation(locale: 'en' | 'es' = 'en') {
  return render(
    <ThemeProvider>
      <BaseNavigation locale={locale} />
    </ThemeProvider>
  );
}

describe('BaseNavigation', () => {
  it('renders the desktop GitHub link as an accessible icon-only link', () => {
    renderNavigation('en');

    const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
    const githubLink = within(navigation).getByRole('link', { name: 'GitHub' });

    expect(githubLink.getAttribute('href')).toBe(externalLinks.github);
    expect(githubLink.getAttribute('target')).toBe('_blank');
    expect(githubLink.getAttribute('rel')).toBe('noreferrer noopener');
    expect(githubLink.textContent).toBe('');
  });

  it('keeps the mobile GitHub link in the drawer footer', async () => {
    const messages = getMessages('en').Navigation;
    renderNavigation('en');

    fireEvent.click(screen.getByRole('button', { name: messages.openMenu }));

    const dialog = await screen.findByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: messages.mobileMenuTitle })).toBeDefined();

    const drawerLinks = within(dialog).getAllByRole('link');
    const footerLink = drawerLinks.at(-1);

    expect(footerLink).toBeDefined();
    expect(footerLink?.textContent).toBe(messages.github);
    expect(footerLink?.getAttribute('href')).toBe(externalLinks.github);
  });
});
