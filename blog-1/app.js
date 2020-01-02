const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const querystring = require('querystring');
const { access } = require('./src//utils/log');
const serverHandle = (req, res) => {
    // 写入访问日志
    access(`${req.method}--${req.url}--${req.headers['user-agent']}--${Date.now()}`);
    const url = req.url;
    req.path = url.split('?')[0];
    req.query = querystring.parse(url.split('?')[1]);
    // 处理cookie
    req.cookie = {};
    let cookieStr = req.headers.cookie || '';
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return;
        }
        let arr = item.split('=');
        let key = arr[0].trim();
        let val = arr[1].trim();
        req.cookie[key] = val;
    })
    const getExpriesTime = () => {
        let d = new Date();
        d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000));
        return d.toGMTString();
    }
    // 处理session
    const SESSION_DATA = {};
    let userId = req.cookie.userid;
    let needSetCookie = false;
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        SESSION_DATA[userId] = {};
    }
    req.sessionId = userId;
    req.session = SESSION_DATA[userId];
    // 处理POST请求的数据
    let getPostData = (req) => {
        return new Promise((resolve, reject) => {
            if (req.method !== 'POST') {
                resolve({});
                return;
            }
            if (req.headers['content-type'] !== 'application/json') {
                resolve({});
                return;
            }
            let postData = '';
            req.on('data', chunk => {
                postData += chunk.toString();
            })
            req.on('end', () => {
                if (!postData) {
                    resolve({});
                    return;
                }
                resolve(JSON.parse(postData));
            })
        })
    }
    // 处理博客的路由数据
    getPostData(req).then(postData => {
        req.body = postData;
        const handleBlog = handleBlogRouter(req, res);
        if (handleBlog) {
            // res.end(string)
            handleBlog.then(data => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expries=${getExpriesTime()}`)
                }
                res.end(JSON.stringify(data));
            })
            return;
        }

        // 处理user相关的路由数据
        const handleUser = handleUserRouter(req, res);
        if (handleUser) {
            handleUser.then(data => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expries=${getExpriesTime()}`)
                }
                res.end(JSON.stringify(data));
            })
            return;
        }
        // 处理路由出错的情况 返回404
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 NOT FOUND\n');
        res.end();
    })
}

module.exports = serverHandle;