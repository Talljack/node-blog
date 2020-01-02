/**
 *
 * @file 登录代码片段
 *
 */

const Router = require('koa-router');
const router = new Router();
const url = require('url');


function relogin(ctx) {
    ctx.status = 200;
    ctx.body = {
        code: 302,
        redirectUrl: ctx.headers.referer
    };
}
router.all('*', async (ctx, next) => {
    let token = ctx.headers.authorization;
    let searchUrl = ctx.url;
    if (searchUrl.includes('/getCode') || searchUrl.includes('/login')) {
        await next();
    } else if (searchUrl.includes('/login') === false && !token) {
        relogin(ctx);
    } else if (searchUrl.includes('/getCode') === false && !token) {
        relogin(ctx);
    } else {
        await next();
    }
});

module.exports = router;