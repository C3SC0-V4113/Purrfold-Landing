import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FlagsReference } from '@/components/install/flags-reference';

import { enInstallMessages, esInstallMessages } from './fixtures/install-messages';

describe('FlagsReference', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the section title and every flag with its description', () => {
    render(<FlagsReference messages={enInstallMessages.flagsReference} />);

    expect(screen.getByText(enInstallMessages.flagsReference.title)).toBeDefined();

    for (const item of enInstallMessages.flagsReference.items) {
      expect(screen.getByText(item.flag)).toBeDefined();
      expect(screen.getByText(item.description)).toBeDefined();
    }
  });

  it('renders Spanish flag descriptions when provided', () => {
    render(<FlagsReference messages={esInstallMessages.flagsReference} />);

    expect(screen.getByText(esInstallMessages.flagsReference.title)).toBeDefined();

    for (const item of esInstallMessages.flagsReference.items) {
      expect(screen.getByText(item.description)).toBeDefined();
    }
  });
});
