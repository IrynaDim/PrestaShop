import {test, expect} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of languages', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const languages = await mainPageSteps.getLanguagesList();
    expect(languages.length).toBe(46);
});

test('Verify Ukrainian language exist', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const languages = await mainPageSteps.getLanguagesList();
    expect(languages).toContain("Українська");
});