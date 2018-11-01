'use strict';

const BaseController = require('../../base/base-controller');

class UserController extends BaseController {
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

    this.echo(user);
  }

  async index() {

  }
}

module.exports = UserController;
