import { test, expect } from '@playwright/test';
import { pages, pageText } from './routes.js';

async function checkPage(page, route) {
  await expect(page).toHaveTitle(route.title);
  await expect(page.locator('h1')).toHaveText(route.title);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('p')).toHaveText(pageText[route.key]);
}

for (const from of pages) {
  test.describe(`С ${from.title} - другие страницы`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(from.url);
    });

    test('текущая страница отображается корректно', async ({ page }) => {
      await checkPage(page, from);
    });

    for (const to of pages) {
      if (to.key === from.key) continue;

      test(`переход → ${to.title}`, async ({ page }) => {
        await page.click(`a[href="${to.href}"]`);
        await expect(page).toHaveURL(`/${to.href}`);
        await checkPage(page, to);
        await page.goBack();
        await expect(page).toHaveURL(from.url);
      });
    }
  });
}