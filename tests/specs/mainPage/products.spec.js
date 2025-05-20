import {test, expect} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check amount of popular products', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const products = await mainPageSteps.getPopularProductsInfo();

    expect(products.length).toBe(8);

    for (const product of products) {
        expect(product.title).not.toBe('');
        expect(product.price).toBeGreaterThan(0);
    }
});