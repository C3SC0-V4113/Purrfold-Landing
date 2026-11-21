import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { RoadmapSection } from '@/components/home/roadmap-section';

describe('RoadmapSection', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders shipped frameworks and future roadmap items in English', () => {
    render(<RoadmapSection locale="en" />);

    expect(screen.getByRole('heading', { name: 'Roadmap' })).toBeDefined();
    expect(screen.getByText('Next.js')).toBeDefined();
    expect(screen.getByText('Astro')).toBeDefined();
    expect(screen.getByText('Vite')).toBeDefined();
    expect(screen.getByText('React Router')).toBeDefined();
    expect(screen.getByText('TanStack Start')).toBeDefined();
    expect(screen.getByText('oxlint')).toBeDefined();
    expect(
      screen.getByText(
        'Under consideration as an optional alternative to ESLint; ESLint remains the default.'
      )
    ).toBeDefined();

    expect(screen.getAllByText('Shipped')).toHaveLength(4);
    expect(screen.getAllByText('Future')).toHaveLength(2);
  });

  it('renders Spanish roadmap copy', () => {
    render(<RoadmapSection locale="es" />);

    expect(screen.getByRole('heading', { name: 'Hoja de ruta' })).toBeDefined();
    expect(screen.getAllByText('Disponible')).toHaveLength(4);
    expect(screen.getAllByText('Próximo')).toHaveLength(2);
    expect(
      screen.getByText(
        'En evaluación como alternativa opcional a ESLint; ESLint sigue siendo la opción predeterminada.'
      )
    ).toBeDefined();
  });
});
