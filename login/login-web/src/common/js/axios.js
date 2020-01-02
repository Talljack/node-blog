import axios from 'axios'
import { getToken } from './storage'
import {Message} from 'element-ui'
import config from '../../../config/index'
import dayjs from 'dayjs'

/* eslint-disable */
let myAxios = axios.create()

myAxios.interceptors.request.use(
	config => {
		const token = getToken()
		if (config.url !== '/api/login') {
			config.headers['Authorization'] = 'Bearer ' + token;
		}
		if (config.method === 'get') {
			config.url = `${config.url}${config.url.indexOf('?') >= 0 ? '&' : '?'}t=${dayjs().valueOf()}`
		}
		return config
	},
	error => {
        return Promise.reject(error)
	}
)

myAxios.interceptors.response.use(
	response => {
		if (response.data.status === 1 || response.data.status === -1) {
	        Message.warning(response.data.message)
	    } else if (response.data.status === 2) {
	        Message.error(response.data.message)
	    } else if (response.data.status === 3) {
	        Message.error(response.data.message)
	        router.push({
	            name: 'login'
	        })
	    }
	    return response
	},
	err => {
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
	                err.message = `连接错误${err.response.status}`;
	        }
	    } else {
	        err.message = '连接到服务器失败';
	    }
	    return Promise.resolve(err.response)
	}
)
myAxios.defaults.baseURL = process.env.NODE_ENV === 'production' ? config.build.serverUrl + 'api' : '/api'
myAxios.defaults.timeout = 60000
myAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

export default myAxios
