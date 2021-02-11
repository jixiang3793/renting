// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/controller/access';
import ExportBase from '../../../app/controller/base';
import ExportCurd from '../../../app/controller/curd';
import ExportSpiderjob from '../../../app/controller/spiderjob';
import ExportSpiderjoblog from '../../../app/controller/spiderjoblog';
import ExportUser from '../../../app/controller/user';
import ExportWeb from '../../../app/controller/web';

declare module 'egg' {
  interface IController {
    access: ExportAccess;
    base: ExportBase;
    curd: ExportCurd;
    spiderjob: ExportSpiderjob;
    spiderjoblog: ExportSpiderjoblog;
    user: ExportUser;
    web: ExportWeb;
  }
}
