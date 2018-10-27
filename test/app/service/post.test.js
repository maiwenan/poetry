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
});
