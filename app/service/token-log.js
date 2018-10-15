'use strict';

const ErrorService = require('../base/error-service');

class TokenLogService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.TokenLog = model.TokenLog;
  }

  /**
   *
   * @param {String} userId 用户 id
   * @param {String} token 用户登录token
   * @return {TokenLog} token 记录项
   */
  async create(userId, token) {
    const { TokenLog } = this;
    let tokenLog = new TokenLog({
      userId,
      token,
    });

    try {
      tokenLog = await TokenLog.create(tokenLog);
    } catch (err) {
      this.handleMongooseError(err);
    }

    return tokenLog;
  }
}

module.exports = TokenLogService;
