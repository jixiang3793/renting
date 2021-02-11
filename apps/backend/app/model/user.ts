'use strict';
const userTable = require('../../database/tables/user');

module.exports = app => {
    
    const User = app.model.define('user', userTable);
    // console.log("model user ...",app.model);
    User.associate = () => {
        User.belongsToMany(app.model.Role, {
            through: app.model.UserRole,
            sourceKey:'name'
        });
      };
  return User;
};