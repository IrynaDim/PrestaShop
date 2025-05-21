import {BasePage} from "./BasePage";

export class ProductBuyingPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getPaperTypeDropMenu() {
        return this.iframeLocator.locator('select.form-control-select');
    }

    getSizeDropMenu() {
        return this.iframeLocator.locator('select.form-control.form-control-select');
    }

    getColorOptionByName(colorName) {
        return this.iframeLocator.locator(`label[aria-label="${colorName}"]`);
    }

    getQuantityField() {
        return this.iframeLocator.locator('#quantity_wanted');
    }

    getCustomizationField() {
        return this.iframeLocator.locator('#field-textField1');
    }

    getSaveCustomizationButton() {
        return this.iframeLocator.locator('button[name="submitCustomizedData"]');
    }

    getAddToCartButton() {
        return this.iframeLocator.locator('button.add-to-cart');
    }

    getCustomizationConfirmation() {
        return this.iframeLocator.locator('h6.customization-message');
    }

    getProductSearchField() {
        return this.iframeLocator.locator('.ui-autocomplete-input');
    }


}
