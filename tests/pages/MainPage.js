import {BasePage} from "./BasePage";

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
    }

    productTitleSelector = '.product-title';
    productPriceSelector = '.price';

    async goto() {
        await this.page.goto('https://demo.prestashop.com/#/en/front');
        await this.iframeLocator.locator('body').waitFor({timeout: 15000});
    }

    getNewsletterLabel() {
        return this.iframeLocator.locator('#block-newsletter-label');
    }

    getUnsubscribeText() {
        return this.iframeLocator.getByText('You may unsubscribe at any');
    }

    getProductSearchField() {
        return this.iframeLocator.locator('.ui-autocomplete-input');
    }

    getPriceDropButton() {
        return this.iframeLocator.locator('a.cms-page-link[href*="prices-drop"]');
    }

    getSubscribeButton() {
        return this.iframeLocator.locator('input[name="submitNewsletter"]:visible');
    }

    async clickLanguageButton() {
        const button = this.iframeLocator.getByRole('button', {name: 'Language dropdown'});
        await button.click();
    }

    async clickSignInButton() {
        const button = this.iframeLocator.locator('div.user-info a');
        await button.click();
    }

    getLanguages() {
        return this.iframeLocator.locator('ul[aria-labelledby="language-selector-label"] >> li');
    }

    getAllProductsButton() {
        return this.iframeLocator.locator('.all-product-link');
    }

    getPopularProducts() {
        return this.iframeLocator.locator(
            'xpath=//div[contains(@class, "products") and contains(@class, "row")]//article[contains(@class, "product-miniature")]'
        );
    }

    getMenuItems(categoryName) {
        return this.iframeLocator.getByRole('link', {name: categoryName});
    }

    getSubMenuItems(categoryName) {
        return this.iframeLocator
            .locator('a.dropdown-item', {hasText: categoryName})
            .locator('..')
            .locator('ul.top-menu > li.category > a.dropdown-item.dropdown-submenu');
    }
}
