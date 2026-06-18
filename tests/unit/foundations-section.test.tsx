import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { FoundationsSection } from '@/components/home/foundations-section';

describe('FoundationsSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders external links with target and rel attributes in English', () => {
    render(<FoundationsSection locale="en" />);

    expect(screen.getByRole('heading', { name: 'Foundations' })).toBeDefined();

    const shadcnLink = screen.getByRole('link', { name: 'shadcn/ui' });
    expect(shadcnLink.getAttribute('href')).toBe('https://ui.shadcn.com');
    expect(shadcnLink.getAttribute('target')).toBe('_blank');
    expect(shadcnLink.getAttribute('rel')).toBe('noreferrer noopener');

    const nextjsLink = screen.getByRole('link', { name: 'Next.js' });
    expect(nextjsLink.getAttribute('href')).toBe('https://nextjs.org');
    expect(nextjsLink.getAttribute('target')).toBe('_blank');
    expect(nextjsLink.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('renders Spanish foundations copy', () => {
    render(<FoundationsSection locale="es" />);

    expect(screen.getByRole('heading', { name: 'Bases' })).toBeDefined();
    expect(screen.getByText('Construido sobre las primitivas en las que confiamos.')).toBeDefined();
    expect(screen.getByRole('link', { name: 'shadcn/ui' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Next.js' })).toBeDefined();
  });
});
