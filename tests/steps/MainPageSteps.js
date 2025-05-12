import {MainPage} from '../pages/MainPage';
import {expect} from '@playwright/test';

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

    async goToSignInScreen() {
        await this.mainPage.clickSignInButton();
    }

    async verifyDropDownMenu(expectedItems, categoryName) {
        const clothes = await this.mainPage.getMenuItems(categoryName);
        await clothes.hover();
        const submenuItems = await this.mainPage.getSubMenuItems(categoryName);
        const count = await submenuItems.count();
        expect(count).toBe(expectedItems.length);
        const texts = await submenuItems.allTextContents();
        const trimmedTexts = texts.map(t => t.trim());
        for (const expectedText of expectedItems) {
            expect(trimmedTexts).toContain(expectedText);
        }
    }

    async verifyPopularProducts(expected) {
        const products = this.mainPage.getPopularProducts();
        await products.first().waitFor({state: 'visible', timeout: 10000});
        const count = await products.count();
        expect(count).toBe(expected);
    }

    async verifyLanguagesCount(expectedCount) {
        await this.openLanguageDropdown();
        const languages = await this.mainPage.getLanguages();
        const count = await languages.count();
        expect(count).toBe(expectedCount);
    }

    async verifyLanguageExist(language) {
        await this.openLanguageDropdown();
        const languageElements = await this.mainPage.getLanguages();
        const rawTexts = await languageElements.allTextContents();
        const languageTexts = rawTexts.map(text => text.trim());
        expect(languageTexts).toContain(language);
    }

    async verifyNewsletterLabel(expectedText = 'Get our latest news and special sales') {
        const label = await this.mainPage.getNewsletterLabel();
        await expect(label).toHaveText(expectedText);
    }

    async verifyUnsubscribeText(expectedText = 'You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.') {
        const text = await this.mainPage.getUnsubscribeText();
        await expect(text).toHaveText(expectedText);
    }

    async verifySubscribeButtonIsUppercase() {
        await this.mainPage.page.pause();
        const button = await this.mainPage.getSubscribeButton();
        const textTransform = await button.evaluate(el => getComputedStyle(el).textTransform);
        expect(textTransform).toBe('uppercase');
    }
}