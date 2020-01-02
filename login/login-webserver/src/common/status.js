/**
 *
 * 网络状态0成功，1错误，2警告，3未登录
 */
const status = {
    success(ctx, data) {
        let successData = {
            status: 0
        };
        if (!data) {
            ctx.body = successData
        } else {
            ctx.body = Object.assign({}, successData, data)
        }
    },
    warning(ctx, msg) {
        ctx.body = {
            status: 1,
            message: msg
        }
    },
    error(ctx, msg) {
        ctx.body = {
            status: 2,
            message: msg
        }
    },
    noLogin(ctx, err) {
        ctx.body = {
            status: 3,
            message: err
        }
    },
    noPermission(ctx) {
        ctx.status = 403;
        ctx.body = {
            status: 1,
            message: '该账号无权限访问'
        }
    }
};

module.exports = status;
