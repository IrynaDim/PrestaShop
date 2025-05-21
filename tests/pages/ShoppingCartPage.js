import {BasePage} from "./BasePage";

export class ShoppingCartPage extends BasePage {

    constructor(page) {
        super(page);
    }

    getProceedToCheckOutButton() {
        return this.iframeLocator
            .locator('.cart-detailed-actions')
            .getByRole('link', {name: 'Proceed to checkout'});
    }
}
