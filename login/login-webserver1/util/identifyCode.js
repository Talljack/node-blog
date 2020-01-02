/**
 * @file 请求返回格式处理
 *
 */
/**
 * Response转换
 * @param {number} code 状态码
 * @param {string} msgType 消息
 * @param {Object} data 数据
 * @return {Object}
 */

module.exports = function (code, msgType, data) {
    return {
        code: code,
        msg: msgType,
        result: data ? data : null
    };
};