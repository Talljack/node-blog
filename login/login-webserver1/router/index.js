/**
 *
 * @file api入口文件
 *
 */

const Router = require('koa-router');
const url = require('url');

/**
 * 载入配置
 */
const env = require('../config/env.json');
const config = require(`../config/config.${env.env}.json`);
const intercept = require('../intercept');
// const uuap = require('../uuap');

// const dataApi = require('./api/data');
// const tagApi = require('./api/tag');
// const mtypeApi = require('./api/mtype');
// const datatypeApi = require('./api/datatype'); // -----------------new
// const bookApi = require('./api/book');
// const verifyApi = require('./api/verify');
const loginApi = require('./api/login');

// uuap白名单设置
// const uuapConf = config.uuap;

let router = new Router();

router.use('/api/*', intercept.routes(), intercept.allowedMethods())
    .use('/api/logout/', logout)
    // 数据 API
    .post('/api/login', loginApi.login)

    // 页面路由
    .get('/', index)
    .get('/main', index)
    // .get('/data/:id', index)
    // .get('/evd/:id', index)
    // .get('/tag', index)
    // .get('/type', index)
    // .get('/user', index)
    // .get('/datatype', index)
    // .get('/BookSearch', index)
    // .get('/kgShow ', index)
    // .get('/book', index)
    // .get('/nor/:id', index)
    // .get('/MarkDetail', index)
    // .get('/MarkDetail/:id', index)
    // .get('/case', index)
    // .get('/CountReport', index);

/**
 * 注销
 *
 * @param {Object} ctx 请求消息
 */
async function logout(ctx) {
    delete ctx.session.views;
    ctx.cookies.set('username', null);
    let redirecturl = url.format({
        protocol: uuapConf.protocol,
        hostname: uuapConf.hostname,
        port: uuapConf.port,
        pathname: '/logout',
        query: {
            service: url.format({
                protocol: ctx.protocol,
                host: ctx.host,
                hostname: ctx.hostname,
                port: ctx.port
            })
        }
    });
    console.log('**************logout****************');
    ctx.body = {
        code: 302,
        redirectUrl: redirecturl
    };
}

/**
 * 页面请求
 *
 *  @param {Object} ctx ctx
 */
async function index(ctx) {
    await ctx.render('index');
    ctx.type = 'text/html; charset=utf-8';
}

module.exports = router;
