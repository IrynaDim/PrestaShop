import {BasePage} from "./BasePage";

export class SignUpPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getErrorMessages() {
        return this.iframeLocator.locator('.alert.alert-danger');
    }

    getFirstNameField() {
        return this.iframeLocator.locator('#field-firstname');
    }

    getLastNameField() {
        return this.iframeLocator.locator('#field-lastname');
    }

    getEmailField() {
        return this.iframeLocator.locator('#field-email');
    }

    getPasswordField() {
        return this.iframeLocator.locator('#field-password');
    }

    getBirthdateField() {
        return this.iframeLocator.locator('#field-birthday');
    }

    getOffersCheckbox() {
        return this.iframeLocator.locator('input[name="optin"]');
    }

    getCustomerDataPrivacyCheckbox() {
        return this.iframeLocator.locator('input[name="customer_privacy"]');
    }

    getTermsCheckbox() {
        return this.iframeLocator.locator('input[name="psgdpr"]');
    }

    getSaveButton() {
        return this.iframeLocator.locator('button[data-link-action="save-customer"]');
    }

    async fillFirstName(value) {
        await this.getFirstNameField().fill(value);
    }

    async fillLastName(value) {
        await this.getLastNameField().fill(value);
    }

    async fillEmail(value) {
        await this.getEmailField().fill(value);
    }

    async fillPassword(value) {
        await this.getPasswordField().fill(value);
    }

    async fillBirthdate(value) {
        await this.getBirthdateField().fill(value);
    }

    async checkOffers() {
        await this.getOffersCheckbox().check();
    }

    async checkCustomerDataPrivacy() {
        await this.getCustomerDataPrivacyCheckbox().check();
    }

    async checkTerms() {
        await this.getTermsCheckbox().check();
    }

    async submitForm() {
        await this.getSaveButton().click();
    }

    getGenderMrRadio() {
        return this.iframeLocator.locator('#field-id_gender-1');
    }

    getGenderMrsRadio() {
        return this.iframeLocator.locator('#field-id_gender-2');
    }

    async selectGender(gender) {
        if (gender === 'Mr') {
            await this.getGenderMrRadio().check();
        } else if (gender === 'Mrs') {
            await this.getGenderMrsRadio().check();
        } else {
            throw new Error(`Unknown gender: ${gender}`);
        }
    }
}