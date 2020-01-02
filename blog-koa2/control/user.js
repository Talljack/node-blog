const { queryInfo, escape } = require('../db/mysql');

const loginCheck = async (username, password) => {
    // 使用escape函数对用户输入的进行转义
    username = escape(username);
    password = escape(password);

    const query = `select username, realname from user where username=${username} and password=${password};`;
    const result = await queryInfo(query);
    return result[0] || {};
}

module.exports = {
    loginCheck
}