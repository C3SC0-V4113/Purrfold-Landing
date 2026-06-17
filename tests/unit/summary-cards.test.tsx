import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SummaryCards } from '@/components/summary-cards';

describe('SummaryCards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders four cards with English titles and descriptions', () => {
    render(<SummaryCards locale="en" />);

    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(4);

    expect(screen.getByText('Install')).toBeDefined();
    expect(screen.getByText('Skills')).toBeDefined();
    expect(screen.getByText('Quality')).toBeDefined();
    expect(screen.getByText('Ecosystem')).toBeDefined();

    expect(screen.getByText('CLI and agent setup flows with flags and presets.')).toBeDefined();
  });

  it('links each card to the correct localized route', () => {
    render(<SummaryCards locale="en" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/en/install', '/en/skills', '/en/quality', '/en/ecosystem']);
  });

  it('uses Spanish locale prefixes for Spanish content', () => {
    render(<SummaryCards locale="es" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/es/install', '/es/skills', '/es/quality', '/es/ecosystem']);
  });
});
