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

test('Verify sorting by name Z to A', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.goToAllProductsPage();

    const allProductsSteps = new AllProductsSteps(page);
    const products = await allProductsSteps.getProductsBySorting("Name, Z to A");

    expect(products.length).toBeGreaterThan(0);

    const titles = products.map(p => p.title);
    const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));

    expect(titles).toEqual(sortedTitles);
});

test('Verify sorting by Price, low to high', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.goToAllProductsPage();

    const allProductsSteps = new AllProductsSteps(page);
    const products = await allProductsSteps.getProductsBySorting("Price, low to high");

    expect(products.length).toBeGreaterThan(0);

    const prices = products.map(p => p.price);
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
});


test('Verify sorting by Price, high to low', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();
    await mainPageSteps.goToAllProductsPage();

    const allProductsSteps = new AllProductsSteps(page);
    const products = await allProductsSteps.getProductsBySorting("Price, high to low");

    expect(products.length).toBeGreaterThan(0);

    const prices = products.map(p => p.price);
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
});

