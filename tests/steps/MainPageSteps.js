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