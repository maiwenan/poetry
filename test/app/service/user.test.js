'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('创建新用户', () => {
    it('创建成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = {
        username: 'mhaw',
        password: '123456',
        phone: '15813312732',
      };
      const user = await ctx.service.user.create(new User(data));

      assert.deepStrictEqual({
        username: user.username,
        phone: user.phone,
      }, {
        username: data.username,
        phone: data.phone,
      });
      assert(user.password !== data.password);
    });
  });
});
