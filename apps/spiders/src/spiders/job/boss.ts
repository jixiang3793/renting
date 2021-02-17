const {By} = require('selenium-webdriver');
// const sequelize = require('../../db');

import { BaseSpider } from "../base";

class JobBossSpider extends BaseSpider {

  constructor(job: any, joblog: any) {
    super(job,joblog);
}

  setUrl(job: any) {
    this.url = 'https://www.zhipin.com/web/geek/recommend';
  }

    fetch(): Promise<number> {
      return new Promise(async (resolve) => {
        await this.driver.get('http://localhost:7001');
        console.log("boss fetch ...");

        await this.driver.manage().addCookie({domain: '.zhipin.com', name: '__zp_stoken__', value: '9d52bEGFFSSRTE2kwBmZSIjV8P21YLncjUQx9d2xeGg94dktZfjhJNwtQPXR4RmhwAntSV2xzKEQXX00CCzlnbBkyYgl1RAF6dwF3GlZzIxQibi4wWHENIyp%2BClIqG2BMBCpYbn9bLU5ndHJhBw%3D%3D'});
        await this.driver.manage().addCookie({domain: '.zhipin.com', name: 'wt2', value: 'nPnKeHEpzhcZ9iss'});
        await this.driver.manage().addCookie({domain: '.zhipin.com', name: '_bl_uid', value: '48k19l765I1v6gek37aq5583p2t9'});
        await this.driver.manage().addCookie({domain: '.zhipin.com', name: '__fid', value: '147499d476c2bccc13488d7a4f655b2c'});

        // await this.driver.sleep(10 * 1000);
        await this.driver.get(this.url);

        // await this.driver.sleep(10 * 1000);
        let count = 0;
        let list = await this.driver.findElements(By.css('.jobs-list li'));
        const jobs: any[] = [];
        for (let index = 0; index < list.length; index++) {
          const node = list[index];
          const title = await node.findElement(By.css(".job-title")).getText();
          const company = await node.findElement(By.css(".info-company .name")).getText();
          jobs.push({title,company});
          count++;
        }


        console.log("boss fetch finish ...",count,jobs);
        await this.driver.sleep(1120 * 1000);
        resolve(count);
      });
    }
}

module.exports = JobBossSpider;
