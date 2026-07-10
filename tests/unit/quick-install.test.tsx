import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QuickInstall } from '@/components/home/quick-install';
import { getMessages } from '@/i18n/messages';

const enTabs = getMessages('en').HomePage.hub.tabs;
const esTabs = getMessages('es').HomePage.hub.tabs;

function renderPrompt(prompt: string, framework: 'Next.js' | 'Astro', flag: string) {
  return prompt.replace(/\{framework\}/g, framework).replace('{frameworkFlag}', flag);
}

describe('QuickInstall', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the CLI tab by default with the Next.js install command', () => {
    render(<QuickInstall messages={enTabs} />);

    expect(screen.getByRole('tab', { name: enTabs.cli })).toBeDefined();
    expect(screen.getByRole('tab', { name: enTabs.agent })).toBeDefined();
    expect(screen.getByText(enTabs.cliCommand)).toBeDefined();
  });

  it('switches to the Agent tab and shows the Next.js prompt', () => {
    render(<QuickInstall messages={enTabs} />);

    fireEvent.click(screen.getByRole('tab', { name: enTabs.agent }));

    expect(screen.getByText(renderPrompt(enTabs.agentPrompt, 'Next.js', ''))).toBeDefined();
  });

  it('adds the astro framework flag to the CLI command when Astro is selected', () => {
    render(<QuickInstall messages={enTabs} />);

    const frameworkTrigger = screen.getByRole('combobox', { name: enTabs.framework });
    fireEvent.click(frameworkTrigger);
    const astroOption = screen.getByRole('option', { name: 'Astro' });
    fireEvent.pointerDown(astroOption);
    fireEvent.click(astroOption);

    expect(screen.getByText(`${enTabs.cliCommand} --framework astro`)).toBeDefined();
  });

  it('names Astro in the agent prompt when Astro is selected', () => {
    render(<QuickInstall messages={enTabs} />);

    const frameworkTrigger = screen.getByRole('combobox', { name: enTabs.framework });
    fireEvent.click(frameworkTrigger);
    const astroOption = screen.getByRole('option', { name: 'Astro' });
    fireEvent.pointerDown(astroOption);
    fireEvent.click(astroOption);

    fireEvent.click(screen.getByRole('tab', { name: enTabs.agent }));

    expect(
      screen.getByText(renderPrompt(enTabs.agentPrompt, 'Astro', ' --framework astro'))
    ).toBeDefined();
  });

  it('renders Spanish tab labels and copy', () => {
    render(<QuickInstall messages={esTabs} />);

    expect(screen.getByRole('tab', { name: 'CLI' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'Agente' })).toBeDefined();
    expect(screen.getByText('npx purrfold@latest <directorio-del-proyecto>')).toBeDefined();
  });

  it('renders a copy button for the active tab content', () => {
    vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn() } });

    render(<QuickInstall messages={enTabs} />);

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });
});
