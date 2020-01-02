/**
 *
 */
const {getUserInfo} = require('../services/manage');
const Constant = require('../common/constant');
const status = require('../common/status');
const {compare} = require('../services/bcrypt');
// const {changeLoginTime} = require('../services/user');

exports.common = async (ctx, next) => {
    const user = ctx.state.user;
    const userInfo = await getUserInfo({_id: user.user_id});
    // 判断用户是否存在
    if (userInfo === null) {
        return status.noLogin(ctx, Constant.userError.ACCOUNT_NOT_HAS)
    }
    // 判断密码是否正确
    if (user.password !== userInfo.password) {
        return status.noLogin(ctx, Constant.userError.ACCOUNT_PASSWORD_ERROR)
    }
    // 判断账号状态
    if (userInfo.status === Constant.user.STATUS_DISABLED) {
        throw new Error(Constant.userError.ACCOUNT_IS_DISABLED)
    }
    ctx.state.userInfo = userInfo;
    // changeLoginTime(userInfo.account);
    return next()
};

exports.admin = async (ctx, next) => {
    const user = ctx.state.user;
    const userInfo = await getUserInfo({_id: user.user_id});
    // 判断用户是否存在
    if (userInfo === null) {
        return status.noLogin(ctx, Constant.userError.ACCOUNT_NOT_HAS)
    }
    // 判断密码是否正确
    if (user.password !== userInfo.password) {
        return status.noLogin(ctx, Constant.userError.ACCOUNT_PASSWORD_ERROR)
    }
    // 判断账号状态
    if (userInfo.status === Constant.user.STATUS_DISABLED) {
        return status.noLogin(ctx, Constant.userError.ACCOUNT_IS_DISABLED)
    }
    // 判断用户权限
    if (userInfo.permission === 0) {
        throw new Error(Constant.userError.ACCOUNT_NO_PERMISSION)
    }
    ctx.state.userInfo = userInfo;
    // changeLoginTime(userInfo.account);
    return next()
};
