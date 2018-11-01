'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  /**
   * API 接口输出数据
   * @param {Any} data 任意数据响应数据
   * @param {Number} status 状态码
   */
  echo(data = null, status = 200) {
    this.ctx.body = {
      code: 0,
      message: 'success',
      data,
    };
    this.ctx.status = status;
  }
}

module.exports = BaseController;
