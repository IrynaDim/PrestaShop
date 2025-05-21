import { OrderConfirmationPage } from "../pages/OrderConfirmationPage";
import { PriceParser } from "../util/PriceParser";

export class OrderConfirmationSteps {
    constructor(page) {
        this.page = page;
        this.confirmationPage = new OrderConfirmationPage(page);
    }

    async verifyConfirmationMessageAppears() {
        return await this.confirmationPage.getConfirmationMessage().textContent();
    }

    async getAmounts() {
        const subtotalText = await this.confirmationPage.getSubtotalText().textContent();
        const shippingText = await this.confirmationPage.getShippingText().textContent();
        const totalText = await this.confirmationPage.getTotalText().textContent();

        const subtotal = PriceParser.parse(subtotalText);
        const shipping = PriceParser.parse(shippingText);
        const total = PriceParser.parse(totalText);

        return { subtotal, shipping, total };
    }
}
