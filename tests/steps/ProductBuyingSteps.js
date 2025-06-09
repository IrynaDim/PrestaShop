import {ProductBuyingPage} from "../pages/ProductBuyingPage";
import {expect} from "@playwright/test";

export class ProductBuyingSteps {
    constructor(page) {
        this.buyingPage = new ProductBuyingPage(page);
    }

    async addItemToCart({ type, color, customization, quantity, size}) {
        if (type) {
            await this.buyingPage.getPaperTypeDropMenu().selectOption({ label: type });
        }

        if (color) {
            await this.buyingPage.getColorOptionByName(color).click();
        }

        if (customization) {
            await this.buyingPage.getCustomizationField().fill(customization.toString());
            await this.buyingPage.getSaveCustomizationButton().click();

            const messageLocator = this.buyingPage.getCustomizationConfirmation();
            await expect(messageLocator).toContainText(`Your customization: ${customization}`);
        }

        if (size) {
            await this.buyingPage.getSizeDropMenu().selectOption({ label: size });
        }

        if (quantity) {
            await this.buyingPage.getQuantityField().fill(quantity.toString());
        }

        await this.buyingPage.getAddToCartButton().click();
    }

    async insertTextToSearchFieldAndPressEnter(productName) {
        const searchField = this.buyingPage.getProductSearchField();
        await searchField.fill(productName);
        await searchField.press('Enter');
    }
}
