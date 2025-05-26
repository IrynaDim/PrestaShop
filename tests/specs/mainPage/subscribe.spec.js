import { test, expect } from '@playwright/test';
import { MainPageSteps } from '../../steps/MainPageSteps';

test('Check latest news text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Verify newsletter label text', async () => {
        const labelText = await mainPageSteps.getNewsletterLabelText();
        expect(labelText?.trim()).toBe('Get our latest news and special sales');
    });
});

test('Check unsubscribe text', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Verify unsubscribe info text', async () => {
        const unsubscribeText = await mainPageSteps.getUnsubscribeText();
        expect(unsubscribeText?.trim()).toBe(
            'You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.'
        );
    });
});

test('Check subscribe button text is visually uppercase', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Verify subscribe button text-transform is uppercase', async () => {
        const textTransform = await mainPageSteps.getSubscribeButtonTextTransform();
        expect(textTransform).toBe('uppercase');
    });
});
