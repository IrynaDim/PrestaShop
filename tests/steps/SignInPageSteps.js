import { SignInPage } from '../pages/SignInPage';

export class SignInPageSteps {
    constructor(page) {
        this.signInPage = new SignInPage(page);
    }

    async goToSignUpScreen() {
        await this.signInPage.clickSignUpButton();
    }
}