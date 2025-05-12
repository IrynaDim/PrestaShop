export class SignInPage {
    constructor(page) {
        this.page = page;
        this.iframeLocator = page.frameLocator('iframe[name="framelive"]');
    }

    async clickSignUpButton() {
        await this.iframeLocator.locator('a[data-link-action="display-register-form"]').click();
    }
}