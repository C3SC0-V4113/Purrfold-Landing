import { expect, test } from '@playwright/test';

test('toggles boolean flags and updates the CLI output', async ({ page }) => {
  await page.goto('/en/install');

  const output = page.getByText(
    'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
  );

  await expect(output).toBeVisible();

  await page.getByRole('button', { name: 'Configure flags' }).click();

  await page.getByRole('checkbox', { name: 'E2E tests (Playwright)' }).click();

  await expect(
    page.getByText(
      'npx purrfold@latest <project-directory> --unit --e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
    )
  ).toBeVisible();
  await expect(output).toBeHidden();
});

test('selects package manager from the configurator', async ({ page }) => {
  await page.goto('/en/install');

  await page.getByRole('button', { name: 'Configure flags' }).click();

  await page.getByRole('combobox', { name: 'Package manager' }).click();
  await page.getByRole('option', { name: 'pnpm' }).click();

  await expect(
    page.getByText(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --pm pnpm --shadcn-args --preset b0'
    )
  ).toBeVisible();
});

test('appends a preset ID to the generated command', async ({ page, browserName }) => {
  // eslint-disable-next-line playwright/no-skipped-test -- WebKit does not propagate fill events to the base-ui Input primitive in this environment.
  test.skip(
    browserName === 'webkit',
    'WebKit does not propagate fill events to the base-ui Input primitive in this environment'
  );

  await page.goto('/en/install');

  await page.getByRole('button', { name: 'Configure flags' }).click();

  const presetInput = page.getByRole('textbox', { name: 'shadcn preset ID' });

  await presetInput.fill('b3REw8vwo');
  await presetInput.press('Tab');

  await expect(
    page.getByText(
      'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b3REw8vwo'
    )
  ).toBeVisible();
});

test('switches to the Agent tab and preserves flag selections', async ({ page }) => {
  await page.goto('/en/install');

  await page.getByRole('button', { name: 'Configure flags' }).click();

  await page.getByRole('checkbox', { name: 'E2E tests (Playwright)' }).click();
  await page.getByRole('tab', { name: 'Agent' }).click();

  await expect(page.getByText('I want to scaffold a new Next.js app with purrfold.')).toBeVisible();
  await expect(page.getByRole('checkbox', { name: 'E2E tests (Playwright)' })).toBeChecked();

  await page.getByRole('tab', { name: 'CLI' }).click();

  await expect(
    page.getByText(
      'npx purrfold@latest <project-directory> --unit --e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
    )
  ).toBeVisible();
});

test('copies the generated output to the clipboard', async ({ page, context, browserName }) => {
  // eslint-disable-next-line playwright/no-skipped-test -- Clipboard permissions are only reliably available in Chromium.
  test.skip(browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');

  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/install');

  await page.getByRole('button', { name: 'Copy' }).first().click();

  const clipboardText = await page.evaluate(async () => navigator.clipboard.readText());
  expect(clipboardText).toBe(
    'npx purrfold@latest <project-directory> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
  );
});

test('renders the Spanish install page with localized content', async ({ page }) => {
  await page.goto('/es/install');

  await expect(page.getByRole('heading', { level: 1, name: 'Instalar Purrfold' })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Agente' })).toBeVisible();
  await expect(page.getByText('Configura tu instalación')).toBeVisible();
  await expect(page.getByText('Todos los flags disponibles')).toBeVisible();
  await expect(page.getByText('Usar un preset de shadcn')).toBeVisible();
  await expect(
    page.getByText(
      'npx purrfold@latest <directorio-del-proyecto> --unit --no-e2e --no-commitlint --no-mcp --yes --shadcn-args --preset b0'
    )
  ).toBeVisible();
});
