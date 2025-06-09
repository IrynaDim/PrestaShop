import {BasePage} from "./BasePage";

export class SearchResultsPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getAllProductItems() {
        return this.iframeLocator.locator('article.product-miniature');
    }

    getProductTitle(productItem) {
        return productItem.locator('h2.h3.product-title > a');
    }

    getProductByTitle(title) {
        return this.iframeLocator.locator('h2.h3.product-title > a', {hasText: title});
    }

    getProductByIndex(index) {
        return this.getAllProductItems().nth(index);
    }
}
