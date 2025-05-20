import {AllProductsPage} from '../pages/AllProductsPage';
import {PriceParser} from '../util/PriceParser';
import {expect} from '@playwright/test';

export class AllProductsSteps {
    constructor(page) {
        this.productsPage = new AllProductsPage(page);
    }

    async getProductsBySorting(sortBy) {

        await this.productsPage.clickSortByDropSection();

        const option = this.productsPage.getSortOptionByName(sortBy);
        await expect(option).toBeVisible({timeout: 10000});

        const productsLocator = this.productsPage.getProductItems();

        await option.click();

        // Wait until sorting is done.
        await expect(this.productsPage.getSortByDropSection()).toContainText(sortBy);

        const count = await productsLocator.count();
        const products = [];

        for (let i = 0; i < count; i++) {
            const item = productsLocator.nth(i);

            const rawTitle = await item.locator(this.productsPage.productTitleSelector).textContent();

            // Checking whether product has regular price before discount
            const hasDiscount = await item.locator(this.productsPage.productRegularPriceSelector).count() > 0;
            const rawPrice = await (hasDiscount
                    ? item.locator('.regular-price')
                    : item.locator(this.productsPage.productPriceSelector)
            ).textContent();

            const title = rawTitle?.trim();
            const price = PriceParser.parse(rawPrice);

            products.push({title, price});
        }

        return products;
    }
}