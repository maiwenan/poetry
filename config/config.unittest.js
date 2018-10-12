/**
 * 单元测试的环境配置信息
 */

'use strict';

module.exports = () => {
  const config = exports = {};

  // close logger
  config.logger = {
    consoleLevel: 'NONE',
  };

  return config;
};
