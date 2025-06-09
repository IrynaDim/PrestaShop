import {PriceDropPage} from '../pages/PriceDropPage';
import {PriceParser} from '../util/PriceParser';

export class PriceDropPageSteps {
    constructor(page) {
        this.priceDropPage = new PriceDropPage(page);
    }

    async getPriceDropProducts() {
        const products = this.priceDropPage.getProducts();
        await products.first().waitFor({ timeout: 10000 });
        const count = await products.count();

        const result = [];

        for (let i = 0; i < count; i++) {
            const item = products.nth(i);

            const rawOldPrice = await item.locator(this.priceDropPage.productRegularPriceSelector).textContent();
            const rawNewPrice = await item.locator(this.priceDropPage.productPriceSelector).textContent();
            const rawDiscount = await item.locator(this.priceDropPage.productPriceDiscountSelector).textContent();

            const oldPrice = PriceParser.parse(rawOldPrice);
            const newPrice = PriceParser.parse(rawNewPrice);
            const discount = PriceParser.parseDiscount(rawDiscount);

            result.push({ oldPrice, newPrice, discount });
        }

        return result;
    }
}
