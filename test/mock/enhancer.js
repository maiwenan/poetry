'use strict';

const Mock = require('mockjs');
const { app } = require('egg-mock/bootstrap');
const { Random } = Mock;
const enhancer = {};

enhancer.loop = function(fn, times) {
  const result = [];

  for (let i = 0; i < times; i++) {
    result.push(fn());
  }

  return result;
};

enhancer.id = () => {
  return app.mongoose.Types.ObjectId().toString();
};

enhancer.phone = () => {
  return Mock.mock({
    phone: /\d{11}/,
  }).phone;
};

enhancer.url = () => {
  return `https://${Random.domain()}`;
};

module.exports = mock => {
  return Object.assign(mock, enhancer);
};
