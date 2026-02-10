export const config = {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'eu', 

    services: [
        ['sauce', {
            // We set this to false because you are running 'sc run' manually
            sauceConnect: false, 
        }]
    ],

    capabilities: [{
        platformName: 'iOS',
        'appium:deviceName': 'iPhone.*',
        'appium:automationName': 'XCUITest',
        'browserName': 'Safari',
        'sauce:options': {
            tunnelName: 'natwest-poc-tunnel', 
            tunnelOwner: 'oauth-stefano.loi-800a5',
            build: 'Sauce Connect POC - Localhost Test',
            name: 'iOS Localhost Proof'
        }
    }],

    specs: ['./test/specs/**/*.js'],
    baseUrl: 'http://stefano.local:8080',
    framework: 'mocha',
    reporters: ['spec'],
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
};