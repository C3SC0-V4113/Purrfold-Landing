import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QuickInstall } from '@/components/home/quick-install';
import { getMessages } from '@/i18n/messages';

describe('QuickInstall', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the CLI tab by default with the install command', () => {
    const tabs = getMessages('en').HomePage.hub.tabs;

    render(<QuickInstall locale="en" />);

    expect(screen.getByRole('tab', { name: tabs.cli })).toBeDefined();
    expect(screen.getByRole('tab', { name: tabs.agent })).toBeDefined();
    expect(screen.getByText(tabs.cliCommand)).toBeDefined();
    expect(screen.queryByText(tabs.agentPrompt)).toBeNull();
  });

  it('switches to the Agent tab and shows the prompt', () => {
    const tabs = getMessages('en').HomePage.hub.tabs;

    render(<QuickInstall locale="en" />);

    const agentTab = screen.getByRole('tab', { name: tabs.agent });

    fireEvent.click(agentTab);

    expect(screen.getByText(tabs.agentPrompt)).toBeDefined();
    expect(screen.queryByText(tabs.cliCommand)).toBeNull();
  });

  it('renders Spanish tab labels and copy', () => {
    render(<QuickInstall locale="es" />);

    expect(screen.getByRole('tab', { name: 'CLI' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'Agente' })).toBeDefined();
    expect(screen.getByText('npx purrfold@latest <directorio-del-proyecto>')).toBeDefined();
  });

  it('renders a copy button for the active tab content', () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn() } });

    render(<QuickInstall locale="en" />);

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });
});
