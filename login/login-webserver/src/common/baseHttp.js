/**
 *
 */
const axios = require('axios');
const qs = require('qs');
const dayjs = require('dayjs');
const Console = require('./console');
let start;
let end;
// 请求拦截器
axios.interceptors.request.use(config => {
    start = new Date();
    return config
}, error => {
    return Promise.reject(error)
});

// 响应拦截器即异常处理
axios.interceptors.response.use(response => {
    end = new Date() - start;
    const config = response.config;
    Console.customList([
        ['black', `[ ${dayjs().format('YYYY-MM-DD HH:mm:ss')} ]`],
        ['magenta', ` [ server ]`],
        [response.status === 200 ? 'green' : 'red', ` ${response.status} ${config.method} ${config.url} `],
        ['yellow', ` ${end}ms`]
    ]);
    Console.default('--------------------------');
    Console.customList([
        ['green', `req: `],
        ['black', JSON.stringify(config.data)]
    ]);
    Console.customList([
        ['green', `res: `],
        ['black', JSON.stringify(response.data)]
    ]);
    Console.default('--------------------------');
    return response;
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求';
                break;
            case 401:
                err.message = '未授权，请重新登录';
                break;
            case 403:
                err.message = '拒绝访问';
                break;
            case 404:
                err.message = '请求错误,未找到该资源';
                break;
            case 405:
                err.message = '请求方法未允许';
                break;
            case 408:
                err.message = '请求超时';
                break;
            case 500:
                err.message = '服务器端出错';
                break;
            case 501:
                err.message = '网络未实现';
                break;
            case 502:
                err.message = '网络错误';
                break;
            case 503:
                err.message = '服务不可用';
                break;
            case 504:
                err.message = '网络超时';
                break;
            case 505:
                err.message = 'http版本不支持该请求';
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        err.message = '连接到服务器失败'
    }
    Console.danger(err);
    return Promise.reject(err.response)
});

axios.defaults.baseURL = '/api';
// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// };
axios.defaults.timeout = 60000;

module.exports = {
    // get请求
    get(url, param) {
        return axios({
            method: 'get',
            url,
            params: param,
        })
    },
    // post请求
    post(url, param) {
        return axios({
            method: 'post',
            url,
            data: param,
        })
    },
    postRaw(url, param) {
        return axios({
            method: 'post',
            url,
            data: JSON.stringify(param),
        })
    }
};
