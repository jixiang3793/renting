'use strict';
const userRoleTable = require('../../database/tables/user-role');

module.exports = app => {
    
    const UserRole = app.model.define('user_roles', userRoleTable);
    // console.log("model permission ...",app.model);
  return UserRole;
};