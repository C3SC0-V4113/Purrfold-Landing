import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FlagConfigurator } from '@/components/flag-configurator';
import { defaultFlags, type FlagState } from '@/lib/build-command';

import { enInstallMessages, esInstallMessages } from './fixtures/install-messages';

function openCollapsible() {
  const trigger = screen.getByRole('button', { name: /flags/i });
  fireEvent.click(trigger);
}

describe('FlagConfigurator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the title and collapsed trigger by default', () => {
    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByText(enInstallMessages.configurator.title)).toBeDefined();
    expect(screen.getByRole('button', { name: enInstallMessages.configurator.show })).toBeDefined();
    expect(
      screen.queryByRole('checkbox', { name: enInstallMessages.configurator.unit })
    ).toBeNull();
  });

  it('shows controls after expanding', () => {
    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={vi.fn()}
      />
    );

    openCollapsible();

    expect(screen.getByRole('button', { name: enInstallMessages.configurator.hide })).toBeDefined();
    expect(
      screen.getByRole('checkbox', { name: enInstallMessages.configurator.unit })
    ).toBeDefined();
    expect(
      screen.getByRole('checkbox', { name: enInstallMessages.configurator.e2e })
    ).toBeDefined();
    expect(screen.getByText(enInstallMessages.configurator.pm)).toBeDefined();
    expect(screen.getByLabelText(enInstallMessages.configurator.presetId)).toBeDefined();
  });

  it('renders Spanish labels when provided', () => {
    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={esInstallMessages.configurator}
        onChange={vi.fn()}
      />
    );

    openCollapsible();

    expect(screen.getByText(esInstallMessages.configurator.title)).toBeDefined();
    expect(
      screen.getByRole('checkbox', { name: esInstallMessages.configurator.unit })
    ).toBeDefined();
    expect(screen.getByLabelText(esInstallMessages.configurator.presetId)).toBeDefined();
  });

  it('calls onChange when a boolean flag is toggled off', () => {
    const onChange = vi.fn();

    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={onChange}
      />
    );

    openCollapsible();

    const unitCheckbox = screen.getByRole('checkbox', {
      name: enInstallMessages.configurator.unit,
    });
    fireEvent.click(unitCheckbox);

    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...defaultFlags, unit: false });
  });

  it('calls onChange when a boolean flag is toggled on', () => {
    const onChange = vi.fn();
    const flags: FlagState = { ...defaultFlags, e2e: false };

    render(
      <FlagConfigurator
        flags={flags}
        messages={enInstallMessages.configurator}
        onChange={onChange}
      />
    );

    openCollapsible();

    const e2eCheckbox = screen.getByRole('checkbox', { name: enInstallMessages.configurator.e2e });
    fireEvent.click(e2eCheckbox);

    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...flags, e2e: true });
  });

  it('calls onChange when the package manager is changed', () => {
    const onChange = vi.fn();

    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={onChange}
      />
    );

    openCollapsible();

    const pmTrigger = screen.getByRole('combobox', { name: enInstallMessages.configurator.pm });
    fireEvent.click(pmTrigger);
    const pnpmOption = screen.getByRole('option', { name: 'pnpm' });
    fireEvent.pointerDown(pnpmOption);
    fireEvent.click(pnpmOption);

    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...defaultFlags, pm: 'pnpm' });
  });
  it('calls onChange when the preset input changes', () => {
    const onChange = vi.fn();

    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={onChange}
      />
    );

    openCollapsible();

    const presetInput = screen.getByLabelText(enInstallMessages.configurator.presetId);
    fireEvent.change(presetInput, { target: { value: 'b3REw8vwo' } });

    expect(onChange).toHaveBeenCalledExactlyOnceWith({ ...defaultFlags, presetId: 'b3REw8vwo' });
  });

  it('collapses and expands without changing flags', () => {
    const onChange = vi.fn();

    render(
      <FlagConfigurator
        flags={defaultFlags}
        messages={enInstallMessages.configurator}
        onChange={onChange}
      />
    );

    openCollapsible();

    const hideTrigger = screen.getByRole('button', { name: enInstallMessages.configurator.hide });
    fireEvent.click(hideTrigger);

    expect(screen.getByRole('button', { name: enInstallMessages.configurator.show })).toBeDefined();
    expect(
      screen.queryByRole('checkbox', { name: enInstallMessages.configurator.unit })
    ).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: enInstallMessages.configurator.show }));

    expect(screen.getByRole('button', { name: enInstallMessages.configurator.hide })).toBeDefined();
    expect(
      screen.getByRole('checkbox', { name: enInstallMessages.configurator.unit })
    ).toBeDefined();

    expect(onChange).not.toHaveBeenCalled();
  });
});
