import { expect, test } from '@playwright/test';

test('switches between CLI and Agent tabs on the English home', async ({ page }) => {
  await page.goto('/en');

  const agentTab = page.getByRole('tab', { name: 'Agent' });
  const cliCommand = page.getByText('npx purrfold@latest <project-directory>');
  const agentPrompt = page.getByText(
    'I want to scaffold a new Next.js app with purrfold. Run `npx purrfold@latest my-app --yes --unit --e2e --commitlint --mcp` to set up the project with quality gates, testing, and agent skills. After scaffolding, run `npm run check` to verify everything works.'
  );

  await expect(cliCommand).toBeVisible();
  await expect(agentPrompt).toBeHidden();

  await agentTab.click();

  await expect(agentPrompt).toBeVisible();
  await expect(cliCommand).toBeHidden();
});

test('copies the active tab content to the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en');

  const copyButton = page.getByRole('button', { name: 'Copy' }).first();
  await copyButton.click();

  const clipboardText = await page.evaluate(async () => navigator.clipboard.readText());
  expect(clipboardText).toBe('npx purrfold@latest <project-directory>');

  await page.getByRole('tab', { name: 'Agent' }).click();
  await page.getByRole('button', { name: 'Copy' }).first().click();

  const agentClipboardText = await page.evaluate(async () => navigator.clipboard.readText());
  expect(agentClipboardText).toContain('I want to scaffold a new Next.js app with purrfold');
});

test('summary cards link to localized deep routes', async ({ page }) => {
  await page.goto('/en');

  const main = page.locator('main');
  await expect(main.getByRole('link', { name: /^Install\b/i })).toHaveAttribute(
    'href',
    '/en/install'
  );
  await expect(main.getByRole('link', { name: /^View skills\b/i })).toHaveAttribute(
    'href',
    '/en/skills'
  );
  await expect(main.getByRole('link', { name: /^Quality pipeline\b/i })).toHaveAttribute(
    'href',
    '/en/quality'
  );
  await expect(main.getByRole('link', { name: /^Explore ecosystem\b/i })).toHaveAttribute(
    'href',
    '/en/ecosystem'
  );
});

test('renders bilingual Spanish hub content', async ({ page }) => {
  await page.goto('/es');

  await expect(
    page.getByRole('heading', { level: 1, name: 'La base sólida para proyectos con agentes' })
  ).toBeVisible();
  await expect(page.getByRole('tab', { name: 'Agente' })).toBeVisible();
  await expect(page.getByText('npx purrfold@latest <directorio-del-proyecto>')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hoja de ruta' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bases' })).toBeVisible();
});
