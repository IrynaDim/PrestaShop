import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of languages', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Verify number of available languages', async () => {
        const languages = await mainPageSteps.getLanguagesList();
        expect(languages.length).toBe(46);
    });
});

test('Verify Ukrainian language exists', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Check that Ukrainian is in language list', async () => {
        const languages = await mainPageSteps.getLanguagesList();
        expect(languages).toContain("Українська");
    });
});
