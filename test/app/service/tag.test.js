'use strict';

const {
  app,
  // mock,
  assert,
} = require('egg-mock/bootstrap');
const mock = require('../../mock/tag-mock');


describe('test/app/service/tag.test.js', () => {
  before(async () => {
    await app.mongoose.connection.dropDatabase();
  });

  describe('create', () => {
    it('新增标签成功', async () => {
      const ctx = app.mockContext();
      const tag = mock.tag();
      const result = await ctx.service.tag.create(tag);

      assert(result.id !== undefined);
      assert(result.name === tag.name);
      assert(result.status === 1);
    });
  });

  describe('batchCreate', () => {
    it('批量新增标签成功', async () => {
      const ctx = app.mockContext();
      const tags = mock.tags();
      const tag = await ctx.service.tag.create(tags[0]);
      const result = await ctx.service.tag.batchCreate(tags);

      assert(tag.id !== undefined);
      assert(result.length === 5);
    });
  });

  describe('findAll', () => {
    it('查询所有标签成功', async () => {
      const times = 5;
      const ctx = app.mockContext();
      const { Tag } = ctx.model;
      await Tag.deleteMany().exec();
      await mock.createTags(times);
      const result = await ctx.service.tag.findAll();

      assert(result.length === times);
    });
  });
});
