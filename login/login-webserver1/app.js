/**
 *
 * @file server入口文件
 *
 */

const Koa = require('koa');  // 引入koa框架
const path = require('path');  // node的原生模块
const logger = require('koa-logger');  // development环境下的日志打印
const assets = require('koa-static');  // 静态文件的获取
const mongo = require('koa-mongo');  //连接mongo数据库
const render = require('./lib/render'); // 渲染函数
const koaBody = require('koa-body'); //解析body
const session = require('koa-session2'); //session存储模块

/**
 * 载入配置  开发环境和生产环境的配置信息
 */
const env = require('./config/env.json');
const config = require(`./config/config.${env.env}.json`);
const mongoConf = config.mongo;

/**
 * 静态资源文件路径
 */
const staticPath = '/web';

const app = new Koa();
const router = require('./router/index');  // 导入路由文件

// session的配置信息
const SESSION_CONFIG = {
    key: 'SESSIONID',
    maxAge: 60000 * 60 * 24
};
/**
 * 中间件的使用
 */
app.use(mongo(mongoConf));  // 连接mongo数据库的中间件
app.use(logger()); // 控制台打印日志信息
app.use(render);  // render的中间件使用
app.use(koaBody());  // body信息的解析中间件
// app.use(koaBody({   body文件上传下载设置
//     multipart: true,
//     formidable: {
//         uploadDir: path.join(__dirname, '/public/uploads'),  // 文件上传路径
//         keepExtensions: true,  // 保持文件扩展名
//         maxFieldsSize: 200 * 1024 * 1024 //最大的文件容量
//     }
// }))
app.use(assets(__dirname + staticPath));  //静态文件中间件
app.use(session(SESSION_CONFIG)); // session中间件
app.use(router.routes()); // 路由中间件

// log
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    const now = new Date().toString();
    console.log(`[${now}] ${ctx.method} ${ctx.url} - ${rt}`);
});

app.listen(config.port);
