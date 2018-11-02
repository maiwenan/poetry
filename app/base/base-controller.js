'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  parse(params, fields = '', spliter = /\s+/) {
    const result = {};

    fields = fields.split(spliter);
    fields.forEach(field => {
      result[field] = params[field];
    });

    return result;
  }

  assert(value, status, msg, opts) {
    this.ctx.assert(value, status, msg, opts);
  }

  assertError(error, status = 400) {
    this.assert(!error, status, error.message, { error });
  }

  /**
   * API 接口输出数据
   * @param {Any} data 任意数据响应数据
   * @param {Number} status 状态码
   */
  json(data = null, status = 200) {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data,
    };
    this.ctx.status = status;
  }
}

module.exports = BaseController;
