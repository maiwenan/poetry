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
      user.repeatPassword = user.password;
      const res = await app.httpRequest()
        .post('/api/v1/users')
        .set('Accept', 'application/json')
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

  describe('post /api/v1/authorize', () => {
    it('用户登录成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const user = mock.user();
      await ctx.service.user.register(new User(user));
      const res = await app.httpRequest()
        .post('/api/v1/authorize')
        .set('Accept', 'application/json')
        .send({
          phone: user.phone,
          password: user.password,
        })
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
