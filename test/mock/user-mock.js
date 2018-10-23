'use strict';

const { app } = require('egg-mock/bootstrap');
const Mock = require('mockjs');
const Random = Mock.Random;
const enhancer = require('./enhancer');

exports.user = (user = {}) => {
  const phone = exports.phone();

  return Object.assign({
    phone,
    username: Random.first(),
    avatar: exports.url(),
    password: Random.string(6, 15),
    introduction: Random.sentence(),
  }, user);
};

exports.createUsers = async (times = 5) => {
  const ctx = app.mockContext();
  const { User } = ctx.model;
  const users = exports.loop(() => {
    let user = exports.user();

    user = new User(user);
    user.encryptPassword();
    return user;
  }, times);
  const result = await User.create(users);

  return result;
};

exports.createUser = async () => {
  const users = await exports.createUsers(1);

  return users[0];
};

module.exports = enhancer(module.exports, 'User');
