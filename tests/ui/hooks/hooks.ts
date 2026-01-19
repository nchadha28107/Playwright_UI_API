import { BeforeAll, AfterAll, Before, After, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { invokeBrowser, invokeDevices } from "../helper/browsers/browserManager";
import { createLogger } from "winston";
import { options } from "../helper/utils/logger";
const fs = require("fs-extra");
const path = require("path");

setDefaultTimeout(60 * 1000 * 6)

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        ...invokeDevices(),
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    this.page = await context.newPage();
    this.page.setDefaultTimeout(120000);
    this.logger = createLogger(options(scenarioName));
});


After(async function ({ pickle, result }) {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
    const status = result?.status === Status.PASSED ? 'PASS' : 'FAIL';
    
    const tracePath = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.PASSED) {
        const screenshotPath = `./test-results/screenshots/${scenarioName}_PASS.png`;
        await this.page.screenshot({ 
            path: screenshotPath,
            type: "png"
        })
    } else if (result?.status === Status.FAILED) {
        const screenshotPath = `./test-results/screenshots/${scenarioName}_FAIL.png`;
        await this.page.screenshot({
            path: screenshotPath,
            type: "png"
        });
    }
    
    await context.tracing.stop({ path: tracePath });

    // Handle video recording
    let videoPath: string | null = null;
    if (this.page.video()) {
        videoPath = await this.page.video().path();
    }
    
    await this.page.close(); // Close page first
    await context.close(); // Close context to finalize video
    
    // Wait longer for video file to be fully written and unlocked
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now safely rename the video
    if (videoPath && fs.existsSync(videoPath)) {
        try {
            const videoDir = path.dirname(videoPath);
            const newVideoPath = path.join(videoDir, `${scenarioName}_${status}.webm`);
            
            // Use fs-extra's move method with overwrite option (more robust than rename)
            await fs.move(videoPath, newVideoPath, { overwrite: true });
            this.logger.info(`Video saved: ${newVideoPath}`);
        } catch (error) {
            this.logger.error(`Failed to rename video: ${error}`);
            // Optionally retry once more
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                const videoDir = path.dirname(videoPath);
                const newVideoPath = path.join(videoDir, `${scenarioName}_${status}.webm`);
                await fs.move(videoPath, newVideoPath, { overwrite: true });
                this.logger.info(`Video saved on retry: ${newVideoPath}`);
            } catch (retryError) {
                this.logger.error(`Failed to rename video on retry: ${retryError}`);
            }
        }
    }
});

AfterAll(async function () {
    await browser.close();
})