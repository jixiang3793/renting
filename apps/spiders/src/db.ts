const { Sequelize } = require('sequelize');
const spiderJobLogTable = require('../../backend/database/tables/spiderjoblog');
const spiderDataItemTable = require('../../backend/database/tables/spiderdataitem');


const sequelize = new Sequelize('renting', 'root', 'gzx12345678', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

sequelize.define('spiderjoblog', spiderJobLogTable);
sequelize.define('spiderdataitem', spiderDataItemTable);

module.exports = sequelize;
