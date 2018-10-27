'use strict';

const { app } = require('egg-mock/bootstrap');
const Mock = require('mockjs');
const enhancer = require('./enhancer');
const { Random } = Mock;

exports.tokenLog = (tokenLog = {}) => {
  const userId = exports.id();

  return Object.assign({
    user: userId,
    token: Random.string(12),
  }, tokenLog);
};

exports.createTokenLogs = async (times = 5) => {
  const ctx = app.mockContext();
  const { TokenLog } = ctx.model;
  const tokenLogs = exports.loop(() => {
    let tokenLog = exports.tokenLog();

    tokenLog = new TokenLog(tokenLog);
    tokenLog.encryptPassword();
    return tokenLog;
  }, times);
  const result = await TokenLog.create(tokenLogs);

  return result;
};

exports.createTokenLog = async () => {
  const tokenLogs = await exports.createTokenLogs(1);

  return tokenLogs[0];
};

module.exports = enhancer(module.exports, 'TokenLog');
