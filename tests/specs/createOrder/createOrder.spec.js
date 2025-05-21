import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {SearchResultSteps} from "../../steps/SearchResultSteps";
import {ProductBuyingSteps} from "../../steps/ProductBuyingSteps";
import {CartPopUpSteps} from "../../steps/CartPopUpSteps";
import { completeOrderPersonalInfo } from '../../testData/user';
import { addressData } from '../../testData/address';
import {CompleteOrderSteps} from "../../steps/CompleteOrderSteps";
import {ShoppingCartSteps} from "../../steps/ShoppingCartSteps";
import {OrderConfirmationSteps} from "../../steps/OrderConfirmationSteps";

test('Check creating order', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    // add first product to cart
    await mainPageSteps.insertTextToSearchFieldAndPressEnter('Mug');
    const resultPage = new SearchResultSteps(page);
    await resultPage.clickOnProductByTitle('Customizable Mug');
    const buyingSteps = new ProductBuyingSteps(page);
    await buyingSteps.addItemToCart({
        customization: 'Best mug ever',
        quantity: 1
    });

    // add second product to cart
    const popUpCart = new CartPopUpSteps(page);
    await popUpCart.clickContinueShopping();
    await buyingSteps.insertTextToSearchFieldAndPressEnter('T-Shirt');
    await resultPage.clickOnProductByTitle('Hummingbird Printed T-Shirt');
    await buyingSteps.addItemToCart({
        color: 'Black',
        size: 'M'
    });
    await popUpCart.clickProceedToCheckOut();

    const cartSteps = new ShoppingCartSteps(page);
    await cartSteps.clickProceedToCheckOut();

    // proceed order
    const completeOrderSteps = new CompleteOrderSteps(page);
    await completeOrderSteps.fillPersonalInfo(completeOrderPersonalInfo);
    await completeOrderSteps.fillAddressInfo(addressData);
    await completeOrderSteps.selectShippingMethod('My carrier');
    await completeOrderSteps.confirmShippingMethod();

    await completeOrderSteps.confirmPaymentMethod('Pay by Check', true);

    const { subtotal, shipping, total } = await completeOrderSteps.getAmounts();
    expect(total).toBeCloseTo(subtotal + shipping, 2);

    // place order
    await completeOrderSteps.placeOrder();

    const confirmationSteps = new OrderConfirmationSteps(page);

    const confirmationText = await confirmationSteps.verifyConfirmationMessageAppears();
    expect(confirmationText.trim().toLowerCase()).toContain('your order is confirmed');

    const { subtotal: confirmSubtotal, shipping: confirmShipping, total: confirmTotal } = await confirmationSteps.getAmounts();

    expect(confirmSubtotal).toBeCloseTo(subtotal, 2);
    expect(confirmShipping).toBeCloseTo(shipping, 2);
    expect(confirmTotal).toBeCloseTo(total, 2);
});
