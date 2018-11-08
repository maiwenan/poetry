'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/user-mock');

describe('test/app/service/user.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('create', () => {
    it('创建成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user();
      const user = await ctx.service.user.create(new User(data));

      assert.deepStrictEqual({
        username: user.username,
        phone: user.phone,
      }, {
        username: data.username,
        phone: data.phone,
      });
      assert(user.password !== data.password);
      assert(user.status === 1);
    });
  });

  describe('register', () => {
    it('注册成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const data = mock.user();
      const user = await ctx.service.user.register(new User(data));

      assert(user.password !== data.password);
      assert(user.status === 1);
      assert(user.token !== undefined);
    });
  });

  describe('update', () => {
    it('更新用户信息成功', async () => {
      const ctx = app.mockContext();
      const { User } = ctx.model;
      const user = await mock.createUser();
      const temp = {
        username: 'test-update',
      };
      const s = await ctx.service.user.update(user.id, temp);
      const result = await User.findById(user.id).exec();

      console.log(s, '-----------');
      assert(s !== null);
      assert(result.username === temp.username);
    });
  });

  describe('findAccount', () => {
    it('成功找到账户', async () => {
      const user = await mock.createUser();
      const ctx = app.mockContext();
      const account = await ctx.service.user.findAccount(user.phone);

      assert(user.username === account.username);
      assert(account.status === 1);
    });
  });

  describe('findById', () => {
    it('id查找用户成功', async () => {
      const user = await mock.createUser();
      const ctx = app.mockContext();
      const account = await ctx.service.user.findById(user.id);

      assert(user.id === account.id);
      assert(account.password === undefined);
      assert(account.status === 1);
    });
  });

  describe('findByName', () => {
    it('用户名模糊查找用户成功', async () => {
      await mock.createUsers(5);

      const ctx = app.mockContext();
      const userlist = await ctx.service.user.findByName('', 1, 5);

      assert(userlist.length === 5);
    });
  });
});
