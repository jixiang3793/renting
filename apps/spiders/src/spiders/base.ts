import { ISpiderJob, ISpiderJobLog } from "@hezhi/types-renting";
const DriverFactory = require('../browser');

export interface ISpider {
  fetch(): Promise<number>;
  setUrl(job: ISpiderJob): void;
  url: string;
}

export abstract class BaseSpider implements ISpider {
  url: string = '';
  joblog: ISpiderJobLog;
  job: ISpiderJob;
  driver: any = null;

  constructor(job: ISpiderJob, joblog: ISpiderJobLog) {
    this.joblog = joblog;
    this.job = job;
    this.setUrl(job);
    this.driver = new DriverFactory();
  }

  fetch(): Promise<number> {
    return new Promise(() => {});
  }
  setUrl(job: ISpiderJob) {
    console.log(job);
  }

}
