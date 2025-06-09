import { expect, test } from '@playwright/test';
import { MainPageSteps } from '../../steps/MainPageSteps';
import { AllProductsSteps } from '../../steps/AllProductsSteps';

let mainPageSteps;
let allProductsSteps;

test.beforeEach(async ({ page }) => {
    mainPageSteps = new MainPageSteps(page);
    allProductsSteps = new AllProductsSteps(page);

    await test.step('Open main page and navigate to All Products page', async () => {
        await mainPageSteps.openMainPage();
        await mainPageSteps.goToAllProductsPage();
    });
});

test('Verify sorting by name A to Z', async () => {
    let products;
    await test.step('Sort products by name A to Z', async () => {
        products = await allProductsSteps.getProductsBySorting("Name, A to Z");
    });

    await test.step('Verify product titles are sorted A to Z', async () => {
        expect(products.length).toBeGreaterThan(0);
        const titles = products.map(p => p.title);
        const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
        expect(titles).toEqual(sortedTitles);
    });
});

test('Verify sorting by name Z to A', async () => {
    let products;
    await test.step('Sort products by name Z to A', async () => {
        products = await allProductsSteps.getProductsBySorting("Name, Z to A");
    });

    await test.step('Verify product titles are sorted Z to A', async () => {
        expect(products.length).toBeGreaterThan(0);
        const titles = products.map(p => p.title);
        const sortedTitles = [...titles].sort((a, b) => b.localeCompare(a));
        expect(titles).toEqual(sortedTitles);
    });
});

test('Verify sorting by Price, low to high', async () => {
    let products;
    await test.step('Sort products by price: low to high', async () => {
        products = await allProductsSteps.getProductsBySorting("Price, low to high");
    });

    await test.step('Verify product prices are sorted low to high', async () => {
        expect(products.length).toBeGreaterThan(0);
        const prices = products.map(p => p.price);
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });
});

test('Verify sorting by Price, high to low', async () => {
    let products;
    await test.step('Sort products by price: high to low', async () => {
        products = await allProductsSteps.getProductsBySorting("Price, high to low");
    });

    await test.step('Verify product prices are sorted high to low', async () => {
        expect(products.length).toBeGreaterThan(0);
        const prices = products.map(p => p.price);
        const sortedPrices = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sortedPrices);
    });
});
