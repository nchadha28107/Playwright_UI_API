import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../customWorld';
import { request } from '@playwright/test';
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";

setDefaultTimeout(60000);

Before(async function (this: CustomWorld, {pickle}) {
    const scenarioName = pickle.name + pickle.id
    // Initialize API request context
    this.apiContext = await request.newContext({
        baseURL: this.parameters.appURL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'x-api-key': this.parameters.apiKey
        },
    });

    // Initialize logger
    this.logger = createLogger(options(scenarioName));
    this.logger.info('API Test Context Initialized');
});

After(async function (this: CustomWorld, { result, pickle }) {
    if (result) {
        this.logger.info(`Scenario: ${pickle.name} - Status: ${result.status}`);
    }
    if (this.apiContext) {
        await this.apiContext.dispose();
    }
    this.logger.info('API Test Context Cleaned Up');
});