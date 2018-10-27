'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/token-log-mock');


describe('test/app/service/token-log.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('create', () => {
    it('存储token成功', async () => {
      const ctx = app.mockContext();
      const {
        user,
        token,
      } = mock.tokenLog();
      const tokenLog = await ctx.service.tokenLog.create(user, token);

      assert(tokenLog.id !== undefined);
      assert(tokenLog.user === user);
      assert(tokenLog.token === token);
    });
  });
});
