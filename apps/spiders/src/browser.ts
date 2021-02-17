
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder} = require('selenium-webdriver');

export interface browserOptions {
  headless?: boolean;
}
  const service = new chrome.ServiceBuilder(path).build();
  chrome.setDefaultService(service);

  function DriverFactory(opts?: browserOptions) {
    const options = new chrome.Options().windowSize({
        width: 1366,
        height: 768
    });
    if (opts && opts.headless) {
      options.handless();
    }
    return new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }
module.exports = DriverFactory;
