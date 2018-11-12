'use strict';

/**
 * 用户鉴权，并增加属性： request.user
 */

module.exports = () => {
  return async function authorize(ctx, next) {
    const ticket = ctx.get('Authorization') || ctx.request.body.Authorization;

    ctx.assert(ticket, 401, '缺少Authorization');

    const tokens = ticket.split(/\s+/);
    const {
      User,
    } = ctx.model;
    const valid = tokens.length === 2 && tokens[0].toUpperCase() === 'BEARER';

    ctx.assert(valid, 401, 'Authorization格式错误');

    try {
      const decoded = User.jwtVerify(tokens[1]);

      ctx.request.user = decoded.user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ctx.throw(403, 'authorization已过期', { error });
      } else {
        ctx.throw(403, 'authorization不合法', { error });
      }
    }

    await next();
  };
};
