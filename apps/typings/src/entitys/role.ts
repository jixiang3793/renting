import { IAuditBase } from "./base";
import { IPermission } from "./permission";

export interface IRole extends IAuditBase {
  id: string;
  name: string;
  describe: string;
  status: number,
  creatorId: string;
  createTime: string;
  permissions?: IPermission[];
}
