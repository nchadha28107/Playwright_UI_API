import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext } from '@playwright/test';

export class CustomWorld extends World {
    public apiContext!: APIRequestContext;
    public logger: any;

    constructor(options: any) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);