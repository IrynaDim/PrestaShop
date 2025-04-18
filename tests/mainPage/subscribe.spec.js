import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/MainPage';

test('Check latest news text', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    const label = await mainPage.getNewsletterLabel();
    await expect(label).toHaveText('Get our latest news and special sales');
});

test('Check unsubscribe text', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();
    const text = await mainPage.getUnsubscribeText();
    await expect(text).toHaveText('You may unsubscribe at any moment. ' +
        'For that purpose, please find our contact info in the legal notice.');
});

test('Check subscribe button text is visually uppercase', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.goto();

    const button = await mainPage.getSubscribeButton();

    const textTransform = await button.evaluate(el => getComputedStyle(el).textTransform);
    expect(textTransform).toBe('uppercase');
});