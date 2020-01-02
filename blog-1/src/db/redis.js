const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', err => {
    console.error(err);
})

const redisSet = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
}

const redisGet = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, data) => {
            if (err) {
                reject(err);
            } else {
                if (data == null) {
                    resolve(null);
                    return;
                }
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    resolve(data);
                }
            }
        })
    })
}

module.exports = {
    redisSet,
    redisGet
}