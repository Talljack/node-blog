const redis = require('redis');

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

// 监听redis的错误
redisClient.on('error', err => {
    console.error(err);
})
// redis设置和获取数据
redisClient.set('name', 'zhangsan', redis.print);
redisClient.get('name', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
    // 退出 防止服务一直运行
    redisClient.quit();
})
