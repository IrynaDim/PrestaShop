import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check drop down sub menu items', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);

    await test.step('Open main page', async () => {
        await mainPageSteps.openMainPage();
    });

    await test.step('Verify submenu items under CLOTHES', async () => {
        const clothesActual = await mainPageSteps.getDropDownMenuItems('CLOTHES');
        const clothesExpected = ['Men', 'Women'];
        expect(clothesActual.length).toBe(clothesExpected.length);
        for (const item of clothesExpected) {
            expect(clothesActual).toContain(item);
        }
    });

    await test.step('Verify submenu items under ACCESSORIES', async () => {
        const accessoriesActual = await mainPageSteps.getDropDownMenuItems('ACCESSORIES');
        const accessoriesExpected = ['Stationery', 'Home Accessories'];
        expect(accessoriesActual.length).toBe(accessoriesExpected.length);
        for (const item of accessoriesExpected) {
            expect(accessoriesActual).toContain(item);
        }
    });

    await test.step('Verify that ART category has no submenu items', async () => {
        const artItems = await mainPageSteps.getDropDownMenuItems('ART');
        expect(artItems.length).toBe(0);
    });
});
