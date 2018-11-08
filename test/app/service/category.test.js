'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/category-mock');


describe('test/app/service/category.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('create', () => {
    it('新增分类成功', async () => {
      const ctx = app.mockContext();
      const category = mock.category();
      const result = await ctx.service.category.create(category);

      assert(result.id !== undefined);
      assert(result.name === category.name);
      assert(result.status === 1);
    });
  });

  describe('update', () => {
    it('更新分类成功', async () => {
      const ctx = app.mockContext();
      const { Category } = ctx.model;
      const category = await mock.createCategory();
      const temp = {
        name: 'test-update',
      };
      await ctx.service.category.update(category.id, temp);
      const result = await Category.findById(category.id).exec();

      assert(result.name === temp.name);
    });
  });

  describe('findAll', () => {
    it('查询所有分类成功', async () => {
      const times = 5;
      const ctx = app.mockContext();
      const { Category } = ctx.model;
      await Category.deleteMany().exec();
      await mock.createCategories(times);
      const result = await ctx.service.category.findAll();

      assert(result.length === times);
    });
  });
});
