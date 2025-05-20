import {SignUpPage} from '../pages/SignUpPage';

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

    async getFirstNameFieldErrorText() {
        const errorMessages = this.signUpPage.getErrorMessages();
        return await errorMessages.textContent();
    }
}
