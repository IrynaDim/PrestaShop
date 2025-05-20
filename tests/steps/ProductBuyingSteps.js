import {ProductBuyingPage} from "../pages/ProductBuyingPage";

export class ProductBuyingSteps {
    constructor(page) {
        this.buyingPage = new ProductBuyingPage(page);
    }

    async addItemToCart(type, color, amount) {
        if (type) {
            const dropMenu = this.buyingPage.getPaperTypeDropMenu();
            await dropMenu.selectOption({label: type});
        }

        if (color) {
            const colorOption = this.buyingPage.getColorOptionByName(color);
            await colorOption.click();
        }

        const quantityField = this.buyingPage.getQuantityField();
        await quantityField.fill(amount.toString());

        const addToCartButton = this.buyingPage.getAddToCartButton();
        await addToCartButton.click();
    }
}
