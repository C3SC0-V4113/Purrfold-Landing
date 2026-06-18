import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InstallView } from '@/components/install/install-view';
import { buildAgentPrompt, buildCliCommand, defaultFlags } from '@/lib/build-command';

import { enInstallMessages, esInstallMessages } from './fixtures/install-messages';

function openConfigurator() {
  const trigger = screen.getByRole('button', { name: /flags/i });
  fireEvent.click(trigger);
}

describe('InstallView', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders CLI and Agent tabs with the CLI output by default', () => {
    render(<InstallView locale="en" messages={enInstallMessages} />);

    expect(screen.getByRole('tab', { name: enInstallMessages.tabs.cli })).toBeDefined();
    expect(screen.getByRole('tab', { name: enInstallMessages.tabs.agent })).toBeDefined();
    expect(
      screen.getByText(buildCliCommand(defaultFlags, enInstallMessages.output.command))
    ).toBeDefined();
  });

  it('switches to the Agent tab and shows the localized prompt', () => {
    render(<InstallView locale="en" messages={enInstallMessages} />);

    fireEvent.click(screen.getByRole('tab', { name: enInstallMessages.tabs.agent }));

    expect(
      screen.getByText(buildAgentPrompt(defaultFlags, enInstallMessages.output))
    ).toBeDefined();
    expect(
      screen.queryByText(buildCliCommand(defaultFlags, enInstallMessages.output.command))
    ).toBeNull();
  });

  it('preserves flag selections when switching back to the CLI tab', () => {
    render(<InstallView locale="en" messages={enInstallMessages} />);

    openConfigurator();

    const e2eCheckbox = screen.getByRole('checkbox', {
      name: enInstallMessages.configurator.e2e,
    });

    fireEvent.click(e2eCheckbox);

    fireEvent.click(screen.getByRole('tab', { name: enInstallMessages.tabs.agent }));
    fireEvent.click(screen.getByRole('tab', { name: enInstallMessages.tabs.cli }));

    expect(
      screen.getByText(
        buildCliCommand({ ...defaultFlags, e2e: true }, enInstallMessages.output.command)
      )
    ).toBeDefined();
  });

  it('updates the CLI output when the package manager changes', () => {
    render(<InstallView locale="en" messages={enInstallMessages} />);

    openConfigurator();

    const pmTrigger = screen.getByRole('combobox', { name: enInstallMessages.configurator.pm });

    fireEvent.click(pmTrigger);
    const pnpmOption = screen.getByRole('option', { name: 'pnpm' });
    fireEvent.pointerDown(pnpmOption);
    fireEvent.click(pnpmOption);

    expect(
      screen.getByText(
        buildCliCommand({ ...defaultFlags, pm: 'pnpm' }, enInstallMessages.output.command)
      )
    ).toBeDefined();
  });

  it('updates the output when the preset input changes', () => {
    render(<InstallView locale="en" messages={enInstallMessages} />);

    openConfigurator();

    const presetInput = screen.getByLabelText(enInstallMessages.configurator.presetId);

    fireEvent.change(presetInput, { target: { value: 'abc123' } });

    expect(
      screen.getByText(
        buildCliCommand({ ...defaultFlags, presetId: 'abc123' }, enInstallMessages.output.command)
      )
    ).toBeDefined();
  });

  it('renders children passed from the server', () => {
    render(
      <InstallView locale="en" messages={enInstallMessages}>
        <div data-testid="server-child">Server content</div>
      </InstallView>
    );

    expect(screen.getByTestId('server-child')).toBeDefined();
  });

  it('renders Spanish tab labels and output labels', () => {
    render(<InstallView locale="es" messages={esInstallMessages} />);

    expect(screen.getByRole('tab', { name: esInstallMessages.tabs.cli })).toBeDefined();
    expect(screen.getByRole('tab', { name: esInstallMessages.tabs.agent })).toBeDefined();
    expect(screen.getByText(esInstallMessages.output.cliLabel)).toBeDefined();
  });
});
