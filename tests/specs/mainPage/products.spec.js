import {test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of popular products', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.verifyPopularProducts(8);
});