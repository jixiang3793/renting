import { IAuditBase } from "./base";

export interface IPermission extends IAuditBase {
  id: string;
  name: string;
  describe: string;
  status: string;
  // 细粒度权限描述，[{name:'add',describe:'dsa'}]
  actionEntitySet: string;
  type: string;
  // 用于细粒度权限过滤，['add','edit']
  actionList?: string[];
  parentId: string;
}
