import {test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of languages', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyLanguagesCount(46);
});

test('Verify Ukrainian language exist', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyLanguageExist("Українська");
});