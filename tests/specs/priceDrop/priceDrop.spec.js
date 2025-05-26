import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {PriceDropPageSteps} from '../../steps/PriceDropSteps';

test('Check price drop items', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    const priceDropPageSteps = new PriceDropPageSteps(page);

    await test.step('Open main page and navigate to Price Drop section', async () => {
        await mainPageSteps.openMainPage();
        await mainPageSteps.goToPriceDropPage();
    });

    let products;
    await test.step('Get list of discounted products', async () => {
        products = await priceDropPageSteps.getPriceDropProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    await test.step('Validate old price, new price and discount for each product', async () => {
        for (const product of products) {
            const {oldPrice, newPrice, discount} = product;

            expect(oldPrice).toBeGreaterThan(0);
            expect(newPrice).toBeGreaterThan(0);

            const expectedPrice = oldPrice * (100 - discount) / 100;
            expect(newPrice).toBeCloseTo(expectedPrice, 2);
        }
    });
});
