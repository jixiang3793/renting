import { ISpiderJob, ISpiderJobLog } from "@hezhi/types-renting";
const sequelize = require('../../db');
import { BaseSpider } from "../base";
const {By} = require('selenium-webdriver');

/**
 * 58同城
 */
class RentingWubaSpider extends BaseSpider {

  constructor(job: ISpiderJob, joblog: ISpiderJobLog) {
    super(job,joblog);
  }

  setUrl(job: ISpiderJob) {

    if (job.area) {
      const areas = JSON.parse(job.area);
      this.url = `https://sh.58.com/${areas[areas.length - 1]}/chuzu/0/`;
      console.log(this.url);
    }
  }

  fetch(): Promise<number> {
    return new Promise(async (resolve) => {
      console.log("wuba fetch ...");
      await this.driver.get(this.url);

      let list = await this.driver.findElements(By.css('.house-cell'));
      let count = 0;
      if (list) {
          // 添加数据
          for (let index = 0; index < list.length; index++) {
              const rentInfo = list[index];
              const url = await rentInfo.findElement(By.css(".img-list a")).getAttribute('href');
              const thumbnail = await rentInfo.findElement(By.css(".img-list img")).getAttribute('src');
              const title = await rentInfo.findElement(By.css(".des h2")).getText();
              const room = await rentInfo.findElement(By.css(".des .room")).getText();
              const loc = await rentInfo.findElement(By.css(".des .infor")).getText();
              const ptime = await rentInfo.findElement(By.css(".list-li-right .send-time")).getText();
              const money = await rentInfo.findElement(By.css(".list-li-right .money")).getText();
              // 先查询是否存在，存在则更新标签，否则新建与更新log操作日志
              let entity = await sequelize.models.spiderdataitem.findOne({where: {url}});
              if (!entity && ptime.indexOf('-') === -1) {
                  // 创建菜品数据
                  await sequelize.models.spiderdataitem.create({
                    url: url,
                    area: this.job.area,
                    data_type: this.job.data_type,
                    title,
                    describe: `${room}@${loc}@${ptime}@${money}`,
                    from: 'wuba',
                    images: thumbnail,
                    fetch_time: new Date(),
                    spiderjoblog_id: this.joblog.id
                  });
                  count++;
              }
              // console.log("results ...",url,dataItem);
          }
      }
      console.log("wuba fetch finish ...",count);
      resolve(count);
    });

  }
}

module.exports = RentingWubaSpider;
