import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {SignInPageSteps} from '../../steps/SignInPageSteps';
import {SignUpPageSteps} from '../../steps/SignUpPageSteps';
import {invalidUserFirstName} from '../../testData/user';

test('Registration with invalid first name', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    const signInPageSteps = new SignInPageSteps(page);
    const signUpPageSteps = new SignUpPageSteps(page);

    await test.step('Open main page and navigate to Sign Up screen', async () => {
        await mainPageSteps.openMainPage();
        await mainPageSteps.goToSignInScreen();
        await signInPageSteps.goToSignUpScreen();
    });

    await test.step('Fill registration form with invalid first name', async () => {
        await signUpPageSteps.fillRegistrationForm(invalidUserFirstName);
    });

    await test.step('Verify error message for first name', async () => {
        const errorText = await signUpPageSteps.getFirstNameFieldErrorText();
        expect(errorText).toContain('Invalid format.');
    });
});
