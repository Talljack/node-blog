/**
 *
 */
const status = require('../common/status');

const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error(err);
        return status.error(ctx, err.message);
    }
};

module.exports = handler;
