var createError = require('http-errors');  // 处理未找到的路由入404
var express = require('express'); // 引入express框架
var path = require('path'); // node的原生模块
var fs = require('fs');
var cookieParser = require('cookie-parser');  // cookie的解析模块
var logger = require('morgan');  // 输出日志的模块
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

var app = express();   // 每次运行都会创建一个app

// view engine setup   前端页面的引擎文件
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));  // 使用log中间件
let env = process.env.NODE_ENV;
if (env != 'production') {
    app.use(logger('dev'));
} else {
    const filename = path.join(__dirname, 'logs', 'access.log');
    const writeStream = fs.createWriteStream(filename, {
        flags: 'a'
    });
    app.use(logger('combined', {
        stream: writeStream
    }));
}
app.use(express.json());  // 解析post的数据
app.use(express.urlencoded({ extended: false })); // 解析post的数据 不仅仅可能有json数据
app.use(cookieParser());  // 使用cookie的解析中间件
app.use(express.static(path.join(__dirname, 'public')));  // 静态文件的获取

// 配置redis操作
const redisClient = require('./db//redis');
const sessionStore = new RedisStore({
    client: redisClient
})

// session 配置以及连接redis操作
app.use(session({
    secret: 'adjdhfjdDF_3322*&',
    cookie: {
        path: '/', // 默认配置
        httpOnly: true, // 默认配置
        maxAge: 2*24*60*60*1000
    },
    store: sessionStore
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {   // 处理404的路由情况
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
