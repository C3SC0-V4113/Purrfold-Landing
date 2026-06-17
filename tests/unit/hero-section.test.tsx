import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { HeroSection } from '@/components/hero-section';

describe('HeroSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders English hero copy and a CTA to /en/install', () => {
    render(<HeroSection locale="en" />);

    expect(screen.getByText('Agent-first')).toBeDefined();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Purrfold landing for serious agent workflows',
      })
    ).toBeDefined();
    expect(
      screen.getByText(
        'Purrfold scaffolds production-grade projects with quality gates, agent skills, and shadcn UI — so you can focus on code that matters.'
      )
    ).toBeDefined();
    const cta = screen.getByRole('link', { name: 'Get started' });
    expect(cta.getAttribute('href')).toBe('/en/install');
  });

  it('renders Spanish hero copy and a CTA to /es/install', () => {
    render(<HeroSection locale="es" />);

    expect(screen.getByText('Agent-first')).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Purrfold para flujos serios con agentes' })
    ).toBeDefined();
    expect(
      screen.getByText(
        'Purrfold genera proyectos listos para producción con controles de calidad, skills para agentes y shadcn UI, para que te enfoques en el código que importa.'
      )
    ).toBeDefined();
    const cta = screen.getByRole('link', { name: 'Empezar' });
    expect(cta.getAttribute('href')).toBe('/es/install');
  });
});
