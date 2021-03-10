// const CaipuSpider = require('./caipu-spider');
// const params = {
//     redisIp: '0.0.0.0',
//     redisPort: 6379,
//     mongoAddr: 'mongodb://0.0.0.0:27017',
//     mongoDbName: 'caipu',
//     filterRedisKey: 'xiangha-caipu-filter',
//     urlsRedisKey: 'xiangha-caipu-url',
//     startUrls: ['https://www.xiangha.com/caipu/z-jiachangcai/']
// };

// const spider = new CaipuSpider(params);

// spider.start();

const RentingWubaSpider = require('./spiders/renting-wuba-spider');
const params = {
    redisIp: '0.0.0.0',
    redisPort: 6379,
    mongoAddr: 'mongodb://0.0.0.0:27017',
    mongoDbName: 'house',
    filterRedisKey: 'xiangha-house-filter',
    urlsRedisKey: 'xiangha-house-url',
    startUrls: ['https://www.xiangha.com/caipu/z-jiachangcai/']
};

const spider = new RentingWubaSpider(params);

spider.start();



// driver.findElement(By.css('body')).getText().then(value => {
//     console.log(value);
// });
