'use strict';

const VALID_ENV = [ 'prod', 'sit', 'unittest', 'local' ];
const path = require('path');
const assert = require('assert');
const fs = require('fs');

assert(VALID_ENV.indexOf(process.env.EGG_SERVER_ENV) !== -1, `环境变量EGG_SERVER_ENV必须是 ${VALID_ENV} 其中之一`);

// 获取变量文件路径
const envPath = path.resolve(__dirname, `../env/.${process.env.EGG_SERVER_ENV}.env`);

assert(fs.existsSync(envPath) === true, `${envPath} 变量文件不存在`);


// 加载环境变量
require('dotenv').config({
  path: envPath,
});
