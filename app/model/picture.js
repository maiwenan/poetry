/**
 * 图片
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
    url: {
      type: String,
      required: [ true, 'url is required' ],
      unique: true,
      maxlength: [ 400, 'url is no more than 400 characters' ],
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

  return mongoose.model('Picture', schema);
};
