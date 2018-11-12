'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  /**
   * 当前用户
   * 依赖 `./middleware/authorize.js` 实现
   * @readonly
   * @memberof ApiController
   */
  get user() {
    return this.ctx.request.user;
  }

  /**
   * 解析请求参数
   * @param {Object} params 请求参数对象
   * @param {String} fields 需要提取的字段
   * @param {String} spliter 字段分割符
   * @return {Object} 返回所需的参数对象
   */
  parse(params, fields = '', spliter = /\s+/) {
    const result = {};

    fields = fields.split(spliter);
    Object.keys(params).forEach(field => {
      if (fields.indexOf(field) !== -1) {
        result[field] = params[field];
      }
    });

    return result;
  }

  assert(value, status, msg, opts) {
    this.ctx.assert(value, status, msg, opts);
  }

  assertError(error, status = 400) {
    const message = error && error.message;

    this.assert(!error, status, message, { error });
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
