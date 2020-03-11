/**
 *  log打印的中间价
 */

 const dayjs = require('dayjs');
 const Console = require('../utils/console');
 // 响应时间的中间件
 exports.responseTime = async (ctx, next) => {
     const start = new Date();
     await next();
     const ms = new Date() - start;
     ctx.set('X-Response-Time', ms + 'ms');
 }

 exports.logger = async (ctx, next) => {
     const start = new Date();
     await next();
     const ms = new Date() - start;
     const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
     const status = ctx.response.status;
     Console.customList([
         ['yellow', `[${now}]`],
         ['magenta', '[ api ]'],
         [status === 200 ? 'green': 'red', status],
         ['green', ` ${ctx.method} ${ctx.url} - `],
         ['yellow', `${ms}ms`]
     ]);
     if (ctx.url.indexOf('api') >= 0) {
         Console.default('------------------------');
         if (ctx.method === 'GET') {
            Console.customList([
                ['green', `req: `],
                ['yellow', JSON.stringify(ctx.request.query)]
            ]);
         } else {
            Console.customList([
                ['green', `req: `],
                ['yellow', JSON.stringify(ctx.request.body)]
            ]);
         }
         Console.customList([
             ['green', `res: `],
             ['yellow', JSON.stringify(ctx.response.body)]
         ]);
         Console.default('------------------------');
     }
 };