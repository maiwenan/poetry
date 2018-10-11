'use strict';

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    if (!user) {
      return;
    }
    return user;
  });
};
