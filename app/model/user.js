/**
 * 用户
 */
'use strict';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ms = require('ms');

module.exports = app => {
  const { mongoose } = app;
  const schema = mongoose.Schema({
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      required: [ true, 'username is reuiqred' ],
      maxlength: [ 50, 'username is no more than 50 characters' ],
    },
    avatar: {
      type: String,
      match: [ /^http(s)?:\/\//, 'avatar formatter is error' ],
      maxlength: [ 400, 'avatar is no more than 400 characters' ],
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      required: [ true, 'phone is required' ],
      match: [ /^\d{11}$/, 'phone formatter is error' ],
    },
    introduction: {
      type: String,
      maxlength: [ 250, 'introduction is no more than 250 characters' ],
    },
    password: {
      type: String,
      required: [ true, 'password is required' ],
      minlength: [ 6, 'password is no less than 6 characters' ],
      maxlength: [ 64, 'password is no mothan than 64 characters' ],
    },
    // private salt
    salt: {
      type: String,
      default() {
        return Date.now().toString();
      },
    },
    status: {
      type: Number,
      default: 1,
      // 0 for delete, 1 for nomal
      enum: [ 0, 1 ],
    },
  }, {
    toJSON: { virtuals: true, getters: true },
    timestamps: true,
  });

  schema.methods = {
    encryptPassword() {
      const {
        password,
        salt,
      } = this;

      this.password = encryptPassword(password, salt);
    },

    verifyPassword(password) {
      return this.password === encryptPassword(password, this.salt);
    },

    jwtSign() {
      const now = Date.now();
      const token = jwt.sign({
        user: this.toJSON(),
        exp: Math.floor((ms('7d') + now) / 1000),
        iat: Math.floor(now / 1000),
        iss: 'poetry',
        sub: 'user',
        aud: this.username,
        jti: this.id + now,
      }, app.config.secret);

      return token;
    },
  };

  schema.statics = {
    jwtVerify(token) {
      return jwtVerify(token);
    },
  };

  /**
   * verify token
   * @param {string} token user token
   * @return {object} decoded payload
   */
  function jwtVerify(token) {
    return jwt.verify(token, app.config.secret);
  }


  /**
   * encryt password
   * @param {string} password password for user
   * @param {string} salt salt for user
   * @return {string} password
   */
  function encryptPassword(password, salt) {
    const hmac = crypto.createHmac('sha256', password);

    return hmac.update(salt).digest('hex');
  }

  return mongoose.model('User', schema);
};
