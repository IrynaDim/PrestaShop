import {BasePage} from "./BasePage";

export class AllProductsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    productTitleSelector = 'h2.h3.product-title > a';
    productPriceSelector = '.price';
    productRegularPriceSelector = '.regular-price';

    async clickSortByDropSection() {
        const button = this.iframeLocator.locator('.btn-unstyle.select-title');
        await button.click();
    }

    getSortByDropSection() {
        return this.iframeLocator.locator('.btn-unstyle.select-title');
    }

    getSortOptionByName(text) {
        return this.iframeLocator.locator('.select-list.js-search-link', {hasText: text});
    }

    getProductItems() {
        return this.iframeLocator.locator('article.product-miniature');
    }

    getProductTitle(productItem) {
        return productItem.locator(productTitleSelector);
    }

    getProductPrice(productItem) {
        return productItem.locator(productPriceSelector);
    }
}
