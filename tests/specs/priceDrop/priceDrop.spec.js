import {test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {PriceDropPageSteps} from "../../steps/PriceDropSteps";

test('Check price drop items', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    const priceDropPageSteps = new PriceDropPageSteps(page);

    await mainPageSteps.openMainPage();
    await mainPageSteps.goToPriceDropPage();

    await priceDropPageSteps.verifyProducts();
});