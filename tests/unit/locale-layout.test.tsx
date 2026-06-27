import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LocaleLayout from '@/app/[locale]/layout';
import { ThemeProvider } from '@/components/common/theme-provider';
import { getMessages } from '@/i18n/messages';
import { externalLinks } from '@/i18n/routing';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/en',
}));

describe('LocaleLayout', () => {
  it('renders shared navigation, children, and the localized global footer', async () => {
    const footer = getMessages('en').Footer;
    const navigation = getMessages('en').Navigation;

    render(
      <ThemeProvider>
        {await LocaleLayout({
          children: <main>content</main>,
          params: Promise.resolve({ locale: 'en' }),
        } as LayoutProps<'/[locale]'>)}
      </ThemeProvider>
    );

    expect(screen.getByRole('banner')).toBeDefined();
    expect(screen.getByText('content')).toBeDefined();
    expect(screen.getByRole('contentinfo')).toBeDefined();

    const primaryNavigation = screen.getByRole('navigation', { name: navigation.label });
    expect(within(primaryNavigation).getByRole('link', { name: navigation.home })).toBeDefined();
    expect(
      within(primaryNavigation).getByRole('link', { name: navigation.github }).getAttribute('href')
    ).toBe(externalLinks.github);

    expect(screen.getByRole('navigation', { name: footer.label })).toBeDefined();
  });
});
