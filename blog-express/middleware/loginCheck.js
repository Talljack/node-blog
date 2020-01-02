const { ErrorMedel } = require('../model/resModel');

module.exports = (req, res, next) => {
    if (req.session.username) {
        next();
    } else {
        res.json({
            code: -1,
            msg: '未登录'
        })
    }
}