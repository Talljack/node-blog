const http = require('http');
const slice = Array.prototype.slice;

class LikeExpress {
    constructor () {
        this.routes = {
            all: [],
            get: [],
            post: []
        }
    }
    register (path) {
       let info = {};
       if (typeof path === 'string') {
           info.path = path;
           info.stack = slice.call(arguments, 1);
       } else {
           info.path = '/';
           info.stack = slice.call(arguments, 0);
       }
       return info;
    }
    use () {
        let info = this.register.apply(this, arguments);
        this.routes.all.push(info);
    }
    get () {
        let info = this.register.apply(this, arguments);
        this.routes.get.push(info);
    }
    post () {
        let info = this.register.apply(this, arguments);
        this.routes.post.push(info);
    }
    callback () {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json');
                res.end(JSON.stringify(data));
            }
            let method = req.method;
            let url = req.url;
            let resultList = this.match(method, url);
            this.handle(req, res, resultList);
        }
    }
    handle (req, res, stack) {
        const next = () => {
            let middleware = stack.shift();
            if (middleware) {
                middleware (req, res, next);
            }
        }
        next ();
    }
    match (method, url) {
        let stack = [];
        if (url === '/favicon.ico') {
            return stack;
        }
        let routeStack = [];
        routeStack = routeStack.concat(this.routes.all);
        routeStack = routeStack.concat(this.routes[method]);
        routeStack.forEach(routerInfo => {
            if (url.indexOf(routerInfo.path) === 0) {
                stack = stack.concat(routerInfo.stack);
            }
        })
        return stack;
    }
    listen (...args) {
        let server = http.createServer(this.callback());
        server.listen(...args);
    }
}

module.exports = () => {
    return new LikeExpress()
}


























// const http = require('http');
// let slice = Array.prototype.slice;
// class LikeExpress{
//     constructor () {
//         this.routes = {
//             // 存储注册的函数
//             all: [],
//             get: [],
//             post: []
//         }
//     }
//     register (path) {
//         let info = {};
//         if (typeof path === 'string') {
//             info.path = path;
//             // 将注册的函数全部存入到stack中
//             info.stack = slice.call(arguments, 1);
//         } else {
//             info.path = '/';
//             info.stack = slice.call(arguments, 0);
//         }
//         return info;
//     }
//     use () {
//         let info = this.register.apply(this, arguments);
//         this.routes.all.push(info);
//     }
//     get () {
//         let info = this.register.apply(this, arguments);
//         this.routes.get.push(info);
//     }
//     post () {
//         let info = this.register.apply(this, arguments);
//         this.routes.post.push(info);
//     }
//     match (method, url) {
//         let stack = [];
//         if (url === '/favicon.ico') {
//             return stack;
//         }
//         let routeStack = [];
//         routeStack = routeStack.concat(this.routes.all);
//         routeStack = routeStack.concat(this.routes[method]);
//         routeStack.forEach(routeInfo => {
//             if (url.indexOf(routeInfo.path) == 0) {
//                 //包含三种情况
//                 // 1、URL=== ‘/api/get-cookie’且 path=== '/'
//                 // 2、URL=== ‘/api/get-cookie’且 path=== '/api'
//                 // 2、URL=== ‘/api/get-cookie’且 path=== '/api/get-cookie'
//                 stack = stack.concat(routeInfo.stack);
//             }
//         })
//         return stack;
//     }
//     // 核心next机制
//     handle (req, res, stack) {
//         const next = () => {
//             let fn = stack.shift();
//             if (fn) {
//                 fn(req, res, next);
//             }
//         }
//         next();
//     }
//     callback () {
//         return (req, res) => {
//             res.json = (data) => {
//                 res.setHeader('Content-type', 'application/json');
//                 res.end(JSON.stringify(data));
//             }
//             const url = req.url;
//             const method = req.method.toLowerCase();
//             const resultList = this.match(method, url);
//             this.handle(req, res, resultList);
//         }
//     }
//     listen (...args) {
//         let server = http.createServer(this.callback());
//         server.listen(...args);
//     }
// }

// module.exports = () => {
//     return new LikeExpress();
// }