/**
 * 发文
 */

'use strict';

module.exports = app => {
  const { mongoose } = app;
  const schema = new mongoose.Schema({
    userId: {
      type: String,
      index: true,
      required: [ true, 'userId is required' ],
    },
    title: {
      type: String,
      maxlength: [ 50, 'title is no more than 50 characters' ],
    },
    pictureUrls: {
      type: [ String ],
      required: [ function() {
        return !this.pictureUrls.length;
      }, 'picture is required' ],
    },
    text: {
      type: String,
      maxlength: [ 250, 'post content is no more than 250 characters' ],
    },
    lookNum: {
      type: Number,
      default: 0,
    },
    likeNum: {
      type: Number,
      default: 0,
    },
    // 0 表示公开，1表示自己可看
    privacy: {
      type: Number,
      default: 0,
    },
    categoryIds: {
      type: [ String ],
      required: [ function() {
        return !this.categoryIds.length;
      }, 'category is required' ],
    },
    tags: [ String ],
    status: {
      type: Number,
      default: 1,
      // 0 for delete, 1 for nomal
      enum: [ 0, 1 ],
    },
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  });

  return mongoose.model('Post', schema);
};
