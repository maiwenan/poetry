/**
 * 标签
 */

'use strict';

module.exports = app => {
  const { mongoose } = app;
  const schema = new mongoose.Schema({
    user: {
      type: String,
      ref: 'User',
      required: [ true, 'user is required' ],
    },
    name: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      required: true,
      maxlength: [ 10, 'name is no more than 10 characters' ],
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

  return mongoose.model('Tag', schema);
};
