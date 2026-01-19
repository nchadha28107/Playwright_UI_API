import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from 'playwright';

export class CustomWorld extends World {
    public page!: Page;
    public logger: any;
    
    constructor(options: any) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);