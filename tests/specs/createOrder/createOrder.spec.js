import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {SearchResultSteps} from "../../steps/SearchResultSteps";
import {ProductBuyingSteps} from "../../steps/ProductBuyingSteps";
import {CartPopUpSteps} from "../../steps/CartPopUpSteps";
import {completeOrderPersonalInfo} from '../../testData/user';
import {addressData} from '../../testData/address';
import {CompleteOrderSteps} from "../../steps/CompleteOrderSteps";
import {ShoppingCartSteps} from "../../steps/ShoppingCartSteps";
import {OrderConfirmationSteps} from "../../steps/OrderConfirmationSteps";

test('Check creating order', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    const resultPage = new SearchResultSteps(page);
    const buyingSteps = new ProductBuyingSteps(page);
    const popUpCart = new CartPopUpSteps(page);
    const cartSteps = new ShoppingCartSteps(page);
    const completeOrderSteps = new CompleteOrderSteps(page);
    const confirmationSteps = new OrderConfirmationSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Search and add Customizable Mug to cart', async () => {
        await mainPageSteps.insertTextToSearchFieldAndPressEnter('Mug');
        await resultPage.clickOnProductByTitle('Customizable Mug');
        await buyingSteps.addItemToCart({
            customization: 'Best mug ever',
            quantity: 1
        });
    });

    await test.step('Search and add T-Shirt to cart', async () => {
        await popUpCart.clickContinueShopping();
        await buyingSteps.insertTextToSearchFieldAndPressEnter('T-Shirt');
        await resultPage.clickOnProductByTitle('Hummingbird Printed T-Shirt');
        await buyingSteps.addItemToCart({
            color: 'Black',
            size: 'M'
        });
    });

    await test.step('Go to shopping cart and proceed to checkout', async () => {
        await popUpCart.clickProceedToCheckOut();
        await cartSteps.clickProceedToCheckOut();
    });

    await test.step('Fill personal info and address', async () => {
        await completeOrderSteps.fillPersonalInfo(completeOrderPersonalInfo);
        await completeOrderSteps.fillAddressInfo(addressData);
    });

    await test.step('Select shipping method', async () => {
        await completeOrderSteps.selectShippingMethod('My carrier');
        await completeOrderSteps.confirmShippingMethod();
    });

    let subtotal, shipping, total;
    await test.step('Select payment method and verify totals', async () => {
        await completeOrderSteps.confirmPaymentMethod('Pay by Check', true);
        const amounts = await completeOrderSteps.getAmounts();
        subtotal = amounts.subtotal;
        shipping = amounts.shipping;
        total = amounts.total;
        expect(total).toBeCloseTo(subtotal + shipping, 2);
    });

    await test.step('Place the order', async () => {
        await completeOrderSteps.placeOrder();
    });

    await test.step('Verify confirmation message and totals match', async () => {
        const confirmationText = await confirmationSteps.verifyConfirmationMessageAppears();
        expect(confirmationText.trim().toLowerCase()).toContain('your order is confirmed');

        const {subtotal: confirmSubtotal, shipping: confirmShipping, total: confirmTotal} =
            await confirmationSteps.getAmounts();

        expect(confirmSubtotal).toBeCloseTo(subtotal, 2);
        expect(confirmShipping).toBeCloseTo(shipping, 2);
        expect(confirmTotal).toBeCloseTo(total, 2);
    });
});
