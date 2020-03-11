// 错误处理中间件

const status = require('../utils/status');

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error(error);
        return status.error(ctx, error.message);
    }
}

module.exports = handler;