/**
 *
 * 日志颜色管理
 * child配置参考https://github.com/chalk/chalk
 */
const chalk = require('chalk');

module.exports = {
    default(msg) {
        console.log(chalk.yellow(msg))
    },
    log(msg) {
        console.log(chalk.cyan(msg))
    },
    sucess(msg) {
        console.log(chalk.green(msg))
    },
    warning(msg) {
        console.log(chalk.yellow(msg))
    },
    danger(msg) {
        console.log(chalk.red(msg))
    },
    custom(type, msg) {
        console.log(chalk[type], msg)
    },
    /**
     * 多种颜色
     * type@msg@@type@msg
     * @ 分割type和message
     * @@ 分割不同类型
     * @param msgs
     */
    customList(msgs) {
        let msgVal = '';
        if (msgs.length === 0) {
            return
        }
        msgs.forEach(item => {
            msgVal += chalk[item[0]](item[1]);
        });
        console.log(msgVal)
    }
};
