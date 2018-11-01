'use strict';

const Mock = require('mockjs');
const { app } = require('egg-mock/bootstrap');
const { Random } = Mock;

module.exports = (mock, modelName) => {
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

  enhancer.createEntities = async (times, defEntity, md) => {
    const ctx = app.mockContext();
    const Model = ctx.model[modelName];
    const entities = enhancer.loop(() => {
      let entity = mock[modelName.toLowerCase()](defEntity);

      entity = new Model(entity);
      if (md) {
        entity = md(entity);
      }
      return entity;
    }, times);
    const result = await Model.create(entities);

    return result;
  };

  return Object.assign(mock, enhancer);
};
