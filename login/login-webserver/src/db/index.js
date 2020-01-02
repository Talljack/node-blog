/**
 * Created by busyhe on 2018/1/27 上午2:05.
 * Email: 525118368@qq.com
 */
const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise; // 解决mongoose promise问题

const db = mongoose.createConnection(config.mongodb.mainUrl, {useNewUrlParser: true});

module.exports = db;

