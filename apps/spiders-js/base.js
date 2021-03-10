const redis = require('redis');
const BloomFilter = require('bloomfilter-redis');
const MongoClient = require('mongodb').MongoClient;
const {promisify} = require('util');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const {Builder} = require('selenium-webdriver');
const EventEmitter = require('events');

class BaseSpider extends EventEmitter {
    redisClient;
    rpushAsync;
    lpopAsync;
    mongoClient;
    mongoDb;
    bf;
    driver;
    params;

    constructor(params) {
        super();
        this.initRedis(params.redisIp,params.redisPort);
        this.initMongo(params.mongoAddr,params.mongoDbName);
        this.initBloomFilter(params.filterRedisKey);
        this.initDriver();

        this.params = params;

        this.on('process',this.process);
        this.on('next',this.next);
        this.on('finish',this.finish);
    }

    initRedis(redisIp,redisPort) {
        this.redisClient = redis.createClient(redisPort,redisIp);
        this.rpushAsync = promisify(this.redisClient.rpush).bind(this.redisClient);
        this.lpopAsync = promisify(this.redisClient.lpop).bind(this.redisClient);
    }
    async initMongo(mongoAddr,mongoDbName) {
        this.mongoClient = await MongoClient.connect(mongoAddr);
        this.mongoDb = this.mongoClient.db(mongoDbName);
    }

    async initBloomFilter(filterRedisKey) {
        this.bf = new BloomFilter({// all params have a default value, and I choose some to present below
            redisSize: 10, // this will create a string value which is 256 MegaBytes in length
            hashesNum: 16, // how many hash functions do we use
            redisKey: filterRedisKey, // this will create a string whose keyname is `Node_Bloomfilter_Redis`
            redisClient: this.redisClient, // you can choose to create the client by yourself
        });
        await this.bf.init();
    }

    initDriver() {
        const service = new chrome.ServiceBuilder(path).build();
        chrome.setDefaultService(service);
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless().windowSize({
                width: 1366,
                height: 768
            }))
            .build();
    }

    async start() {
        let i = 0;
        while (i < this.params.startUrls.length && await this.bf.contains(this.params.startUrls[i])) {
            i++;
        }
        let url = null;
        if (i < this.params.startUrls.length) {
            url = this.params.startUrls[i];
            while (++i < this.params.startUrls.length) {
                this.addUrl(this.params.startUrls[i]);
            }
        } else {
            url = await this.popUrl();
        }
        this.emit('process',url);
        // await this.handle(url);

    }

    async process(url) {
        console.log(`process url ${url} ...`);
        if (!await this.bf.contains(url)) {
            await this.handle(url);
            this.bf.add(url);
        }
        this.emit("next");
    }

    async next() {
        const url = await this.popUrl();
        if (url) {
            this.emit('process',url);
        } else {
            this.emit('finish');
        }
        console.log(`next url ${url} ...`);
    }

    async finish() {
        console.log("work done ...");
    }

    // this.on();

    async popUrl() {
        return await this.lpopAsync(this.params.urlsRedisKey);
    }

    async addUrl(url) {
        await this.rpushAsync(this.params.urlsRedisKey,url);
    }

    async handle(url) {
        console.log(`handle url ${url} ...`);
    }
}
module.exports = BaseSpider;