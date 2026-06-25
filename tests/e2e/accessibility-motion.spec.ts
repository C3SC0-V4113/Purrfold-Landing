import { expect, test } from '@playwright/test';

test('keeps primary navigation keyboard reachable with visible focus', async ({ page }) => {
  await page.goto('/en');

  await page.keyboard.press('Tab');

  const homeLink = page.getByRole('link', { name: 'Purrfold' });
  await expect(homeLink).toBeFocused();
  await expect(homeLink).toHaveCSS('outline-style', 'auto');
});

test('removes project-owned entrance and interaction motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');

  expect(
    await page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  ).toBe(true);

  const hero = page.locator('.animate-shell-enter-up').first();
  const button = page.locator('.animate-button-press').first();
  const card = page.locator('.animate-card-lift').first();

  await expect(hero).toHaveCSS('animation-name', 'none');
  await expect(button).toHaveCSS('transition-duration', '0s');
  await expect(card).toHaveCSS('transition-duration', '0s');
});
