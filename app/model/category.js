/**
 * 分类
 */

'use strict';

module.exports = app => {
  const { mongoose } = app;

  const schema = new mongoose.Schema({
    userId: {
      type: String,
      required: [ true, 'userId is required' ],
    },
    name: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      maxlength: [ 10, 'name is no more than 10 characters' ],
    },
    description: {
      type: String,
      maxlength: [ 250, 'description is no more than 250 characters' ],
    },
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

  return mongoose.model('Category', schema);
};
