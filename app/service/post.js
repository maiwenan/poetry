'use strict';

const ErrorService = require('../base/error-service');

class PostService extends ErrorService {
  constructor(options) {
    super(options);
    const model = this.ctx.model;

    this.Post = model.Post;
    this.secretProjection = '-password -salt';
  }

  /**
   * 新建 post
   * @param {Post} post post
   * @return {Post} return post
   */
  async create(post) {
    const { Post } = this;
    let {
      user,
      tags,
    } = post;

    tags = tags.map(name => {
      return {
        user,
        name,
      };
    });

    // 保存新的 tag
    await this.ctx.service.tag.batchCreate(tags);

    try {
      post = await Post.create(new Post(post));
    } catch (err) {
      this.handleMongooseError(err);
    }

    return post;
  }

  /**
   * 删除 post （假删）
   * @param {String} id post 的 id
   * @return {Boolean} 是否删除成功
   */
  async disabledPost(id) {
    const { Post } = this;
    const query = {
      _id: id,
    };

    try {
      await Post.findOneAndUpdate(query, {
        status: 0,
      }).exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return true;
  }

  /**
   * 根据 id 查询 post
   * @param {String} id post 的 id
   * @return {Post} 返回匹配的 post 实例
   */
  async findById(id) {
    const {
      Post,
      secretProjection,
    } = this;
    let posts = [];
    const conditions = {
      _id: id,
      status: {
        $ne: 0,
      },
    };

    try {
      const query = Post.find(conditions)
        .populate('user', secretProjection)
        .populate('category');

      posts = await query.exec();
    } catch (err) {
      this.handleMongooseError(err);
    }

    return posts[0] || null;
  }

  /**
   * 查找某个用户的所有 post
   * @param {String} userId 发布者 id
   * @param {Number} page 页码
   * @param {Number} pageSize 每页条数
   * @return {Array} post 集合
   */
  async findByUser(userId, page, pageSize) {
    return await this.findAll({ user: userId }, page, pageSize);
  }

  /**
   * 查找所有的 post
   * @param {Object} condition 查询条件
   * @param {Number} page 页码
   * @param {Number} pageSize 每页条数
   * @return {Array} post 集合
   */
  async findAll(condition, page, pageSize) {
    const {
      Post,
      secretProjection,
    } = this;
    let posts = [];
    const conditions = Object.assign({}, condition, {
      status: {
        $ne: 0,
      },
    });

    try {
      const query = Post.find(conditions)
        .populate('user', secretProjection)
        .populate('category')
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
