import {expect, test} from '@playwright/test';
import {MainPageSteps} from '../../steps/MainPageSteps';

test('Check drop down sub menu items', async ({page}) => {
    const mainPageSteps = new MainPageSteps(page);
    await mainPageSteps.openMainPage();

    const clothesActual = await mainPageSteps.getDropDownMenuItems('CLOTHES');
    const clothesExpected = ['Men', 'Women'];
    expect(clothesActual.length).toBe(clothesExpected.length);
    for (const item of clothesExpected) {
        expect(clothesActual).toContain(item);
    }

    const accessoriesActual = await mainPageSteps.getDropDownMenuItems('ACCESSORIES');
    const accessoriesExpected = ['Stationery', 'Home Accessories'];
    expect(accessoriesActual.length).toBe(accessoriesExpected.length);
    for (const item of accessoriesExpected) {
        expect(accessoriesActual).toContain(item);
    }

    const artItems = await mainPageSteps.getDropDownMenuItems('ART');
    expect(artItems.length).toBe(0);
});
