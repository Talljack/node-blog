/**
 *
 * @file render.js 基本模块导入
 */

const views = require('koa-views');
const path = require('path');

module.exports = views(path.join(__dirname, '/../web'));
