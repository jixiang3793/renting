'use strict';

const spiderJobTable = require('../../database/tables/spiderjob');

module.exports = app => {
    
    const SpiderJobTable = app.model.define('spiderjob', spiderJobTable);
    // Role.associate = () => {
    //   Role.belongsToMany(app.model.User, {
    //     through: app.model.UserRole
    //   });
    // };
  return SpiderJobTable;
};