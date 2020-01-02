
const status = require('../common/status');
const Constant = require('../common/constant');
const config = require('../config');
// const UserModel = require('../db/schema/UserModel');
const bcrypt = require('../services/bcrypt');
const jwt = require('../services/jwt');
const jwtConfig = require('../config/jwt');
const {verify} = require('../services/jwt');

const JTW_LOGIN_SECRET = jwtConfig.secret.LOGIN;

// 用户登录，获取用户信息
exports.post = async (ctx) => {
    const body = ctx.request.body;
    ctx.assert(body.action, 400, Constant.status.STATUS_NO_ACTION);
    ctx.assert(body.name, 400, 'name is not null');
    ctx.assert(body.password, 400, 'password is not null');
    switch (body.action) {
        case 'login':
            // let userInfo = await getUserInfo(body.name, body.password);
            return status.success(ctx, {
                result: userInfo
            });
    }
};

// 验证token
exports.getLoginAction = async (ctx) => {
    const query = ctx.query;
    ctx.assert(query.token, 400, 'token is not null');
    const verifyStatus = await verify({
        token: query.token,
        secret: jwtConfig.secret.LOGIN
    });
    if (verifyStatus.valid === 1) {
        return status.success(ctx)
    } else {
        return status.noLogin(ctx)
    }
};

// 获取用户信息
// async function getUserInfo(name, password) {
//     // const userInfo = await UserModel.findOne({account: name});
//     if (userInfo && userInfo !== null) {
//         const passwordRes = await bcrypt.compare(password, userInfo.password);
//         if (passwordRes) {
//             const {token: jwtCode} = await jwt.generate({
//                 secret: JTW_LOGIN_SECRET,
//                 payload: JSON.stringify({
//                     user_id: userInfo._id,
//                     password: userInfo.password
//                 })
//             });
//             return {
//                 token: jwtCode,
//                 user_name: name,
//                 permission: userInfo.permission,
//                 rules: userInfo.rules
//             }
//         } else {
//             throw new Error(Constant.login.LOGIN_PASSWORD_ERROR)
//         }
//     } else {
//         throw new Error(Constant.login.LOGIN_NO_USER)
//     }
// }
