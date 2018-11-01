'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const {
    user,
  } = controller.v1;

  /**
   * 用户
   */
  // 注册用户
  router.post('/api/v1/users', user.create);
  // 更新用户
  router.put('/api/v1/users/:id', user.update);
  // 查看用户详情
  router.get('/api/v1/users/:id', user.show);
  // 搜索用户
  router.post('/api/v1/users', user.index);
};
