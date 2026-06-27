import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { ecosystemResources } from '@/components/ecosystem/ecosystem-catalog';
import { SummaryCards } from '@/components/home/summary-cards';
import { qualityTools } from '@/components/quality/quality-catalog';
import { skillCatalog } from '@/components/skills/skills-catalog';
import { getMessages } from '@/i18n/messages';

describe('SummaryCards', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders four preview sections with English content', () => {
    const messages = getMessages('en');
    const cards = messages.HomePage.hub.cards;

    render(<SummaryCards locale="en" />);

    const sections = screen.getAllByRole('article');
    expect(sections).toHaveLength(4);

    expect(screen.getByText(cards.title)).toBeDefined();
    expect(screen.getByText(cards.description)).toBeDefined();

    for (const route of ['install', 'skills', 'quality', 'ecosystem'] as const) {
      expect(screen.getByRole('heading', { level: 3, name: cards[route].title })).toBeDefined();
      expect(screen.getByText(cards[route].description)).toBeDefined();
      expect(screen.getByRole('link', { name: cards.cta[route] })).toBeDefined();
    }

    expect(
      screen.getByText(
        `${messages.Pages.install.flagsReference.items.length} ${cards.metrics.flags}`
      )
    ).toBeDefined();
    expect(screen.getByText(`${skillCatalog.length} ${cards.metrics.skills}`)).toBeDefined();
    expect(
      screen.getByText(
        `${qualityTools.filter((tool) => tool.status === 'default').length} ${
          cards.metrics.defaultTools
        }`
      )
    ).toBeDefined();
    expect(
      screen.getByText(
        `${ecosystemResources.filter((resource) => resource.category === 'community').length} ${
          cards.metrics.communityResources
        }`
      )
    ).toBeDefined();

    expect(screen.getAllByText(messages.Pages.skills.skills.shadcn.name).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(messages.Pages.quality.tools['react-doctor'].name).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(messages.Pages.ecosystem.resources.remocn.name).length
    ).toBeGreaterThan(0);
  });

  it('links each section to the correct localized route', () => {
    render(<SummaryCards locale="en" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/en/install', '/en/skills', '/en/quality', '/en/ecosystem']);
  });

  it('uses Spanish locale prefixes and labels', () => {
    const cards = getMessages('es').HomePage.hub.cards;

    render(<SummaryCards locale="es" />);

    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual(['/es/install', '/es/skills', '/es/quality', '/es/ecosystem']);

    expect(screen.getByRole('link', { name: cards.cta.install })).toBeDefined();
    expect(screen.getByRole('link', { name: cards.cta.skills })).toBeDefined();
    expect(screen.getByRole('link', { name: cards.cta.quality })).toBeDefined();
    expect(screen.getByRole('link', { name: cards.cta.ecosystem })).toBeDefined();
  });
});
