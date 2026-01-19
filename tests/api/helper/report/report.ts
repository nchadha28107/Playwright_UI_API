const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Playwright API Automation Report",
    pageTitle: "API Test Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: process.env.npm_config_BROWSER || "chrome",
            version: "Latest",
        },
        device: process.env.npm_config_DEVICES || "Desktop",
        platform: {
            name: process.platform === 'win32' ? "Windows" : process.platform === 'darwin' ? "macOS" : "Linux",
            version: "Latest",
        },
    },
    customData: {
        title: "Test Execution Info",
        data: [
            { label: "Project", value: "Playwright" },
            { label: "Release", value: "1.0.0" },
            { label: "Test Type", value: "Smoke & Regression" },
            { label: "Execution Date", value: new Date().toLocaleDateString() },
            { label: "Execution Time", value: new Date().toLocaleTimeString() }
        ],
    },
});