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

  /**
   * 批量保存标签
   * @param {Array} tags 标签集
   * @return {Array} 保存后的标签集
   */
  async batchCreate(tags) {
    const { Tag } = this;
    const result = [];

    try {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        let temp = await Tag.findOne().exec();

        if (!temp) {
          temp = await Tag.create(tag);
        }
        result.push(temp);
      }
    } catch (err) {
      this.handleMongooseError(err);
    }

    return result;
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
