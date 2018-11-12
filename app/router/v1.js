'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    middleware,
  } = app;
  const {
    authorize,
  } = middleware;
  const {
    user,
  } = controller.v1;

  /**
   * 用户
   */
  // 注册用户
  router.post('/api/v1/users', user.create);
  // 登录验证
  router.post('/api/v1/authorize', user.authorize);
  // 更新用户
  router.put('/api/v1/users/:id', authorize(), user.update);
  // 查看用户详情
  router.get('/api/v1/users/:id', authorize(), user.show);
  // 搜索用户
  router.post('/api/v1/users', authorize(), user.index);
};
