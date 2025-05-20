import {PriceDropPage} from '../pages/PriceDropPage';
import {expect} from '@playwright/test';
import {PriceParser} from '../util/PriceParser';

export class PriceDropPageSteps {
    constructor(page) {
        this.priceDropPage = new PriceDropPage(page);
    }

    async verifyProducts() {
        const products = this.priceDropPage.getProducts();
        await expect(products.first()).toBeVisible({timeout: 100000});
        const count = await products.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const item = products.nth(i);

            const rawOldPrice = await item.locator(this.priceDropPage.productRegularPriceSelector).textContent();
            const rawNewPrice = await item.locator(this.priceDropPage.productPriceSelector).textContent();
            const oldPrice = PriceParser.parse(rawOldPrice);
            const newPrice = PriceParser.parse(rawNewPrice);
            const rawDiscount = await item.locator(this.priceDropPage.productPriceDiscountSelector).textContent();
            const discount = PriceParser.parse(rawDiscount);

            expect(oldPrice).toBeGreaterThan(0);
            expect(newPrice).toBeGreaterThan(0);
            const calculatedPrice = oldPrice * (100 - discount) / 100;
            expect(newPrice).toBeCloseTo(calculatedPrice, 2);
        }
    }
}