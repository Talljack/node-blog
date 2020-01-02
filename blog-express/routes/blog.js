var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../control/blog');
const { SuccessModel, ErrorMedel } = require('../model/resModel');
router.get('/list', function (req, res, next) {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const result = getList(author, keyword);
    return result.then(listData => {
        res.json(new SuccessModel(listData));
    })
})

router.get('/detail', function (req, res, next) {
    const id = req.query.id;
    let result = getDetail(id);
    return result.then(resData => {
        res.json(new SuccessModel(resData));
    })
})

router.post('/new',loginCheck, function (req, res, next) {
    req.body.author = req.session.username;
    return newBlog(req.body).then(data => {
        res.json(new SuccessModel(data));
    })
})

router.post('/update',loginCheck, function (req, res, next) {
    let resultData = updateBlog(id, req.body);
    return resultData.then(result => {
        if (result) {
            res.json(new SuccessModel(result));
        } else {
            res.json(new ErrorMedel('更新博客失败'));
        }
    })
})

router.post('/delete', loginCheck, function (req, res, next) {
    const author = req.session.username;
    let resultData = deleteBlog(id, author);
    return resultData.then(result => {
        if (result) {
            res.json(new SuccessModel(result));
        } else {
            res.json(new ErrorMedel('更新博客失败'));
        }
    })
})
module.exports = router;