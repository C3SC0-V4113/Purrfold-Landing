import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SummaryCards } from '@/components/home/summary-cards';

describe('SummaryCards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders four preview sections with English content', () => {
    render(<SummaryCards locale="en" />);

    const sections = screen.getAllByRole('article');
    expect(sections).toHaveLength(4);

    expect(screen.getByText('Install')).toBeDefined();
    expect(screen.getByText('Skills')).toBeDefined();
    expect(screen.getByText('Quality')).toBeDefined();
    expect(screen.getByText('Ecosystem')).toBeDefined();

    expect(screen.getByText('Install guide →')).toBeDefined();
    expect(screen.getByText('View skills →')).toBeDefined();
    expect(screen.getByText('Quality pipeline →')).toBeDefined();
    expect(screen.getByText('Explore ecosystem →')).toBeDefined();

    expect(screen.getByText('CLI and agent setup flows with flags and presets.')).toBeDefined();
  });

  it('links each section to the correct localized route', () => {
    render(<SummaryCards locale="en" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/en/install', '/en/skills', '/en/quality', '/en/ecosystem']);
  });

  it('uses Spanish locale prefixes and labels', () => {
    render(<SummaryCards locale="es" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/es/install', '/es/skills', '/es/quality', '/es/ecosystem']);

    expect(screen.getByText('Guía de instalación →')).toBeDefined();
    expect(screen.getByText('Ver skills →')).toBeDefined();
    expect(screen.getByText('Pipeline de calidad →')).toBeDefined();
    expect(screen.getByText('Explorar ecosistema →')).toBeDefined();
  });
});
