'use strict';

const Mock = require('mockjs');
const enhancer = require('./enhancer');
const { Random } = Mock;

exports.category = (category = {}) => {
  const userId = exports.id();

  return Object.assign({
    user: userId,
    name: Random.cname(),
    description: Random.sentence(),
  }, category);
};

exports.createCategories = async (times = 5) => {
  return exports.createEntities(times);
};

exports.createCategory = async () => {
  const result = await exports.createCategories(1);

  return result[0];
};

module.exports = enhancer(module.exports, 'Category');
