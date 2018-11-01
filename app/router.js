'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  require('./router/v1')(app);

  router.get('/', controller.home.index);
  // router.get('/success', controller.home.success);
  // router.get('/login', controller.home.login);

  // const localStrategy = app.passport.authenticate('local', {
  //   successRedirect: '/success',
  //   failureRedirect: '/login',
  // });
  // router.post('/login', localStrategy);
};
