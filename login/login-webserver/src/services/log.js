/**
 *
 */
const LogModel = require('../db/schema/LogModel');
const dayjs = require('dayjs');

// 存贮类型log
exports.createLog = async (userId, userName, action, type, subType, message) => {
    try {
        return await LogModel.create({
            user_id: userId,
            user_name: userName,
            action: action,
            type: type,
            sub_type: subType || '',
            message: message,
            create_time: dayjs().valueOf()
        })
    } catch (e) {
        console.error(e);
        throw new Error('创建日志失败')
    }
};

exports.getLogList = async (params, limit, page) => {
    try {
        const total = await LogModel.countDocuments(params);
        const result = await LogModel.find(params, null, {limit: limit, skip: (page - 1) * limit, sort: {_id: -1}});
        return {total, result}
    } catch (e) {
        console.error(e);
        throw new Error('获取日志失败')
    }
};
