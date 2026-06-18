import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { HeroSection } from '@/components/home/hero-section';

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
        name: 'The solid foundation for agent-driven projects',
      })
    ).toBeDefined();
    expect(
      screen.getByText(
        'Purrfold scaffolds production-ready projects with quality gates, agent skills, and shadcn UI — so your agents build on solid ground from day one.'
      )
    ).toBeDefined();
    const cta = screen.getByRole('link', { name: 'Scaffold a project' });
    expect(cta.getAttribute('href')).toBe('/en/install');
  });

  it('renders Spanish hero copy and a CTA to /es/install', () => {
    render(<HeroSection locale="es" />);

    expect(screen.getByText('Agent-first')).toBeDefined();
    expect(
      screen.getByRole('heading', { level: 1, name: 'La base sólida para proyectos con agentes' })
    ).toBeDefined();
    expect(
      screen.getByText(
        'Purrfold genera proyectos listos para producción con controles de calidad, skills para agentes y shadcn UI — para que tus agentes construyan sobre terreno firme desde el día uno.'
      )
    ).toBeDefined();
    const cta = screen.getByRole('link', { name: 'Crear proyecto' });
    expect(cta.getAttribute('href')).toBe('/es/install');
  });
});
