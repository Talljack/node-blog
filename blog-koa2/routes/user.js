const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    let result = await loginCheck(username, password);
    if (result.username) {
        ctx.session.username = result.username;
        ctx.session.realname = result.realname;
        ctx.body = new SuccessModel(true);
    } else {
        ctx.body = new ErrorModel('login failed');
    }
})

module.exports = router
