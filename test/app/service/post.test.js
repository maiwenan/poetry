'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/post-mock');


describe('test/app/service/post.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('create', () => {
    it('新增post成功', async () => {
      const ctx = app.mockContext();
      const post = mock.post();
      const result = await ctx.service.post.create(post);

      assert(result.id !== undefined);
      assert(result.title === post.title);
      assert(result.status === 1);
    });
  });

  describe('disabledPost', () => {
    it('删除 post （假删）成功', async () => {
      const ctx = app.mockContext();
      const { Post } = ctx.model;
      const post = mock.post();
      const newPost = await ctx.service.post.create(post);
      await ctx.service.post.disabledPost(newPost.id);
      const result = await Post.findById(newPost.id);

      assert(result.id === newPost.id);
      assert(result.status === 0);
    });
  });

  describe('findById', () => {
    it('根据 id 查询 post 成功', async () => {
      const ctx = app.mockContext();
      const post = await mock.createPost();
      const newPost = await ctx.service.post.findById(post.id);
      await ctx.service.post.disabledPost(newPost.id);
      const result = await ctx.service.post.findById(newPost.id);

      console.log(post);
      assert(post.id === newPost.id);
      assert(newPost.status === 1);
      assert(result === null);
    });
  });
});
