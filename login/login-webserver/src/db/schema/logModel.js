/**
 *
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../index');

const logSchema = new Schema({
    user_id: String, // 用户ID
    user_name: String, // 用户名称
    action: String, // 行为：create/delete/update/find
    type: String,
    sub_type: String,
    message: String, // 具体信息
    create_time: String
});

const logModel = db.model('log', logSchema);

module.exports = logModel;
