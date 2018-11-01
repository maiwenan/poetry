'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {

  }

  async authorize() {

  }

  async update() {

  }

  async show() {
    const {
      ctx,
      service,
    } = this;
    const userId = ctx.params.id;
    const user = await service.user.findById(userId);

  }

  async index() {

  }
}

module.exports = UserController;
