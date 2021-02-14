
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder} = require('selenium-webdriver');

  const service = new chrome.ServiceBuilder(path).build();
  chrome.setDefaultService(service);

  function DriverFactory() {
    return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless().windowSize({
        width: 1366,
        height: 768
    }))
    .build();
  }
module.exports = DriverFactory;
