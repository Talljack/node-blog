/**
 *  载入配置相关
 */
const env = require('../../config/env.json');
const config = require(`../../config/config.${env.env}.json`);
const responseFilter = require('../../utils/responseFilter');
const Console = require('../../utils/console');
const jwt = require('jsonwebtoken');
const db = config.mongo.db;
const user = config.collections.user;
const bcrypt = require('bcryptjs');
const svgCaptcha = require('svg-captcha');
const SECRET = require('../../config/token.secret.js').SECRET;

module.exports = {
    login: async (ctx, next) => {
        try {
            const params = ctx.request.body;
            const username = params.username;
            // mongo 查询
            let resData = await ctx.mongo.db(db).collection(user).findOne({
                'username': username
            });
            if (resData) {
                let payloadToken = {
                    username,
                    time: new Date().getTime(),
                    timeout: 1000 * 60 * 60 * 2 // 2h过期
                }
                let payloadRefreshToken = {
                    username,
                    refresh_time: new Date().getTime(),
                    refresh_timeout: 1000 * 60 * 60 * 24 * 15 // 15天过期
                }
                let refresh_token = jwt.sign(payloadRefreshToken, SECRET);
                let token = jwt.sign(payloadToken, SECRET);
                // token验证方式
                const result = {
                    'token': token,
                    'refresh_token': refresh_token,
                    'username': resData.username
                };
                ctx.body = responseFilter(200, 'success', result);
            } else {
                ctx.body = responseFilter(401, '用户不存在', {});
            }
        } catch (err) {
            console.log(Console.danger(err));
            ctx.body = responseFilter(500, false, err.message);
        }
    },
    getCode: async (ctx, next) => {
        try {
            const cap = svgCaptcha.create({
                size: 4,
                width: 160,
                height: 60,
                fontSize: 50,
                noise: 6,
                color: true,
                background: '#eee'
            });
            let img = cap.data;
            let text = cap.text.toLowerCase();
            const data = {};
            data.img = img;
            data.text = text;
            const result = {
                data
            };
            let trueCode = bcrypt.hashSync(data.text, 12);
            ctx.session.identifyCode = trueCode;
            ctx.body = responseFilter(200, true, result);
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    }
}