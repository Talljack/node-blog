const Router = require('koa-router');
const router = new Router();
const jwt = require("jsonwebtoken");
const url = require('url');
const SECRET = require('../config/token.secret.js').SECRET;

function relogin(ctx) {
    ctx.status = 200;
    ctx.body = {
        code: 302,
        redirectUrl: ctx.headers.referer
    };
}

router.all('*', async (ctx, next) => {
    let token = ctx.headers.authorization || '';
    let refreshToken = ctx.headers.refresh_token || '';
    let payloadToken = jwt.verify(token, SECRET);
    let {
        time,
        timeout
    } = payloadToken;
    let expireTimeToken = time + timeout;
    let {
        refresh_time,
        refresh_timeout
    } = refreshToken;
    let refreshExpireTime = refresh_time + refresh_timeout;
    let nowTime = new Date().getTime();
    let searchUrl = ctx.url;
    // 验证refresh_token
    if (searchUrl.includes('/getCode') || searchUrl.includes('/login')) {
        await next();
    } else if (!searchUrl.includes('/getCode') && (!token || nowTime > expireTime)) {
        // token已过期
        if (nowTime > refreshExpireTime) {
            relogin(ctx);
        } else {
            // 不需要登录 实现刷新token
            relogin(ctx);
        }
    } else if (!searchUrl.includes('/login') && (!token || nowTime > expireTime)) {
        relogin(ctx);
    } else {
        await next();
    }
})

module.exports = router;