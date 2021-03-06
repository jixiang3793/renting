import { ISpiderJob, ISpiderJobLog } from "@hezhi/types-renting";
import { ISpider } from "../base";

const RentingDoubanSpider = require('./douban');
const RentingWubaSpider = require('./wuba');

class RentingSpiderFactory {
  spiders: ISpider[] = [];
  constructor(job: ISpiderJob, joblog: ISpiderJobLog) {
    this.spiders.push(new RentingWubaSpider(job,joblog,{headless: true}));
    this.spiders.push(new RentingDoubanSpider(job,joblog,{headless: true}));
  }

  start(): Promise<number> {
    return new Promise((resolve) => {
      let sum = 0;
      this.spiders.forEach(async (it,index) => {
        const count = await it.fetch();
        // console.log("count ...",count);
        sum += count;
        if (index === (this.spiders.length - 1)) {
          console.log("fetch finish ...",sum);
          resolve(sum);
        }
      });
    })
  }
}

module.exports = RentingSpiderFactory;
