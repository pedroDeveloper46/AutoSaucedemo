import { test, expect } from '@playwright/test';

test('Testando Título Facebook', async ({ page }) => {
  await page.goto('https://www.facebook.com/?locale=pt_BR');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Facebook/);
});