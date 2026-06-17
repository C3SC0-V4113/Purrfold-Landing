import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { RoadmapSection } from '@/components/roadmap-section';

describe('RoadmapSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the roadmap title and framework list in English', () => {
    render(<RoadmapSection locale="en" />);

    expect(screen.getByRole('heading', { name: 'Roadmap' })).toBeDefined();
    expect(screen.getByText('Next.js')).toBeDefined();
    expect(screen.getByText('Astro')).toBeDefined();
    expect(screen.getByText('Vite')).toBeDefined();
    expect(screen.getByText('TanStack Start')).toBeDefined();
  });

  it('shows shipped and future status badges', () => {
    render(<RoadmapSection locale="en" />);

    expect(screen.getAllByText('Shipped')).toHaveLength(1);
    expect(screen.getAllByText('Future')).toHaveLength(3);
  });

  it('renders Spanish roadmap copy', () => {
    render(<RoadmapSection locale="es" />);

    expect(screen.getByRole('heading', { name: 'Hoja de ruta' })).toBeDefined();
    expect(screen.getAllByText('Disponible')).toHaveLength(1);
    expect(screen.getAllByText('Próximo')).toHaveLength(3);
  });
});
