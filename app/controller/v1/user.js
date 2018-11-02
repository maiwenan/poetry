'use strict';

const BaseController = require('../../base/base-controller');

class UserController extends BaseController {
  async create() {
    const {
      request,
      model,
      service,
    } = this.ctx;
    const params = this.parse(request.body, 'phone password repeatPassword username avatar introduction');

    this.assert(params.password === params.repeatPassword, 400, '密码不一致');

    let user = new model.User(params);
    const error = user.validateSync();

    this.assertError(error);

    user = await service.user.register(user);
    this.json(user);
  }

  async authorize() {
    const {
      request,
      model,
      service,
    } = this.ctx;
    const message = '账号或密码不正确';
    const params = this.parse(request.body, 'phone password');
    let user = new model.User(params);
    const error = user.validateSync();

    this.assertError(error);

    user = await service.user.findAccount(params.phone);

    this.assert(user, 400, message);
    this.assert(user.verifyPassword(params.password), 400, message);

    const result = user.toJSON();
    result.token = user.jwtSign();
    delete result.password;
    delete result.salt;

    this.json(result);
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

    this.json(user);
  }

  async index() {

  }
}

module.exports = UserController;
