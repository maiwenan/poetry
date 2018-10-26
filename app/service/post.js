'use strict';

const ErrorService = require('../base/error-service');

class PostService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.Post = model.Post;
  }

  /**
   * 新建 post
   * @param {Post} post post
   * @return {Post} return post
   */
  async create(post) {
    const { Post } = this;
    let {
      userId,
      tags,
    } = post;

    tags = tags.map(name => {
      return {
        userId,
        name,
      };
    });

    // 保存新的 tag
    tags = await this.ctx.service.tag.batchCreate(tags);

    try {
      post = await Post.create(new Post(post));
    } catch (err) {
      this.handleMongooseError(err);
    }

    return post;
  }

  async update(post) {

  }

  async findById() {

  }

  async findByUser(userId, page, pageSize) {
    return await this.findAll({ userId }, page, pageSize);
  }

  async findAll(condition, page, pageSize) {
    const { Post } = this;
    let posts = [];
    const conditions = Object.assign({}, condition, {
      status: {
        $ne: 0,
      },
    });

    try {
      const query = Post.find(conditions)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      posts = await query.exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return posts;
  }
}

module.exports = PostService;
