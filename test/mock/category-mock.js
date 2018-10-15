'use strict';

const { app } = require('egg-mock/bootstrap');
const Mock = require('mockjs');
const enhancer = require('./enhancer');
const { Random } = Mock;
module.exports = enhancer(module.exports);

exports.category = (category = {}) => {
  const userId = exports.id();

  return Object.assign({
    userId,
    name: Random.name(),
    description: Random.sentence(),
  }, category);
};
