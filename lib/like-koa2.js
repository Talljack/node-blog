const http = require('http');

// 函数的next执行函数
function compose (list) {
    return function (ctx) {
        const dispatch = (i) => {
            let fn = list[i];
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    }
}

class LikeKoa2 {
    constructor () {
        // 存储的中间件
        this.middlewareList = [];
    }
    use (fn) {
        // 将注册的函数存储起来先
        this.middlewareList.push(fn);
        return this; // use的链式调用
    }
    // 获得ctx
    createCtx(req, res) {
        const ctx = {
            req,
            res
        }
        ctx.query = req.query;
        return ctx;
    }
    handle (ctx, fn) {
        return fn(ctx)
    }

    callbak () {
        const fn = compose(this.middlewareList);
        return (req, res) => {
            const ctx = this.createCtx(req, res);
            return this.handle(ctx, fn)
        }
    }
    listen (...args) {
        const server = http.createServer(this.callbak());
        server.listen(...args);
    }
}

module.exports = LikeKoa2;