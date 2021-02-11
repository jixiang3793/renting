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
  dataType: ISpiderDataType;
  url: string;
  area: string;
}

export interface ISpiderTask {

}

