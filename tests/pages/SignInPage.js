import {BasePage} from "./BasePage";

export class SignInPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async clickSignUpButton() {
        await this.iframeLocator.locator('a[data-link-action="display-register-form"]').click();
    }
}
