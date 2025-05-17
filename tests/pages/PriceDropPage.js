import {BasePage} from "./BasePage";

export class PriceDropPage extends BasePage {
    constructor(page) {
        super(page);
    }

    productPriceSelector = '.price';
    productRegularPriceSelector = '.regular-price';
    productPriceDiscountSelector = '.product-flag.discount';

    getProducts() {
        return this.iframeLocator.locator('//div[@class=\'js-product product col-xs-12 col-sm-6 col-xl-4\']');
    }
}