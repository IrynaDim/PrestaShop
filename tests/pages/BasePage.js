export class BasePage {
    constructor(page) {
        this.page = page;
        this.iframeLocator = page.frameLocator('iframe[name="framelive"]');
    }
}
