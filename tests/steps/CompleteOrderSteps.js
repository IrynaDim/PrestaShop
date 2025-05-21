import {CompleteOrderPage} from "../pages/CompleteOrderPage";
import {PriceParser} from "../util/PriceParser";

export class CompleteOrderSteps {
    constructor(page) {
        this.orderPage = new CompleteOrderPage(page);
    }

    async fillPersonalInfo({
                               gender,
                               firstName,
                               lastName,
                               email,
                               birthdate,
                               password,
                               agreeDataPrivacy,
                               agreeTerms
                           }) {
        await this.orderPage.getGenderRadio(gender).click();
        await this.orderPage.getFirstNameInput().fill(firstName);
        await this.orderPage.getLastNameInput().fill(lastName);
        await this.orderPage.getEmailInput().fill(email);

        if (birthdate) {
            await this.orderPage.getBirthdateInput().fill(birthdate);
        }

        if (password) {
            await this.orderPage.getPasswordInput().fill(password);
        }

        if (agreeDataPrivacy) {
            await this.orderPage.getDataPrivacyCheckbox().check();
        }

        if (agreeTerms) {
            await this.orderPage.getTermsCheckbox().check();
        }

        await this.orderPage.getContinueButton().click();
    }

    async fillAddressInfo(addressData) {
        const {
            company,
            vatNumber,
            address,
            addressComplement,
            zip,
            city,
            country,
            phone,
            sameAddress
        } = addressData;

        if (company) await this.orderPage.getCompanyInput().fill(company);
        if (vatNumber) await this.orderPage.getVatInput().fill(vatNumber);
        if (address) await this.orderPage.getAddressInput().fill(address);
        if (addressComplement) await this.orderPage.getAddressComplementInput().fill(addressComplement);
        if (zip) await this.orderPage.getZipInput().fill(zip);
        if (city) await this.orderPage.getCityInput().fill(city);
        if (country) await this.orderPage.getCountryMenu().selectOption({label: country});
        if (phone) await this.orderPage.getPhoneInput().fill(phone);

        const checkbox = this.orderPage.getSameAddressCheckbox();
        const isChecked = await checkbox.isChecked();

        if (sameAddress !== isChecked) {
            await checkbox.check();
        }

        await this.orderPage.page.waitForTimeout(500);
        await this.orderPage.getConfirmAddressButton().click();

    }

    async selectShippingMethod(optionText) {
        const option = this.orderPage.getShippingOption(optionText);
        await option.check();
    }

    async confirmShippingMethod() {
        const button = this.orderPage.getConfirmDeliveryButton();
        await button.click();
    }

    async confirmPaymentMethod(optionText, agreeTerms) {
        const option = this.orderPage.getPaymentOption(optionText);
        await option.click();

        if (agreeTerms) {
            const checkbox = this.orderPage.getPaymentOptionTermsCheckbox();
            const isChecked = await checkbox.isChecked();
            if (!isChecked) {
                await checkbox.check();
            }
        }
    }

    async placeOrder() {
        await this.orderPage.getPlaceOrderButton().click();
    }

    async getAmounts() {
        const subtotalText = await this.orderPage.getSubtotalText();
        const shippingText = await this.orderPage.getShippingText();
        const totalText = await this.orderPage.getTotalText();

        const subtotal = PriceParser.parse(subtotalText);
        const shipping = PriceParser.parse(shippingText);
        const total = PriceParser.parse(totalText);

        return {subtotal, shipping, total};
    }
}
