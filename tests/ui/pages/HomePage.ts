import { CustomWorld } from "../customWorld";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";
let urls = require('../helper/config/urls.json');

class HomePage extends BasePage {

    private bookStoreCard = '.category-cards .card.mt-4.top-card:nth-of-type(6)';
    private env = process.env.ENV || 'dev';

    constructor(iWorld: CustomWorld) {
        super(iWorld.page, iWorld.logger);
    }

    async navigateToHome() {
        await this.page.goto(urls[this.env]);
        this.logger.info('Navigated to DemoQA homepage');
    }

    async openBookStoreApplication() {
        await this.page.locator(this.bookStoreCard).click();
        await expect(this.page).toHaveURL(/\/books/);
        this.logger.info('Opened Book Store Application');
    }

}

export default HomePage;