import {BasePage} from "./BasePage";

export class ProductBuyingPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getPaperTypeDropMenu() {
        return this.iframeLocator.locator('select.form-control-select'); // убрала пробел между классами
    }

    getPaperTypeItemByName(paperType) {
        return this.iframeLocator.locator('option', { hasText: paperType });
    }

    getColorOptionByName(colorName) {
        return this.iframeLocator.locator(`label[aria-label="${colorName}"]`);
    }

    getQuantityField() {
        return this.iframeLocator.locator('#quantity_wanted');
    }

    getAddToCartButton() {
        return this.iframeLocator.locator('button.add-to-cart');
    }
}
