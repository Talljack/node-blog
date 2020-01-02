// const express = require('./like-express');

// const app = express();

// app.use((req, res, next) => {
//     console.log('begin', req.method, req.url);
//     next();
// })

// app.use((req, res, next) => {
//     // 处理cookie
//     req.cookie = {
//         userId: 123
//     }
//     next ();
// })
// app.use((req, res, next) => {
//     // 处理cookie
//     setTimeout (() => {
//         req.body = {
//             a: 100,
//             b: 200
//         }
//         next();
//     })
// })
// app.use('/api', (req, res, next) => {
//     console.log('处理api请求， 。。。。');
//     next();
// })
// app.get('/api', (req, res, next) => {
//     console.log('处理 get api请求， 。。。。');
//     next();
// })
// app.post('/api', (req, res, next) => {
//     console.log('处理 post api请求， 。。。。');
//     next();
// })

// app.get('/api/get-cookie', (req, res, next) => {
//     console.log('get api cookie');
//     res.json(req.cookie);
// })

// app.post('/api/get-data', (req, res, next) => {
//     console.log('post api cookie');
//     res.json(req.body);
// })


// app.listen(3030, () => {
//     console.log('OK');
// })



// koa2验证
const Koa = require('./like-koa2');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
    console.log('第一次， 开始')
    await next();
    const rt = ctx['X-Response-Time'];
    console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
    console.log('第一次， 结束')
});

// x-response-time

app.use(async (ctx, next) => {
    console.log('第二次， 开始')
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx['X-Response-Time'] =  `${ms}ms`;
  console.log('第二次， 结束')
});

// response

app.use(async ctx => {
    console.log('第三次， 开始')
  ctx.res.end('Hello World');
  console.log('第三次， 结束')
});

app.listen(3000);