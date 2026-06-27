import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { SiteFooter } from '@/components/common/site-footer';
import { getMessages } from '@/i18n/messages';
import { externalLinks } from '@/i18n/routing';

function assertExternalLink(name: string, href: string) {
  const link = screen.getByRole('link', { name });

  expect(link.getAttribute('href')).toBe(href);
  expect(link.getAttribute('target')).toBe('_blank');
  expect(link.getAttribute('rel')).toBe('noreferrer noopener');
}

describe('SiteFooter', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the English global footer links', () => {
    const messages = getMessages('en').Footer;

    render(<SiteFooter locale="en" />);

    expect(screen.getByRole('contentinfo')).toBeDefined();
    expect(screen.getByRole('navigation', { name: messages.label })).toBeDefined();
    expect(screen.getByText(messages.description)).toBeDefined();
    expect(screen.getByText(messages.credit)).toBeDefined();

    assertExternalLink(messages.links.github, externalLinks.github);
    assertExternalLink(messages.links.website, externalLinks.personalWebsite);
    assertExternalLink(messages.links.linkedin, externalLinks.linkedin);
  });

  it('renders the Spanish global footer links', () => {
    const messages = getMessages('es').Footer;

    render(<SiteFooter locale="es" />);

    expect(screen.getByRole('navigation', { name: messages.label })).toBeDefined();
    expect(screen.getByText(messages.description)).toBeDefined();

    assertExternalLink(messages.links.github, externalLinks.github);
    assertExternalLink(messages.links.website, externalLinks.personalWebsite);
    assertExternalLink(messages.links.linkedin, externalLinks.linkedin);
  });
});
