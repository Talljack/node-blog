var express = require('express');
var router = express.Router();
const { loginCheck } = require('../control/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    let result = loginCheck(username, password);
    return result.then(result => {
        if (result.username) {
            req.session.username = result.username;
            req.session.realname = result.realname;
            res.json(new SuccessModel(true));
        } else {
            res.json(new ErrorModel('login failed'));
        }
    })
})

module.exports = router;