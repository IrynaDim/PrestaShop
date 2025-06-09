import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of popular products', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    let products;
    await test.step('Get list of popular products', async () => {
        products = await mainPageSteps.getPopularProductsInfo();
        expect(products.length).toBe(8);
    });

    await test.step('Validate product titles and prices', async () => {
        for (const product of products) {
            expect(product.title).not.toBe('');
            expect(product.price).toBeGreaterThan(0);
        }
    });
});
