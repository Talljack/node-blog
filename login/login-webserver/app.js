const Koa = require('koa')
const app = new Koa()
const Console = require('./src/common/console'); // 控制台输出颜色自定义工具
const views = require('koa-views')
const json = require('koa-json')
const bodyParser = require('koa-body');
const koaStatic = require('koa-static');
const mongo = require('koa-mongo');
const compose = require('koa-compose');
const cors = require('koa2-cors');
const path = require('path');
const router = require('./src/router');
const config = require('./src/config');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logMeddleware = require('./src/middleware/log');
const errMiddleware = require('./src/middleware/errMiddleware');
const logger = require('koa-logger')
const confData = require('./src/util/confData');

app.use(mongo(confData.mongo));

// body解析
app.use(cors());
app.use(bodyParser({
    multipart: true,
    formLimit: '10mb',
    jsonLimit: '10mb',
    textLimit: '10mb'
}));

// 中间件合集
app.use(compose([errMiddleware, logMeddleware.responseTime, logMeddleware.logger]));

// 静态资源
// app.use(koaStatic(path.resolve(__dirname, './files')));
// app.use(koaStatic(path.resolve(__dirname, './files/detailfile')));

// 路由
router(app);

app.use(async ctx => {
    ctx.body = 'server start';
});

app.listen(config.port);

Console.customList([
    ['cyan', '\n> server start: '],
    ['green', `localhost:${config.port}`]
]);
Console.customList([
    ['cyan', '> 当前服务环境: '],
    ['green', `${config.name}\n`]
]);
