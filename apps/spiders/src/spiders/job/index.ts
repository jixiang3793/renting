import { ISpiderJob, ISpiderJobLog } from "@hezhi/types-renting";
import { ISpider } from "../base";

// const JobBossSpider = require('./boss');
// const RentingWubaSpider = require('./wuba');

class JobSpiderFactory {
  spiders: ISpider[] = [];
  constructor(job: ISpiderJob, joblog: ISpiderJobLog) {
    // this.spiders.push(new JobBossSpider(job,joblog));
    // this.spiders.push(new RentingDoubanSpider(job,joblog));
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

module.exports = JobSpiderFactory;
