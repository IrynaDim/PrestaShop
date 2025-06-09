import {BasePage} from "./BasePage";

export class CompleteOrderPage extends BasePage {
    constructor(page) {
        super(page);
    }

    getGenderRadio(gender) {
        return this.iframeLocator.locator(`label[for="field-id_gender-${gender === 'Mrs' ? 2 : 1}"]`);
    }

    getFirstNameInput() {
        return this.iframeLocator.locator('#field-firstname');
    }

    getLastNameInput() {
        return this.iframeLocator.locator('#field-lastname');
    }

    getEmailInput() {
        return this.iframeLocator.getByLabel('Email');
    }

    getBirthdateInput() {
        return this.iframeLocator.locator('#field-birthday');
    }

    getPasswordInput() {
        return this.iframeLocator.locator('#field-password');
    }

    getDataPrivacyCheckbox() {
        return this.iframeLocator.locator('input[name="customer_privacy"]');
    }

    getTermsCheckbox() {
        return this.iframeLocator.locator('input[name="psgdpr"]');
    }

    getContinueButton() {
        return this.iframeLocator.locator('form#customer-form button[type="submit"]');
    }

    getCompanyInput() {
        return this.iframeLocator.locator('#field-company');
    }

    getVatInput() {
        return this.iframeLocator.locator('#field-vat_number');
    }

    getAddressInput() {
        return this.iframeLocator.locator('#field-address1');
    }

    getAddressComplementInput() {
        return this.iframeLocator.locator('#field-address2');
    }

    getZipInput() {
        return this.iframeLocator.locator('#field-postcode');
    }

    getCityInput() {
        return this.iframeLocator.locator('#field-city');
    }

    getPhoneInput() {
        return this.iframeLocator.locator('#field-phone');
    }

    getSameAddressCheckbox() {
        return this.iframeLocator.locator('#use_same_address');
    }

    getConfirmAddressButton() {
        return this.iframeLocator.locator('button[name="confirm-addresses"]')
    }

    getCountryMenu() {
        return this.iframeLocator.locator('#field-id_country');
    }

    getShippingOption(optionText) {
        return this.iframeLocator.locator('.delivery-option').filter({hasText: optionText}).locator('input[type="radio"]');
    }

    getConfirmDeliveryButton() {
        return this.iframeLocator.locator('button[name="confirmDeliveryOption"]');
    }

    getPaymentOption(optionText) {
        return this.iframeLocator.locator(`label:has-text("${optionText}")`);
    }

    getPaymentOptionTermsCheckbox() {
        return this.iframeLocator.locator('input[name^="conditions_to_approve"]');
    }

    getPlaceOrderButton() {
        return this.iframeLocator.locator('button[type="submit"]:has-text("Place order")');
    }

    getSubtotalText() {
        return this.iframeLocator.locator('#cart-subtotal-products .value').textContent();
    }

    getShippingText() {
        return this.iframeLocator.locator('#cart-subtotal-shipping .value').textContent();
    }

    getTotalText() {
        return this.iframeLocator.locator('.cart-summary-line.cart-total .value').textContent();
    }

}
