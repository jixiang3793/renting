const JobBossSpider = require('./spiders/job/boss');

(async function () {
  const spider = new JobBossSpider({},{});
  await spider.fetch();
})()
