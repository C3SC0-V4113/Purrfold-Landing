import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { HeroSection } from '@/components/home/hero-section';
import { getMessages } from '@/i18n/messages';

describe('HeroSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders English hero copy and a CTA to /en/install', () => {
    const hero = getMessages('en').HomePage.hub.hero;

    render(<HeroSection locale="en" />);

    expect(screen.getByText(hero.eyebrow)).toBeDefined();
    expect(screen.getByRole('heading', { level: 1, name: hero.title })).toBeDefined();
    expect(screen.getByText(hero.description)).toBeDefined();
    const cta = screen.getByRole('link', { name: hero.cta });
    expect(cta.getAttribute('href')).toBe('/en/install');
  });

  it('renders Spanish hero copy and a CTA to /es/install', () => {
    const hero = getMessages('es').HomePage.hub.hero;

    render(<HeroSection locale="es" />);

    expect(screen.getByText(hero.eyebrow)).toBeDefined();
    expect(screen.getByRole('heading', { level: 1, name: hero.title })).toBeDefined();
    expect(screen.getByText(hero.description)).toBeDefined();
    const cta = screen.getByRole('link', { name: hero.cta });
    expect(cta.getAttribute('href')).toBe('/es/install');
  });
});
