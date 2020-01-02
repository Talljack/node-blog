/**
 *
 */
module.exports = {
    // mongoose数据库相关
    mongodb: {
        CREATE_ERROR: 'mongodb: 数据库创建失败',
        DELETE_ERROR: 'mongodb: 数据库删除失败',
        UPDATE_ERROR: 'mongodb: 数据库更新失败',
        FIND_ERROR: 'mongodb: 数据库查找失败'
    },
    es: {
        CONNECT_ERROR: 'es: 链接失败',
        AGGS_ERROR: 'es: 聚合操作失败'
    },
    server: {
        SERVER_ERROR: '请求服务器失败'
    },
    // 用户账号相关常量
    user: {
        PERMISSION_COMMON: 0, // 普通用户
        PERMISSION_ADMIN: 1, // 管理员
        STATUS_NORMAL: 0, // 账户正常
        STATUS_DISABLED: -1 // 账户禁用
    },
    // 用户账号相关
    userError: {
        ACCOUNT_IS_DISABLED: '账户被禁用',
        ACCOUNT_NOT_LOGIN: '账户未登陆',
        ACCOUNT_NO_PERMISSION: '账户没有权限',
        ACCOUNT_NOT_HAS: '账户不存在',
        ACCOUNT_IS_HAS: '账户已存在',
        ACCOUNT_PASSWORD_ERROR: '账户密码错误'
    },
    upload: {
        UPLOAD_ERR: '上传失败',
        UPLOAD_SUCCESS: '上传成功',
        FILE_TYPE_ERROR: '文件类型错误，需为xlsx'
    },
    schema: {
        SCHEMA_NO_HAS: 'schema不存在'
    },
    status: {
        STATUS_NO_ACTION: '没有找到对应的action'
    },
    login: {
        LOGIN_NO_USER: '此帐号不存在',
        LOGIN_PASSWORD_ERROR: '密码错误',
        LOGIN_HAS_SAME_PHONE: '手机号已存在'
    },
    task: {
        CREAT_FAILED: '创建任务失败'
    },
    keyIsNull: (val) => {
        return `${val} must have a value`
    }
};
