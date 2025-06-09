import {SearchResultsPage} from '../pages/SearchResultsPage';

export class SearchResultSteps {
    constructor(page) {
        this.resultPage = new SearchResultsPage(page);
    }

    async clickOnProductByTitle(title) {
        const product = this.resultPage.getProductByTitle(title);
        await product.click();
    }

    async clickOnProductByIndex(index) {
        const productItem = this.resultPage.getProductByIndex(index);
        const link = await this.resultPage.getProductTitle(productItem);
        await link.click();
    }

}
