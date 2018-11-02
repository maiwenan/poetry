'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../../mock/user-mock');

describe('test/app/controller/v1/user.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('post /api/v1/users', () => {
    it('注册用户成功', async () => {
      const user = mock.user();
      const res = await app.httpRequest()
        .post('/api/v1/users')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200);
      const {
        code,
        data,
      } = res.body;

      assert(code === 0);
      assert(data.phone === user.phone);
      assert(data.token);
    });
  });
});
