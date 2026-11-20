import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { FoundationsSection } from '@/components/home/foundations-section';

describe('FoundationsSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders external links with target and rel attributes in English', () => {
    render(<FoundationsSection locale="en" />);

    expect(screen.getByRole('heading', { name: 'Foundations' })).toBeDefined();
    const foundations = within(screen.getByRole('list', { name: 'Foundations' }));

    const byHref = (href: string) =>
      foundations.getAllByRole('link').find((link) => link.getAttribute('href') === href)!;
    const shadcnLink = byHref('https://ui.shadcn.com');
    expect(shadcnLink.getAttribute('href')).toBe('https://ui.shadcn.com');
    expect(shadcnLink.getAttribute('target')).toBe('_blank');
    expect(shadcnLink.getAttribute('rel')).toBe('noreferrer noopener');

    const nextjsLink = byHref('https://nextjs.org');
    expect(nextjsLink.getAttribute('href')).toBe('https://nextjs.org');
    expect(nextjsLink.getAttribute('target')).toBe('_blank');
    expect(nextjsLink.getAttribute('rel')).toBe('noreferrer noopener');

    const astroLink = byHref('https://astro.build');
    expect(astroLink.getAttribute('href')).toBe('https://astro.build');
    expect(astroLink.getAttribute('target')).toBe('_blank');
    expect(astroLink.getAttribute('rel')).toBe('noreferrer noopener');

    for (const href of ['https://vite.dev', 'https://reactrouter.com', 'https://tailwindcss.com']) {
      const link = byHref(href);
      expect(link.getAttribute('href')).toBe(href);
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noreferrer noopener');
    }
  });

  it('renders Spanish foundations copy', () => {
    render(<FoundationsSection locale="es" />);

    expect(screen.getByRole('heading', { name: 'Bases' })).toBeDefined();
    expect(screen.getByText('Construido sobre las primitivas en las que confiamos.')).toBeDefined();
    const foundations = within(screen.getByRole('list', { name: 'Bases' }));
    expect(foundations.getByRole('link', { name: 'shadcn/ui' })).toBeDefined();
    expect(foundations.getByRole('link', { name: 'Next.js' })).toBeDefined();
    expect(foundations.getByRole('link', { name: 'Vite' })).toBeDefined();
    expect(foundations.getByRole('link', { name: 'React Router' })).toBeDefined();
    expect(foundations.getByRole('link', { name: 'Tailwind CSS' })).toBeDefined();
  });
});
