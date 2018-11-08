'use strict';

const ErrorService = require('../base/error-service');

class UserService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.User = model.User;
    this.tokenLog = this.ctx.service.tokenLog;
    this.secretProjection = '-password -salt';
  }

  /**
   * 创建新用户
   * @param {User} user 用户信息对象
   * @return {User} 新用户信息对象
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

    // 去掉用户密码和加密盐
    user.password = undefined;
    user.salt = undefined;
    return user;
  }

  /**
   * 注册新用户
   * @param {User} user 用户信息
   * @return {User} 带 token 用户信息
   */
  async register(user) {
    const { tokenLog } = this;
    let userObj = null;

    user = await this.create(user);
    userObj = user.toJSON();
    userObj.token = user.jwtSign();

    // 存储用户登录凭证
    await tokenLog.create(userObj.id, userObj.token);

    return userObj;
  }

  /**
   * 修改用户信息
   * @param {String} userId 用户 id
   * @param {Object} info 用户信息
   * @return {Boolean} 是否修改成功
   */
  async update(userId, info) {
    const { User } = this;
    const query = {
      _id: userId,
    };
    let result = null;

    try {
      info = this.projectFields(info, 'password salt');
      // info.updateAt = new Date();
      result = await User.findOneAndUpdate(query, info).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return !!result;
  }

  /**
   * 通过手机号查询登录账户信息
   * @param {String} phone 用户手机号
   * @return {User} 登录账户信息
   */
  async findAccount(phone) {
    const { User } = this;
    const conditions = {
      phone,
      status: {
        $ne: 0,
      },
    };
    let user = null;

    try {
      user = await User.find({}).findOne(conditions).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return user;
  }

  /**
   * 通过 id 查找用户
   * @param {String} id 用户id
   * @return {User} 用户信息
   */
  async findById(id) {
    const {
      User,
      secretProjection,
    } = this;
    let user = null;

    try {
      user = await User.findById(id, secretProjection).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return user;
  }

  /**
   * 根据用户名查询用户列表，支持模糊查询
   * @param {String} nameword 用户名
   * @param {Number} page 页码
   * @param {Number} pageSize 每页条数
   * @return {Array} 匹配的用户列表
   */
  async findByName(nameword = '', page, pageSize) {
    const {
      User,
      secretProjection,
    } = this;
    const nameRe = new RegExp(nameword, 'i');
    const condition = {
      username: {
        $regex: nameRe,
      },
      status: {
        $ne: 0,
      },
    };
    let users = [];

    try {
      const query = User.find({}, secretProjection)
        .find(condition)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      users = await query.exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return users;
  }
}

module.exports = UserService;
