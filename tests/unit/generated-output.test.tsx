import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { GeneratedOutput } from '@/components/install/generated-output';

describe('GeneratedOutput', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the output label and code block', () => {
    render(<GeneratedOutput label="CLI command" output="npx purrfold@latest my-app --unit" />);

    expect(screen.getByText('CLI command')).toBeDefined();
    expect(screen.getByText('npx purrfold@latest my-app --unit')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Copy' })).toBeDefined();
  });

  it('copies the current output when the copy button is clicked', () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });

    render(<GeneratedOutput label="Agent prompt" output="Scaffold my app" />);

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledExactlyOnceWith('Scaffold my app');
  });

  it('updates the rendered code when the output prop changes', () => {
    const { rerender } = render(
      <GeneratedOutput label="CLI command" output="npx purrfold@latest my-app --unit" />
    );

    expect(screen.getByText('npx purrfold@latest my-app --unit')).toBeDefined();

    rerender(
      <GeneratedOutput label="CLI command" output="npx purrfold@latest my-app --unit --e2e" />
    );

    expect(screen.getByText('npx purrfold@latest my-app --unit --e2e')).toBeDefined();
  });
});
