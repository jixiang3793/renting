import { EggAppConfig, PowerPartial } from 'egg';
const path = require('path');

export default (appInfo) => {
  const config: PowerPartial<EggAppConfig> = {
    // 单数据库信息配置
    // client: {
    //   // host
    //   host: 'localhost',
    //   // 端口号
    //   port: '3306',
    //   // 用户名
    //   user: 'root',
    //   // 密码
    //   password: 'gzx12345678',
    //   // 数据库名
    //   database: 'renting',
    // },
    // static: {
    //   prefix: '/public/',
    //   dir: path.join(appInfo.baseDir, 'app/public')
    // },
    security: {
      domainWhiteList: [ ],
      csrf: {
        enable: false,
      }
    },
    sequelize: {
      username: "root",
      password: "gzx12345678",
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      database: 'renting',
    },
    view: {
      mapping: {
        '.html': 'nunjucks',
      },
      root: path.join(appInfo.baseDir, 'app/public'),
    },
    assets: {
      publicPath: '/public/',
    },
    
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  return config;
};
