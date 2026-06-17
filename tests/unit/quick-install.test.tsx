import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QuickInstall } from '@/components/quick-install';

describe('QuickInstall', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the CLI tab by default with the install command', () => {
    render(<QuickInstall locale="en" />);

    expect(screen.getByRole('tab', { name: 'CLI' })).toBeDefined();
    expect(screen.getByRole('tab', { name: 'Agent' })).toBeDefined();
    expect(screen.getByText('npx purrfold@latest <project-directory>')).toBeDefined();
    expect(
      screen.queryByText(
        'I want to start a new Purrfold project. Please scaffold a Next.js project with i18n, quality gates, shadcn/base-rhea, and agent skills enabled. Run the init flow and show me the first steps.'
      )
    ).toBeNull();
  });

  it('switches to the Agent tab and shows the prompt', () => {
    render(<QuickInstall locale="en" />);

    const agentTab = screen.getByRole('tab', { name: 'Agent' });

    fireEvent.click(agentTab);

    expect(
      screen.getByText(
        'I want to start a new Purrfold project. Please scaffold a Next.js project with i18n, quality gates, shadcn/base-rhea, and agent skills enabled. Run the init flow and show me the first steps.'
      )
    ).toBeDefined();
    expect(screen.queryByText('npx purrfold@latest <project-directory>')).toBeNull();
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
