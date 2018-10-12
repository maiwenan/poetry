'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log('before index');

    this.logger.debug('index req....');
    this.ctx.body = 'hi, egg';
    console.log('after index');
  }

  async login() {
    this.ctx.body = 'login page...';
  }

  async success() {
    this.ctx.body = 'login success111...';
  }
}

module.exports = HomeController;
