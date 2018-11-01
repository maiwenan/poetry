'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/post-mock');
const categoryMock = require('../../mock/category-mock');
const userMock = require('../../mock/user-mock');


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
      const category = await categoryMock.createCategory();
      const user = await userMock.createUser();
      const post = await ctx.service.post.create(mock.post({
        user: user.id,
        category: category.id,
      }));
      const result = await ctx.service.post.findById(post.id);

      assert(post.id === result.id);
      assert(user.id === result.user.id);
      assert(category.id === result.category.id);
      assert(result.status === 1);
    });

    it('根据 id 查询已假删的 post ，查询不到', async () => {
      const ctx = app.mockContext();
      const category = await categoryMock.createCategory();
      const user = await userMock.createUser();
      const post = await ctx.service.post.create(mock.post({
        user: user.id,
        category: category.id,
        status: 0,
      }));
      const result = await ctx.service.post.findById(post.id);

      assert(result === null);
    });
  });

  describe('findByUser', () => {
    it('查找某个用户的所有 post ，成功', async () => {
      const ctx = app.mockContext();
      const { Post } = ctx.model;
      await Post.deleteMany().exec();

      const user1 = await userMock.createUser();
      await mock.createPosts(5, {
        user: user1.id,
      });
      const user2 = await userMock.createUser();
      await mock.createPosts(5, {
        user: user2.id,
      });

      let result = await ctx.service.post.findByUser(user1.id, 1, 3);

      assert(result.length === 3);
      assert(result[0].user.id === user1.id);

      result = await ctx.service.post.findByUser(user2.id, 2, 3);

      assert(result.length === 2);
      assert(result[0].user.id === user2.id);
    });
  });

  describe('findByUser', () => {
    it('查找某个用户的所有 post ，成功', async () => {
      const ctx = app.mockContext();
      const { Post } = ctx.model;
      await Post.deleteMany().exec();

      const user1 = await userMock.createUser();
      await mock.createPosts(5, {
        user: user1.id,
      });
      const user2 = await userMock.createUser();
      await mock.createPosts(5, {
        user: user2.id,
      });

      let result = await ctx.service.post.findByUser(user1.id, 1, 3);
      assert(result.length === 3);
      assert(result[0].user.id === user1.id);

      result = await ctx.service.post.findByUser(user2.id, 2, 3);
      assert(result.length === 2);
      assert(result[0].user.id === user2.id);
    });
  });

  describe('findAll', () => {
    it('查找所有的 post ，成功', async () => {
      const ctx = app.mockContext();
      const { Post } = ctx.model;
      await Post.deleteMany().exec();
      const posts = await mock.createPosts(20);

      let result = await ctx.service.post.findAll({}, 1, 10);
      assert(result.length === 10);

      result = await ctx.service.post.findAll({
        title: posts[0].title,
      }, 1, 10);
      assert(result.length === 1);
    });
  });
});
