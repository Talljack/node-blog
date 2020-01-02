const { ErrorMedel } = require('../model/resModel');

module.exports = async (ctx, next) => {
    if (ctx.session.username) {
        await next();
    } else {
        ctx.body = {
            code: -1,
            msg: '未登录'
        }
    }
}