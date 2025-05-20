import {SignUpPage} from '../pages/SignUpPage';
import {expect} from '@playwright/test';

export class SignUpPageSteps {
    constructor(page) {
        this.signUpPage = new SignUpPage(page);
    }

    async fillRegistrationForm({
                                   gender,
                                   firstName,
                                   lastName,
                                   email,
                                   password,
                                   birthdate,
                                   agreeOffers = false,
                                   agreeTerms = true
                               }) {
        if (gender) {
            await this.signUpPage.selectGender(gender);
        }
        if (firstName) {
            await this.signUpPage.fillFirstName(firstName);
        }
        if (lastName) {
            await this.signUpPage.fillLastName(lastName);
        }
        if (email) {
            await this.signUpPage.fillEmail(email);
        }
        if (password) {
            await this.signUpPage.fillPassword(password);
        }
        if (birthdate) {
            await this.signUpPage.fillBirthdate(birthdate);
        }
        if (agreeOffers) {
            await this.signUpPage.checkOffers();
        }
        if (agreeTerms) {
            await this.signUpPage.checkTerms();
        }
        await this.signUpPage.checkCustomerDataPrivacy()

        await this.signUpPage.submitForm();
    }

    async verifyFirstNameFieldInvalid() {
        const errorMessages = this.signUpPage.getErrorMessages();
        await expect(errorMessages).toContainText('Invalid format.');
    }
}
