
/**
 *
 * 用户管理
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../index');

const userSchema = new Schema({
    account: String, // 账号
    user_name: String, // 姓名
    password: String, // 密码
    phone: String, // 手机号
    email: String, // 邮箱
    department: String, // 科室
    rules: [], // 权限列表
    feature_rules: [ // 特征管理权限设置
        // {
        //     type: '',
        //     sub_type: '',
        //     value: [[1, 2]]
        // }
    ],
    permission: 0, // 0普通用户、1超级管理员、2管理员
    create_by: {}, // 创建人的信息
    default: {
        type: Boolean,
        default: false
    },
    create_time: String,
    last_login_time: String, // 最后一次登录时间
    status: 0 // 0正常、-1黑名单
});

module.exports = db.model('user', userSchema);
