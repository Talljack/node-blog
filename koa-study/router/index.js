/**
 *
 * @file api入口文件
 *
 */
/**
 * 载入配置信息
 */
const Router = require("koa-router");
const url = require("url");
const env = require("../config/env.json");
const config = require(`../config/config.${env.env}.json`);
const loginApi = require("./login/index");
// 请求拦截
const intercept = require("../utils/intercept");

let router = new Router();

router
  .use("/api/*", intercept.routes(), intercept.allowedMethods())
  .use("/api/logout", logout)
  .post("/api/login", loginApi.login)
  .get("/api/getCode", loginApi.getCode);

/**
 * 注销
 * @param {Object} ctx 请求消息
 *
 */
async function logout(ctr, next) {
  // 删除cookie中的username信息
  ctx.cookies.set("username", null);
  ctx.status = 302;
  ctx.redirect(
    "/logout",
    `${ctx.protocol}${ctx.host}${ctx.hostname}${ctx.port}/login.html`
  );
  ctx.body = "您已退出";
}

module.exports = router;
