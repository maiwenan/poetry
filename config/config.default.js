'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // 生成用户 token 的私钥
  config.secret = 'mhaw';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1538276287202_1013';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/recorder',
    options: {
      useNewUrlParser: true,
      auth: {
        user: 'mhaw',
        password: '123456',
      },
    },
  };

  return config;
};
