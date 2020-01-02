/**
 *
 */

const log4js = require('log4js');
const fs = require('fs');
const path = require('path');
// const log4jsExtend = require('log4js-extend');

// log4jsExtend(log4js, {
//     path: __dirname,
//     format: 'at @name (@file:@line:@column)'
// });


let logPath = path.resolve(__dirname, '../../log');

// 配置日志相关
if (!fs.existsSync(logPath)) {
    // 如果没有日志文件目录，则创建
    fs.mkdirSync(logPath);
}

log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {
            type: 'stdout'
        },
        req: {
            type: 'dateFile',
            filename: path.resolve(logPath, 'server.log'),
            layout: {
                type: 'pattern',
                pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
            },
            pattern: 'yyyy-MM-dd',
            alwaysIncludePattern: true
        }
    },
    categories: {
        // appenders:采用的appender,取appenders项,level:设置级别
        default: {appenders: ['stdout', 'req'], level: 'debug'},
        err: {appenders: ['stdout', 'req'], level: 'error'}
    }
});

// name取categories项
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default');
};
