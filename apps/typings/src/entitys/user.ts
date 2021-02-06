export interface IAuditBase {
  createTime: string;
  updateTime?: string;
  operator: string;
}

export interface IUser extends IAuditBase {
  id?: string;
  name: string;
  sex?: boolean;
  age?: number;
  address?: string;
  area?: string;
  password: string;
}

