import {CartPopUpPage} from "../pages/CartPopUpPage";

export class CartPopUpSteps {
    constructor(page) {
        this.popupPage = new CartPopUpPage(page);
    }

    async getProductPaperType() {
        return (await this.popupPage.getPaperType().textContent())?.trim();
    }

    async getProductQuantity() {
        return (await this.popupPage.getProductQuantity().textContent())?.trim();
    }

    async getSubTotal() {
        return (await this.popupPage.getSubtotalPrice().textContent())?.trim();
    }

    async getPopUpText() {
        return (await this.popupPage.getPopUpTitle().textContent())?.replace(/[^\x20-\x7E]/g, '').trim();
    }
}
