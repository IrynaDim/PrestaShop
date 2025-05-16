import {test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check drop down sub menu items', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyDropDownMenu(['Men', 'Women'], 'CLOtHES');
    await mainPageSteps.verifyDropDownMenu(['Stationery', 'Home Accessories'], 'ACCESSORIES');
    await mainPageSteps.verifyDropDownMenu([], 'ART');
});
