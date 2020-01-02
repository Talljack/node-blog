const { loginCheck } = require('../control/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { redisSet } = require('../db/redis');
const handleUserRouter = (req, res) => {
    const method = req.method;
    // 登陆  query id keyword
    if (method === 'POST' && req.path === '/api/user/login') {
        // const username = req.body.username;
        // const password = req.body.password;
        const { username, password } = req.body;
        // const { username, password } = req.query;
        let result = loginCheck(username, password);
        return result.then(result => {
            if (result.username) {
                req.session.username = result.username;
                req.session.realname = result.realname;
                redisSet(req.sessionId, req.session);
                return new SuccessModel(true);
            } else {
                return new ErrorModel('login failed');
            }
        })
    }
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     } else {
    //         return Promise.resolve(new ErrorModel('尚未登陆'));
    //     }
    // }
}
module.exports = handleUserRouter;