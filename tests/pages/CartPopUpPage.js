import {BasePage} from "./BasePage";

export class CartPopUpPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getPaperType() {
        return this.iframeLocator.locator('.paper.type strong');
    }

    getProductQuantity() {
        return this.iframeLocator.locator('.product-quantity strong');
    }

    getSubtotalPrice() {
        return this.iframeLocator.locator('span.subtotal.value');
    }

    getPopUpTitle() {
        return this.iframeLocator.locator('h4.modal-title');
    }

    getContinueShoppingButton() {
        return this.iframeLocator.locator('div.cart-content-btn >> button.btn-secondary');
    }

    getProceedToCheckOutButton() {
        return this.iframeLocator.locator('div.cart-content-btn >> a.btn-primary');
    }
}
