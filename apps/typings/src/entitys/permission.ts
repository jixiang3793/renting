import { IAuditBase } from "./base";

export interface IPermission extends IAuditBase {
  id: string;
  name: string;
  describe: string;
  status: string;
  actionData: string;
  sptDaTypes: string;
  optionalFields: string[];
  parents: string;
  type: string;
  actions: string[];
}
