import { LaunchOptions, firefox, webkit, devices } from "@playwright/test";
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';


const options: LaunchOptions = {
    headless: !true,
    slowMo: 50, // Slow down operations by 50ms for better visibility
    args: ['--start-maximized']
}

export const invokeBrowser = () => {
    const browserType = process.env.npm_config_BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            chromium.use(stealth());
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
        case "safari":
            return webkit.launch(options);
        default:
            throw new Error(`Browser type "${browserType}" is not supported. Please use chrome, firefox, or webkit.`);
    }
}

export const invokeDevices = () => {
    return devices[process.env.npm_config_DEVICES ?? "Desktop Chrome"];
}