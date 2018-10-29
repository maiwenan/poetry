'use strict';

const Mock = require('mockjs');
const enhancer = require('./enhancer');
const { Random } = Mock;

exports.post = (post = {}) => {
  const userId = exports.id();

  return Object.assign({
    user: userId,
    title: Random.csentence(10),
    pictureUrls: [
      `https://${Random.domain()}`,
      `https://${Random.domain()}`,
      `https://${Random.domain()}`,
    ],
    text: Random.sentence(5),
    category: exports.id(),
    tags: [
      Random.word(),
      Random.word(),
    ],
  }, post);
};

exports.posts = (times = 5) => {
  return exports.loop(exports.post, times);
};

exports.createPosts = async (times = 5) => {
  return exports.createEntities(times);
};

exports.createPost = async () => {
  const result = await exports.createPosts(1);

  return result[0];
};

module.exports = enhancer(module.exports, 'Post');
