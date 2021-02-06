'use strict';
const userTable = require('../../database/tables/user');

module.exports = app => {
    
    const user = app.model.define('user', userTable);
    // console.log("model user ...",app.model);
  return user;
};