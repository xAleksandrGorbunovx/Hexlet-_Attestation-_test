import { test, expect } from '@playwright/test';
import { pages, pageText } from './routes.js';

const contact = pages.find(p => p.key === 'contact');

test.describe('страница Contact', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(contact.url);
  });

  test('отображает заголовок Contact и текст', async ({ page }) => {
    await expect(page).toHaveTitle('Contact');
    await expect(page.locator('h1')).toHaveText('Contact');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('p')).toHaveText(pageText.contact);
  });

  test('переход по ссылке Home - index.html', async ({ page }) => {
    await page.click('a[href="index.html"]');
    await expect(page).toHaveURL(/index\.html$/);
    await expect(page).toHaveTitle('Home');
    await expect(page.locator('h1')).toHaveText('Home');
    await expect(page.locator('p')).toHaveText(pageText.home);
  });

  test('переход по ссылке About - about.html', async ({ page }) => {
    await page.goto(contact.url);
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page).toHaveTitle('About');
    await expect(page.locator('h1')).toHaveText('About');
    await expect(page.locator('p')).toHaveText(pageText.about);
  });
});