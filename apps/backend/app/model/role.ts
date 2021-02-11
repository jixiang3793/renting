'use strict';
const roleTable = require('../../database/tables/role');

module.exports = app => {
    
    const Role = app.model.define('role', roleTable);
    Role.associate = () => {
      Role.belongsToMany(app.model.User, {
        through: app.model.UserRole
      });
    };
  return Role;
};