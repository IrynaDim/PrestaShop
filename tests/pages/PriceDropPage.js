export class PriceDropPage {
    constructor(page) {
        this.page = page;
        this.iframeLocator = page.frameLocator('iframe[name="framelive"]');
    }

    async waitForIframeReady() {
        await this.iframeLocator.locator('body').waitFor({ state: 'visible', timeout: 10000 });
    }

    getProducts() {
        return this.iframeLocator.locator('//div[@class=\'js-product product col-xs-12 col-sm-6 col-xl-4\']');
    }
}