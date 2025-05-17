import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';
import {AllProductsSteps} from '../../steps/AllProductsSteps';

test('Verify sorting by name A to Z', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.goToAllProductsPage();

    const allProductsSteps = new AllProductsSteps(page);
    const products = await allProductsSteps.getProductsBySorting("Name, A to Z");

    expect(products.length).toBeGreaterThan(0);

    const titles = products.map(p => p.title);
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));

    expect(titles).toEqual(sortedTitles);
});
