import { test, expect } from '@playwright/test';
import { MainPageSteps } from '../../steps/MainPageSteps';

test('Check latest news text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const labelText = await mainPageSteps.getNewsletterLabelText();
    expect(labelText?.trim()).toBe('Get our latest news and special sales');
});

test('Check unsubscribe text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const unsubscribeText = await mainPageSteps.getUnsubscribeText();
    expect(unsubscribeText?.trim()).toBe(
        'You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.'
    );
});

test('Check subscribe button text is visually uppercase', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const textTransform = await mainPageSteps.getSubscribeButtonTextTransform();
    expect(textTransform).toBe('uppercase');
});
