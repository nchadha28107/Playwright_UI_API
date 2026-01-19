module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "not @ignore",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "tests/ui/features/"
        ],
        publishQuiet: true,
        dryRun: false,
        require: [
            "tests/ui/hooks/hooks.ts",
            "tests/ui/steps/*.steps.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-ui-report.html",
            "json:test-results/cucumber-ui-report.json"
        ],
        parallel: 1
    }
}