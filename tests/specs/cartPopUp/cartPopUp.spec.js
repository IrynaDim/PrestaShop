import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {SearchResultSteps} from "../../steps/SearchResultSteps";
import {ProductBuyingSteps} from "../../steps/ProductBuyingSteps";
import {CartPopUpSteps} from "../../steps/CartPopUpSteps";

test('Check product type, amount and price in the pop up window', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.insertTextToSearchFieldAndPressEnter('Bear');

    const resultPage = new SearchResultSteps(page);
    await resultPage.clickOnProductByTitle('Brown Bear Notebook');

    const buyingSteps = new ProductBuyingSteps(page);
    await buyingSteps.addItemToCart('Doted', null, 5);

    const popupSteps = new CartPopUpSteps(page);
    const type = await popupSteps.getProductPaperType();
    const quantity = await popupSteps.getProductQuantity();
    const total = await popupSteps.getSubTotal();
    const text = await popupSteps.getPopUpText();

    expect(text).toBe('Product successfully added to your shopping cart');
    expect(type).toBe('Doted');
    expect(quantity).toBe('5');
    expect(total).toBe('€77.40');
});
