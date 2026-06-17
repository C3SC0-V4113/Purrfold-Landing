import { expect, test } from '@playwright/test';

test('redirects Spanish root traffic to /es', async ({ page, request }) => {
  const response = await request.get('/', {
    headers: { 'accept-language': 'es-ES,es;q=0.9' },
    maxRedirects: 0,
  });

  expect(response.headers().location).toBe('/es');

  await page.goto('/es');
  await expect(
    page.getByRole('heading', { level: 1, name: 'La base sólida para proyectos con agentes' })
  ).toBeVisible();
});

test('defaults unsupported root traffic to /en', async ({ page, request }) => {
  const response = await request.get('/', {
    headers: { 'accept-language': 'fr-FR,fr;q=0.9' },
    maxRedirects: 0,
  });

  expect(response.headers().location).toBe('/en');

  await page.goto('/en');
  await expect(
    page.getByRole('heading', { level: 1, name: 'The solid foundation for agent-driven projects' })
  ).toBeVisible();
});

test('renders localized navigation on /en and /es', async ({ page }) => {
  const englishNav = page.getByRole('navigation', { name: 'Primary navigation' });

  await page.goto('/en');
  await expect(englishNav.getByRole('link', { exact: true, name: 'Install' })).toHaveAttribute(
    'href',
    '/en/install'
  );
  await expect(englishNav.getByRole('link', { exact: true, name: 'Quality' })).toHaveAttribute(
    'href',
    '/en/quality'
  );

  const spanishNav = page.getByRole('navigation', { name: 'Navegación principal' });
  await page.goto('/es');
  await expect(spanishNav.getByRole('link', { exact: true, name: 'Instalación' })).toHaveAttribute(
    'href',
    '/es/install'
  );
  await expect(spanishNav.getByRole('link', { exact: true, name: 'Calidad' })).toHaveAttribute(
    'href',
    '/es/quality'
  );
});

test('preserves the deep route when switching locales', async ({ page }) => {
  await page.goto('/es/install');

  await page.getByRole('button', { name: 'Cambiar tema' }).first().click();
  const dropdown = page.getByRole('menu');
  await dropdown.getByRole('menuitemradio', { name: 'Claro' }).click();

  await page.getByRole('button', { name: 'Idioma' }).click();
  await page.getByRole('menuitemradio', { name: 'English' }).click();
  await expect(page).toHaveURL(/\/en\/install$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Install Purrfold' })).toBeVisible();
});

test('falls back unsupported locale paths to English while preserving the path', async ({
  page,
}) => {
  await page.goto('/fr/install');

  await expect(page).toHaveURL(/\/en\/install$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Install Purrfold' })).toBeVisible();
});
