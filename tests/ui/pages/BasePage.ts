import { Page } from "@playwright/test";
import { Logger } from "winston";

export class BasePage {

    public page: Page;
    public logger: Logger;

    constructor(page: Page, logger: Logger) {
        this.page = page;
        this.logger = logger;
    }
}