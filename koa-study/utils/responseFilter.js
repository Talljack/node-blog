/****
 * ctx 数据返回格式化函数 Response转换
 * @param {number} code 状态码
 * @param {string} msgType 消息
 * @param {Object} data 数据
 * @return {Object}
 */

module.exports = function (code, msg, data) {
    return {
        code,
        msg: msg ? msg : 'failed',
        data: data ? data : null
    }
}