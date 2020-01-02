
const Router = require('koa-router');
const loginRouter = require('./login');
// const isLoginRouter = require('./isLogin');

const koaJwt = require('koa-jwt2');
const jstConfig = require('../config/jwt');
const loginMiddleware = require('../middleware/loginMiddleware');

const indexRouter = new Router({
    prefix: '/api'
});

function fromHeaderOrQuerystring(ctx) {
    if (
        ctx.headers.authorization &&
        ctx.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return ctx.headers.authorization.split(" ")[1];
    } else if (ctx.query && ctx.query.token) {
        return ctx.query.token;
    }
    return null;
}

indexRouter.use(['/login'], loginRouter.routes(), loginRouter.allowedMethods());
// indexRouter.use(['/schema'], [koaJwt({secret: jstConfig.secret.LOGIN, getToken: fromHeaderOrQuerystring}), loginMiddleware.common], schemaRouter.routes(), schemaRouter.allowedMethods());
// indexRouter.use(['/islogin'], [koaJwt({secret: jstConfig.secret.LOGIN}), loginMiddleware.common], isLoginRouter.routes(), isLoginRouter.allowedMethods());
// indexRouter.use(['/user'], [koaJwt({secret: jstConfig.secret.LOGIN}), loginMiddleware.common], userRouter.routes(), userRouter.allowedMethods());


module.exports = (app) => {
    app.use(indexRouter.routes(), indexRouter.allowedMethods())
};
