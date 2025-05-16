import { test } from '@playwright/test';
import { MainPageSteps } from '../../steps/MainPageSteps';

test('Check latest news text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyNewsletterLabel();
});

test('Check unsubscribe text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyUnsubscribeText();
});

test('Check subscribe button text is visually uppercase', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifySubscribeButtonIsUppercase();
});
