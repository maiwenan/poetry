'use strict';

const ErrorService = require('../base/error-service');

class UserService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.User = model.User;
  }

  /**
   * create new user
   * @param {User} user user info
   * @return {User} new user object
   */
  async create(user) {
    const { User } = this;

    try {
      user.encryptPassword();
    } catch (err) {
      this.handleServerError(err);
    }

    try {
      user = await User.create(user);
    } catch (err) {
      this.handleMongooseError(err);
    }

    // do not expose password
    user.password = undefined;
    user.salt = undefined;
    return user;
  }

  async register(user) {
    user = await this.create(user);
    return user;
  }
}

module.exports = UserService;
