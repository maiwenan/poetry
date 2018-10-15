'use strict';

const ErrorService = require('../base/error-service');

class CategoryService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.Category = model.Category;
  }

  /**
   * 新增分类
   * @param {Category} category 分类信息
   * @return {Category} 新分类信息对象
   */
  async create(category) {
    const { Category } = this;
    let cate = new Category(category);

    try {
      cate = await Category.create(cate);
    } catch (err) {
      this.handleMongooseError(err);
    }

    return cate;
  }

  /**
   * 查询所有分类
   * @return {Array} 返回所有分类信息
   */
  async findAll() {
    const { Category } = this;
    const condition = {
      status: {
        $ne: 0,
      },
    };
    let result = [];

    try {
      const query = Category.find({});

      result = await query.find(condition).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return result;
  }
}

module.exports = CategoryService;
