
const commander = require('../common/commander'); // 命令行工具
const mode = commander.build ? 'build' : 'dev';

const config = {
    dev: {
        name: '开发模式',
        mongodb: {
            mainUrl: 'mongodb://127.0.0.1:8017/login_norm'
        }
    },
    build: {
        name: '生产模式',
        mongodb: {
            mainUrl: 'mongodb://127.0.0.1:8017/cdss_norm'
        }
    }
};

const commonConfig = {
    type: mode,
    port: commander.port || 8707
};

module.exports = Object.assign({}, commonConfig, config[mode]);
