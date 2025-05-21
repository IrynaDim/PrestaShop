import {ShoppingCartPage} from "../pages/ShoppingCartPage";

export class ShoppingCartSteps {
    constructor(page) {
        this.cartPage = new ShoppingCartPage(page);
    }

    async clickProceedToCheckOut() {
        const button = this.cartPage.getProceedToCheckOutButton();
        await button.click();
    }
}
