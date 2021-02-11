'use strict';
const permissionTable = require('../../database/tables/permission');

module.exports = app => {
    
    const Permission = app.model.define('permission', permissionTable);
    // console.log("model permission ...",app.model);
  return Permission;
};