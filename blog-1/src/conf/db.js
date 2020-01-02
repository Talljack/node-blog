const env = process.env.NODE_ENV;

// mysql配置信息
let MYSQL_CONF;
let REDIS_CONF;

// 区分线上还是线下环境，以便与配置不同的数据库配置信息
if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'zz1996.12.19',
        port: 3306,
        database: 'blogs'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'zz1996.12.19',
        port: 3306,
        database: 'blogs'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}