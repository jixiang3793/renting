// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPermission from '../../../app/model/permission';
import ExportRole from '../../../app/model/role';
import ExportSpiderdataitem from '../../../app/model/spiderdataitem';
import ExportSpiderjob from '../../../app/model/spiderjob';
import ExportSpiderjoblog from '../../../app/model/spiderjoblog';
import ExportUserRole from '../../../app/model/user-role';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    Spiderdataitem: ReturnType<typeof ExportSpiderdataitem>;
    Spiderjob: ReturnType<typeof ExportSpiderjob>;
    Spiderjoblog: ReturnType<typeof ExportSpiderjoblog>;
    UserRole: ReturnType<typeof ExportUserRole>;
    User: ReturnType<typeof ExportUser>;
  }
}
