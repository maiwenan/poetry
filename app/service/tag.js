'use strict';

const ErrorService = require('../base/error-service');

class TagService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.Tag = model.Tag;
  }

  /**
   * 新建标签
   * @param {Tag} tag 标签
   * @return {Tag} 标签信息
   */
  async create(tag) {
    const tags = await this.batchCreate([ tag ]);

    return tags[0];
  }

  async batchCreate(tags) {
    const { Tag } = this;

    tags = tags.map(tag => new Tag(tag));
    try {
      tags = await Tag.create(tags);
    } catch (err) {
      this.handleMongooseError(err);
    }

    return tags;
  }

  /**
   * 查询所有标签
   * @return {Array} 返回所有标签
   */
  async findAll() {
    const { Tag } = this;
    const condition = {
      status: {
        $ne: 0,
      },
    };
    let result = [];

    try {
      result = await Tag.find(condition).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return result;
  }
}

module.exports = TagService;
