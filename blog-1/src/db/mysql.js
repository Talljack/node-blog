let mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect();
// 查询函数导出，并且可以实现promise链式调用
const queryInfo = (query) => {
    return new Promise((resolve, reject) => {
        con.query(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports = {
    queryInfo,
    escape: mysql.escape
}