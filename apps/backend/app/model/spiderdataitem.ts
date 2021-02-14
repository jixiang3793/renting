'use strict';

const spiderDataItemTable = require('../../database/tables/spiderdataitem');

module.exports = app => {
    
    const SpiderDataItemTable = app.model.define('spiderdataitem', spiderDataItemTable);
    // Role.associate = () => {
    //   Role.belongsToMany(app.model.User, {
    //     through: app.model.UserRole
    //   });
    // };
  return SpiderDataItemTable;
};