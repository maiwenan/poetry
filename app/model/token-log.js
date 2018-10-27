/**
 * record jwt
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
    token: {
      type: String,
      unique: true,
      index: true,
      required: [ true, 'token is required' ],
    },
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  });

  return mongoose.model('TokenLog', schema);
};
