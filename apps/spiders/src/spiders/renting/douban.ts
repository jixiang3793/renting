const {By} = require('selenium-webdriver');
const sequelize = require('../../db');

import { ISpiderJob, ISpiderJobLog } from "@hezhi/types-renting";
import { BaseSpider } from "../base";
import areaMap from '../../areamap.json';


class RentingDoubanSpider extends BaseSpider  {

    constructor(job: ISpiderJob, joblog: ISpiderJobLog) {
        super(job,joblog);
    }

  setUrl(job: ISpiderJob) {
    this.url = 'https://www.douban.com/group/shanghaizufang';
  }

    fetch(): Promise<number> {
      return new Promise(async (resolve) => {
        console.log("douban fetch ...");
        await this.driver.get(this.url);

        let list = await this.driver.findElements(By.css('#group-topics .title > a'));
        const excludes = await this.driver.findElements(By.css('.elite_topic_lable'));
        if (list && list.length > excludes.length) {
          list = list.slice(excludes.length);
        }
        let count = 0;
        if (list) {
            // 添加数据

            const areas = this.job.area ? JSON.parse(this.job.area): null;
            // console.log("",url,title);
            const keyword = (<any>areaMap)[areas[areas.length - 1]];
            for (let index = 0; index < list.length; index++) {
                const anode = list[index];
                const url = await anode.getAttribute('href');
                const title = await anode.getAttribute('title')
                if (!keyword || (!!keyword && title.indexOf(keyword) === -1)) {
                  continue;
                }
                // 先查询是否存在，存在则更新标签，否则新建与更新log操作日志
                let entity = await sequelize.models.spiderdataitem.findOne({where: {url}});

                if (!entity) {
                    // 创建菜品数据
                    await sequelize.models.spiderdataitem.create({
                      url: url,
                      area: this.job.area,
                      data_type: this.job.data_type,
                      title,
                      describe: '',
                      from: 'douban',
                      images: '',
                      fetch_time: new Date(),
                      spiderjoblog_id: this.joblog.id
                    });
                    count++;
                }
                // console.log("results ...",url,dataItem);
            }
        }
        console.log("douban fetch finish ...",count);
        resolve(count);
      });
    }
}

module.exports = RentingDoubanSpider;
