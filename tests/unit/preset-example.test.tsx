import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PresetExample } from '@/components/preset-example';

import { enInstallMessages, esInstallMessages } from './fixtures/install-messages';

describe('PresetExample', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the title, description, and command with default preset', () => {
    const onChange = vi.fn();
    render(
      <PresetExample messages={enInstallMessages.preset} presetId="b0" onPresetChange={onChange} />
    );

    expect(screen.getByText(enInstallMessages.preset.title)).toBeDefined();
    expect(screen.getByText(enInstallMessages.preset.description)).toBeDefined();
    expect(screen.getByDisplayValue('b0')).toBeDefined();
    expect(screen.getByText(/npx purrfold@latest my-app/)).toBeDefined();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    expect(screen.getByRole('link', { name: 'Find shadcn presets' })).toBeDefined();
  });

  it('calls onPresetChange when the input value changes', () => {
    const onChange = vi.fn();
    render(
      <PresetExample messages={enInstallMessages.preset} presetId="b0" onPresetChange={onChange} />
    );

    const input = screen.getByDisplayValue('b0');
    fireEvent.change(input, { target: { value: 'abc123' } });

    expect(onChange).toHaveBeenCalledExactlyOnceWith('abc123');
  });

  it('copies the command when the copy button is clicked', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const onChange = vi.fn();

    render(
      <PresetExample
        messages={enInstallMessages.preset}
        presetId="my-preset"
        onPresetChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalled();
    expect(writeText.mock.calls[0][0]).toContain('--shadcn-args --preset my-preset');
  });

  it('renders Spanish content when provided', () => {
    const onChange = vi.fn();
    render(
      <PresetExample messages={esInstallMessages.preset} presetId="b0" onPresetChange={onChange} />
    );

    expect(screen.getByText(esInstallMessages.preset.title)).toBeDefined();
    expect(screen.getByText(esInstallMessages.preset.description)).toBeDefined();
  });
});
