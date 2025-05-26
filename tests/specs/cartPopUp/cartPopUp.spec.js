import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {SearchResultSteps} from "../../steps/SearchResultSteps";
import {ProductBuyingSteps} from "../../steps/ProductBuyingSteps";
import {CartPopUpSteps} from "../../steps/CartPopUpSteps";

test('Check product type, amount and price in the pop up window', async ({ page }) => {
    const mainPageSteps = new MainPageSteps(page);
    const resultPage = new SearchResultSteps(page);
    const buyingSteps = new ProductBuyingSteps(page);
    const popupSteps = new CartPopUpSteps(page);

    await test.step('Open main page and search for "Bear"', async () => {
        await mainPageSteps.openMainPage();
        await mainPageSteps.insertTextToSearchFieldAndPressEnter('Bear');
    });

    await test.step('Open Brown Bear Notebook product', async () => {
        await resultPage.clickOnProductByTitle('Brown Bear Notebook');
    });

    await test.step('Add item to cart with type "Doted" and quantity 5', async () => {
        await buyingSteps.addItemToCart({
            type: 'Doted',
            quantity: 5
        });
    });

    await test.step('Verify popup information: type, quantity, total, and success message', async () => {
        const type = await popupSteps.getProductPaperType();
        const quantity = await popupSteps.getProductQuantity();
        const total = await popupSteps.getSubTotal();
        const text = await popupSteps.getPopUpText();

        expect(text).toBe('Product successfully added to your shopping cart');
        expect(type).toBe('Doted');
        expect(quantity).toBe('5');
        expect(total).toBe('€77.40');
    });
});
