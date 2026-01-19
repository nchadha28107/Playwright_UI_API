import { APIRequestContext, APIResponse } from '@playwright/test';
import { Logger } from 'winston';

export class BaseAPI {
    protected apiContext: APIRequestContext;
    protected logger: Logger;

    constructor(apiContext: APIRequestContext, logger: Logger) {
        this.apiContext = apiContext;
        this.logger = logger;
    }

    /**
     * Helper method to log API request details
     */
    protected logRequest(method: string, endpoint: string, data?: any) {
        this.logger.info(`API ${method} Request: ${endpoint}`);
        if (data) {
            this.logger.info(`Request Body: ${JSON.stringify(data)}`);
        }
    }

    /**
     * Helper method to log API response details
     */
    protected async logResponse(response: APIResponse) {
        const status = response.status();
        const body = await response.text();
        this.logger.info(`API Response Status: ${status}`);
        this.logger.info(`API Response Body: ${body}`);
    }
}