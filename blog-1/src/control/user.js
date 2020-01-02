const { queryInfo, escape } = require('../db/mysql');

const loginCheck = (username, password) => {
    // 使用escape函数对用户输入的进行转义
    username = escape(username);
    password = escape(password);

    const query = `select username, realname from user where username=${username} and password=${password};`;
    return queryInfo(query).then(res => {
        return res[0] || {};
    })
}

module.exports = {
    loginCheck
}