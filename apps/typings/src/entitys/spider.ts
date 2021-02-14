export interface IRentingInfo {

}

export enum ISpiderDataType {
  RENT = 'renting',
  SHAND = 'secondhandhouse',
  JOB = 'job'
}

export interface ISpiderJob {
  id: string;
  name: string;
  every: number;
  data_type: ISpiderDataType;
  url: string;
  area?: string;
  traffic?: string;
}
export interface ISpiderJobLog {
  id: number;
  jobId: string;
  startedAt: Date;
  endedAt: Date;
  new: number;
  from: string;
}
export interface ISpiderDataItem {
  id: number;
  url: string;
  area: string;
  data_type: string;
  title: string;
  describe: string;
  from: string;
  images?: string;
  fetch_time: Date;
  created_at: Date;
  updated_at: Date;
  operator: string;
  spiderjoblog_id: number;
}

export interface ISpiderTask {

}

