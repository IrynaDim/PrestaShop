import {PriceDropPage} from '../pages/PriceDropPage';
import {expect} from '@playwright/test';

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
            const oldPrice = parseFloat(rawOldPrice?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
            const newPrice = parseFloat(rawNewPrice?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
            const rawDiscount = await item.locator(this.priceDropPage.productPriceDiscountSelector).textContent();
            const discount = parseFloat(rawDiscount.replace(/[^\d.]/g, ''));

            expect(oldPrice).toBeGreaterThan(0);
            expect(newPrice).toBeGreaterThan(0);
            const calculatedPrice = oldPrice * (100 - discount) / 100;
            expect(newPrice).toBeCloseTo(calculatedPrice, 2);
        }
    }
}