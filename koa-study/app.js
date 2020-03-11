const Koa = require("koa");
// 解析body的数据
const bodyParser = require("koa-bodyparser");
//将多个中间件组合成一个中间件
const compose = require("koa-compose");
// 处理postData数据
const json = require("koa-json");
// jsonwebtoken 中间件
const jwt = require("koa-jwt");
// 日志打印中间件
const logger = require("koa-logger");
// mongodb数据库中间件
const mongo = require("koa-mongo");
// 错误处理中间件
const onerror = require("koa-onerror");
// session中间件
const session = require("koa-session2");
// 静态文件中间件
const static = require("koa-static");
// views模板中间件
const views = require("koa-views");
// path
const path = require("path");
// morgan 日志存储模块
const morgan = require("koa-morgan");
// fs
const fs = require("fs");
// redisStore
const redisStore = require("./utils/store");
// logger颜色配置
const Console = require("./utils/console");
// 中间件
const logMeddleware = require('./middleware/log');
const errMiddleware = require('./middleware/errMiddleware');
// 配置的环境
const env = require("./config/env.json");
const config = require(`./config/config.${env.env}.json`);
const app = new Koa();
//session 配置 实现持久化
app.keys = ["dfjdHH_d122**&"];
// router引入
const router = require("./router/index");
const mongoConf = config.mongo;

//处理错误情况
onerror(app);

app.use(mongo(mongoConf)); // 连接mongo数据库的中间件
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(compose([errMiddleware, logMeddleware.responseTime, logMeddleware.logger]));
app.use(json());
app.use(logger());
app.use(static(path.resolve(__dirname, "/public")));

// 写入日志文件 开发环境不写入
if (env.env !== "prod") {
  app.use(morgan("dev"));
} else {
  const filename = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(filename, {
    // 追加写入
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: writeStream
    })
  );
}

// session redis 存储
app.use(
  session({
    cookies: {
      key: "SESSIONID",
      path: "/",
      maxAge: 2 * 60 * 60 * 1000, //2h
      httpOnly: true
    }
    // 暂时不连接Redis
    // store: new redisStore()
  })
);

// logger
app.use(async (ctx, next) => {
  let start = new Date();
  await next();
  let now = new Date();
  Console.customList([
    ["yellow", `>${ctx.method}  `],
    ["green", `${ctx.host}  `],
    ["cyan", `${ctx.url}  `],
    ["green", `${now - start}ms\n`]
  ]);
});

app.use(router.routes()); // 路由中间件

app.on("error", (err, ctx) => {
  console.error("server error", err);
});
module.exports = app;
