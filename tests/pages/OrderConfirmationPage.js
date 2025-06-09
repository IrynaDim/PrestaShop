import {BasePage} from "./BasePage";

export class OrderConfirmationPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getConfirmationMessage() {
        return this.iframeLocator.locator('h3.h1.card-title');
    }

    getSubtotalText() {
        return this.iframeLocator.locator('div.order-confirmation-table td:text("Subtotal") + td');
    }

    getShippingText() {
        return this.iframeLocator.locator('div.order-confirmation-table td:text("Shipping and handling") + td');
    }

    getTotalText() {
        return this.iframeLocator.locator('div.order-confirmation-table tr.total-value td:last-child');
    }
}