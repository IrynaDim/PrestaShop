import { test, expect } from '@playwright/test';
import { MainPageSteps } from '../../steps/MainPageSteps';
import { PriceDropPageSteps } from '../../steps/PriceDropSteps';

test('Check price drop items', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    const priceDropPageSteps = new PriceDropPageSteps(page);

    await mainPageSteps.openMainPage();
    await mainPageSteps.goToPriceDropPage();

    const products = await priceDropPageSteps.getPriceDropProducts();

    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
        const { oldPrice, newPrice, discount } = product;

        expect(oldPrice).toBeGreaterThan(0);
        expect(newPrice).toBeGreaterThan(0);

        const expectedPrice = oldPrice * (100 - discount) / 100;

        expect(newPrice).toBeCloseTo(expectedPrice, 2);
    }
});
