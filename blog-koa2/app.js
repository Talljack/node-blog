const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')  // 视图模版
const json = require('koa-json')  // 处理postData数据
const onerror = require('koa-onerror') // 处理error情况
const bodyparser = require('koa-bodyparser') // 分析body数据
const logger = require('koa-logger') // log相关插件
const session = require('koa-generic-session'); // session相关插件
const redisStore = require('koa-redis');  // redis存储的插件
const index = require('./routes/index')  // 路由文件
const users = require('./routes/users')  // user相关的路由文件
const blog = require('./routes/blog');
const user = require('./routes/user');
const { REDIS_CONF } = require('./conf/db');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');
// error handler  错误处理函数
onerror(app)

// middlewares  中间件的使用
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()  // 先处理下一个中间件 然后在打印输出日期等
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
const env = process.env.NODE_ENV;
if (env !== 'production') {
  app.use(morgan('dev'));
} else {
  const filename = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(filename);
  app.use(morgan('combined', {
    stream: writeStream
  }))
}

// session实现持久性存储
app.keys = ['dfjdHH_d122**&'];
app.use(session({
  // cookie的配置
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 48*60*60*1000
  },
  // redis的配置
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`  // 后面根据开发情况来区分地址，需要配置
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
