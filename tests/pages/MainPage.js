export class MainPage {
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://demo.prestashop.com/#/en/front');
        await this.page.frameLocator('iframe[name="framelive"]').locator('body').waitFor({timeout: 15000});
    }

    getIframe() {
        return this.page.frameLocator('iframe[name="framelive"]');
    }

    async getNewsletterLabel() {
        const iframe = this.getIframe();
        return iframe.locator('#block-newsletter-label');
    }

    async getUnsubscribeText() {
        const iframe = this.getIframe();
        return iframe.getByText('You may unsubscribe at any');
    }

    async getSubscribeButton() {
        const iframe = this.getIframe();
        return iframe.getByRole('button', {name: 'Subscribe'});
    }
}