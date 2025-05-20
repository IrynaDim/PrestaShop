import {ProductBuyingPage} from "../pages/ProductBuyingPage";

export class ProductBuyingSteps {
    constructor(page) {
        this.buyingPage = new ProductBuyingPage(page);
    }

    async addItemToCart({ type, color, quantity}) {
        if (type) {
            await this.buyingPage.getPaperTypeDropMenu().selectOption({ label: type });
        }

        if (color) {
            await this.buyingPage.getColorOptionByName(color).click();
        }

        if (quantity) {
            await this.buyingPage.getQuantityField().fill(quantity.toString());
        }

        await this.buyingPage.getAddToCartButton().click();
    }
}
