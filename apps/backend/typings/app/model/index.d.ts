// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPermission from '../../../app/model/permission';
import ExportRole from '../../../app/model/role';
import ExportUserRole from '../../../app/model/user-role';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Permission: ReturnType<typeof ExportPermission>;
    Role: ReturnType<typeof ExportRole>;
    UserRole: ReturnType<typeof ExportUserRole>;
    User: ReturnType<typeof ExportUser>;
  }
}
