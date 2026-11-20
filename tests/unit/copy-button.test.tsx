import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CopyButton } from '@/components/common/copy-button';

describe('CopyButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders a copy button with the Copy icon initially', () => {
    render(<CopyButton text="copy me" />);

    const button = screen.getByRole('button', { name: 'Copy' });
    expect(button).toBeDefined();
  });

  it('copies the provided text to the clipboard when clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    render(<CopyButton text="npx purrfold@latest my-app" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledExactlyOnceWith('npx purrfold@latest my-app');
  });

  it('shows a Check icon after a successful copy and reverts back', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    render(<CopyButton text="npx purrfold@latest my-app" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    fireEvent.click(button);

    await vi.waitFor(() => {
      expect(screen.getByRole('status').textContent).toBe('Copied!');
      expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });

  it('announces clipboard failures without changing the button name', async () => {
    vi.stubGlobal('navigator', { clipboard: undefined });

    render(<CopyButton text="npx purrfold@latest my-app" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    expect(() => fireEvent.click(button)).not.toThrow();

    await vi.waitFor(() => {
      expect(screen.getByRole('status').textContent).toBe('Copy failed. Please try again.');
    });
    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });

  it('announces a localized clipboard failure', async () => {
    vi.stubGlobal('navigator', {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error()) },
    });
    render(<CopyButton text="comando" label="Copiar comando" failedLabel="No se pudo copiar." />);

    fireEvent.click(screen.getByRole('button', { name: 'Copiar comando' }));

    await vi.waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe('No se pudo copiar.')
    );
    expect(screen.getByRole('button', { name: 'Copiar comando' })).toBeDefined();
  });
});
