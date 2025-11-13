import { test, expect } from '@playwright/test';
import { pages, pageText } from './routes.js';

const about = pages.find(p => p.key === 'about');

test.describe('Страница About', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(about.url);
  });

  test('отображает заголовок About и текст', async ({ page }) => {
    await expect(page).toHaveTitle('About');
    await expect(page.locator('h1')).toHaveText('About');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('p')).toHaveText(pageText.about);
  });

  test('переход по ссылке Home → index.html', async ({ page }) => {
    await page.click('a[href="index.html"]');
    await expect(page).toHaveURL(/index\.html$/);
    await expect(page).toHaveTitle('Home');
    await expect(page.locator('h1')).toHaveText('Home');
    await expect(page.locator('p')).toHaveText(pageText.home);
  });

  test('переход по ссылке Contact → contact.html', async ({ page }) => {
    await page.goto(about.url);
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page).toHaveTitle('Contact');
    await expect(page.locator('h1')).toHaveText('Contact');
    await expect(page.locator('p')).toHaveText(pageText.contact);
  });
});