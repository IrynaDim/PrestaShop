import {MainPage} from '../pages/MainPage';
import {PriceParser} from '../util/PriceParser';

export class MainPageSteps {
    constructor(page) {
        this.mainPage = new MainPage(page);
    }

    async openMainPage() {
        await this.mainPage.goto();
    }

    async openLanguageDropdown() {
        await this.mainPage.clickLanguageButton();
    }

    async goToPriceDropPage() {
        const link = this.mainPage.getPriceDropButton();
        await link.click();
    }

    async goToAllProductsPage() {
        const link = this.mainPage.getAllProductsButton();
        await link.first().click();
    }

    async goToSignInScreen() {
        await this.mainPage.clickSignInButton();
    }

    async insertTextToSearchFieldAndPressEnter(productName) {
        const searchField = this.mainPage.getProductSearchField();
        await searchField.fill(productName);
        await searchField.press('Enter');
    }

    async getDropDownMenuItems(categoryName) {
        const category = await this.mainPage.getMenuItems(categoryName);
        await category.hover();
        const submenuItems = await this.mainPage.getSubMenuItems(categoryName);
        const texts = await submenuItems.allTextContents();
        return texts.map(t => t.trim());
    }

    async getPopularProductsInfo() {
        const products = this.mainPage.getPopularProducts();
        await products.first().waitFor({timeout: 10000});
        const count = await products.count();

        const result = [];
        for (let i = 0; i < count; i++) {
            const item = products.nth(i);
            const title = await item.locator(this.mainPage.productTitleSelector).textContent();
            const rawPrice = await item.locator(this.mainPage.productPriceSelector).textContent();
            const price = PriceParser.parse(rawPrice);
            result.push({ title: title?.trim(), price });
        }

        return result;
    }

    async getLanguagesList() {
        await this.openLanguageDropdown();
        const languages = await this.mainPage.getLanguages();
        const texts = await languages.allTextContents();
        return texts.map(text => text.trim());
    }

    async getNewsletterLabelText() {
        const label = await this.mainPage.getNewsletterLabel();
        return label.textContent();
    }

    async getUnsubscribeText() {
        const text = await this.mainPage.getUnsubscribeText();
        return text.textContent();
    }

    async getSubscribeButtonTextTransform() {
        const button = await this.mainPage.getSubscribeButton();
        return button.evaluate(el => getComputedStyle(el).textTransform);
    }
}
