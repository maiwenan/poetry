'use strict';

const Mock = require('mockjs');
const enhancer = require('./enhancer');
const { Random } = Mock;

exports.tag = (tag = {}) => {
  const userId = exports.id();

  return Object.assign({
    user: userId,
    name: Random.cname(),
  }, tag);
};

exports.tags = (times = 5) => {
  return exports.loop(exports.tag, times);
};

exports.createTags = async (times = 5) => {
  return exports.createEntities(times);
};

exports.createTag = async () => {
  const result = await exports.createTags(1);

  return result[0];
};

module.exports = enhancer(module.exports, 'Tag');
