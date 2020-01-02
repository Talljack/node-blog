/**
 *
 *@file login api
 *
 */

const env = require('../../config/env.json');
const config = require(`../../config/config.${env.env}.json`);
const responseFilter = require('../../util/responseFilter');
const codeFilter = require('../../util/identifyCode');
const http = require('http');
const db = config.mongo.db;
const user = config.collections.user;
const bcrypt = require('bcryptjs');
const svgCaptcha = require('svg-captcha');
const jwt = require('jsonwebtoken');
const SECRET = 'secret';
// 过期时间
const EXPRESSTIME = '3h';

module.exports = {
    login: async function (ctx) {
        try {
            const params = ctx.request.body;
            const username = params.username;
            // 只能做到查询用户是否存在
            let data = await ctx.mongo.db(db).collection(user).findOne({
                'user_name': username
            });
            if (data) {
                let createTime = parseInt(data.create_time);
                let endTime = createTime + parseInt(EXPRESSTIME) * 60 * 60 * 1000;
                var token = data.token;
                let result;
                result = {
                    'token': data.token,
                    'username': data.user_name
                };
                ctx.body = responseFilter(200, true, result);
            } else {
                ctx.body = codeFilter(401, '用户不存在', {})
            }
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    },
    getCode: async function (ctx) {
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
            const data  = {};
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
    },
    register: async function (ctx) {
        try {
            const params = ctx.request.body;
            const username = params.username;
            const identify = params.identify;
            const password = bcrypt.hashSync(params.password, 12);
            const createTime = + new Date();
            const token = '';
            let data = await ctx.mongo.db(db).collection(user).insert({
                'user_name': username,
                identify,
                token,
                password,
                'create_time': createTime
            });
            if (data.result.ok && data.result.ok === 1) {
                ctx.body = responseFilter(200, true, data);
            } else {
                ctx.body = responseFilter(400, false, data);
            }
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    },
    queryUser: async function (ctx) {
        try {
            let data = await ctx.mongo.db(db).collection(user).find().toArray();
            let result = [];
            data && data.forEach((item, index) => {
                result.push(item.user_name);
            });
            ctx.body = responseFilter(200, true, result);
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    },
    deleteOne: async function (ctx) {
        try {
            const params = ctx.request.body;
            const username = params.username;
            let data = await ctx.mongo.db(db).collection(user).update({}, {
                '$unset': {'user_name': username}
            }, false, true);
            if (data.result.ok && data.result.ok === 1) {
                ctx.body = responseFilter(200, true, data);
            } else {
                ctx.body = responseFilter(400, false, data);
            }
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    },
    status: async function (ctx) {
        try {
            ctx.body = responseFilter(200, true, 'service run');
        } catch (error) {
            console.log(error);
            ctx.body = responseFilter(500, false, error.message);
        }
    },
    // 上传图片
    upload: async function (ctx) {
        const file = ctx.request.files.file;
        const basename = path.basename(file.path);
        ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
    }
};
