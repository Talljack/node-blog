/**
 *
 */
module.exports = [
    {
        account: 'root', // 账号 *更改用户名可能会造成数据丢失
        user_name: 'root', // 姓名
        password: 'kfzdfdfxzkhl', // 密码
        phone: '', // 手机号
        email: '', // 邮箱
        permission: 1, // 0普通用户、1超级管理员
        default: true,
        status: 0 // 0正常、-1黑名单
    },
    {
        account: 'admin', // 账号 *更改用户名可能会造成数据丢失
        user_name: 'admin', // 姓名
        password: 'admin', // 密码
        phone: '', // 手机号
        email: '', // 邮箱
        permission: 2, // 0普通用户、1超级管理员
        default: true,
        status: 0 // 0正常、-1黑名单
    }
];
