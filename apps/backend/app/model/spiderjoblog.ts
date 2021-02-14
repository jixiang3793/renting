'use strict';
const spiderJobLogTable = require('../../database/tables/spiderjoblog');

module.exports = app => {
    
    const SpiderJobLogTable = app.model.define('spiderjoblog', spiderJobLogTable);
    // Role.associate = () => {
    //   Role.belongsToMany(app.model.User, {
    //     through: app.model.UserRole
    //   });
    // };
  return SpiderJobLogTable;
};