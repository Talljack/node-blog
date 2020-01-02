const mysql = require('mysql');  //引入mysql数据库

const createCon = () => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'zz1996.12.19',
        port: 3306,
        database: 'blogs'
    });
    return con;
}

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'zz1996.12.19',
    port: 3306,
    database: 'blogs'
}); // 设置连接的数据库的信息

con.connect();


// 进行query查询操作
const sql = 'select * from user;';
con.query(sql, (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})

// 关闭数据库的连接
con.end();


