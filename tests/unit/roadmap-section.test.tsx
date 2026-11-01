import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { RoadmapSection } from '@/components/home/roadmap-section';

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
    expect(screen.getByText('React Router')).toBeDefined();
  });

  it('marks every framework purrfold scaffolds as shipped', () => {
    render(<RoadmapSection locale="en" />);

    expect(screen.getAllByText('Shipped')).toHaveLength(4);
    expect(screen.queryByText('Future')).toBeNull();
  });

  it('renders Spanish roadmap copy', () => {
    render(<RoadmapSection locale="es" />);

    expect(screen.getByRole('heading', { name: 'Hoja de ruta' })).toBeDefined();
    expect(screen.getAllByText('Disponible')).toHaveLength(4);
    expect(screen.queryByText('Próximo')).toBeNull();
  });
});
