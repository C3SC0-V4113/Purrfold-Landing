import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CopyButton } from '@/components/copy-button';

describe('CopyButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    await vi.advanceTimersByTimeAsync(0);

    expect(screen.getByRole('button', { name: 'Copied!' })).toBeDefined();

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();

    vi.useRealTimers();
  });

  it('does not throw when the clipboard API is unavailable', async () => {
    vi.stubGlobal('navigator', { clipboard: undefined });

    render(<CopyButton text="npx purrfold@latest my-app" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    expect(() => fireEvent.click(button)).not.toThrow();

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });
});
