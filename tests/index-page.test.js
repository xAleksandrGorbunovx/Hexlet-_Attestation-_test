import { test, expect } from '@playwright/test';
import { pages, pageText } from './routes.js';

const home = pages.find(p => p.key === 'home');

test.describe('главная страница (index)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(home.url);
  });

  test('отображает заголовок Home и текст', async ({ page }) => {
    await expect(page).toHaveTitle('Home');
    await expect(page.locator('h1')).toHaveText('Home');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('p')).toHaveText(pageText.home);
  });

  test('переход по ссылке About - about.html', async ({ page }) => {
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL(/about\.html$/);
    await expect(page).toHaveTitle('About');
    await expect(page.locator('h1')).toHaveText('About');
    await expect(page.locator('p')).toHaveText(pageText.about);
  });

  test('переход по ссылке Contact - contact.html', async ({ page }) => {
    await page.goto(home.url); // возвращаемся
    await page.click('a[href="contact.html"]');
    await expect(page).toHaveURL(/contact\.html$/);
    await expect(page).toHaveTitle('Contact');
    await expect(page.locator('h1')).toHaveText('Contact');
    await expect(page.locator('p')).toHaveText(pageText.contact);
  });
});