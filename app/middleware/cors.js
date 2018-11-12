'use strict';
const koaCors = require('@koa/cors');

module.exports = options => {
  return async function cors(ctx, next) {
    // 接口请求
    if (ctx.path.indexOf('/api/') === 0) {
      return koaCors(options)(ctx, next);
    }

    await next();
  };
};
