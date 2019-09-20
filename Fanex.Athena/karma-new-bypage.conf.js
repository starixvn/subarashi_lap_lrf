// Karma configuration
// Generated on Wed Apr 20 2016 16:28:26 GMT+0700 (SE Asia Standard Time)

const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine-jquery', 'jasmine', 'requirejs'],
        files: [
            'node_modules/jasmine-ajax/lib/mock-ajax.js',
            { pattern: "node_modules/squirejs/src/Squire.js", included: false },
            { pattern: "node_modules/hammerjs/hammer.js", included: false },
            { pattern: "node_modules/moment/**/*.js", included: false },
            { pattern: "node_modules/bootstrap-daterangepicker/*.js", included: false },
            { pattern: "node_modules/materialize-autocomplete/**/*.js", included: false },
            { pattern: 'www/js/source/**/*.js', included: false },

            { pattern: 'www/js/tests/pages/**/customerwinloss/*-spec.js', included: false },
            'www/js/tests/test-main.js'
        ],
        proxies: {
            '/Test/Index': 'about:blank'
        },
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: true,
        concurrency: Infinity
    });
};