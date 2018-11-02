'use strict';

module.exports = appInfo => {
  if (appInfo.env !== 'prod') {
    require('../scripts/load-env');
  }

  const config = exports = {};
  const {
    // PORT,
    AUTHORIZATION_SECRET,
    COOKIE_KEYS,

    DB_URL,
    DB_USER,
    DB_PASSWORD,
  } = process.env;

  // 生成用户 token 的私钥
  config.secret = AUTHORIZATION_SECRET;

  // use for cookie sign key, should change to your own and keep security
  config.keys = COOKIE_KEYS;

  // add your config here
  config.middleware = [];

  config.mongoose = {
    url: DB_URL,
    options: {
      useNewUrlParser: true,
      auth: {
        user: DB_USER,
        password: DB_PASSWORD,
      },
    },
  };

  config.onerrors = {
    json(err, ctx) {
      ctx.body = err;
      ctx.status = 500;
    },
  };

  return config;
};
