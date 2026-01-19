module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "not @ignore",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "tests/api/features/"
        ],
        worldParameters: {
            appURL: 'https://reqres.in',
            apiKey: "reqres-free-v1"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "tests/api/hooks/hooks.ts",
            "tests/api/steps/*.steps.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-api-report.html",
            "json:test-results/cucumber-api-report.json"
        ],
        parallel: 1
    }
}