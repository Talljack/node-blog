const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../control/blog');
const { SuccessModel, ErrorMedel } = require('../model/resModel');
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const author = ctx.query.author || '';
    const keyword = ctx.query.keyword || '';
    const listData = await getList(author, keyword);
    ctx.body = new SuccessModel(listData);
})
router.get('/detail', async function (ctx, next) {
    const id = ctx.query.id;
    let resData = await getDetail(id);
    ctx.body = new SuccessModel(resData);
})

router.post('/new',loginCheck, async function (ctx, next) {
    const body = ctx.request.body;
    body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
})

router.post('/update',loginCheck, async function (ctx, next) {
    let result = await updateBlog(id, ctx.request.body);
    if (result) {
        ctx.body = new SuccessModel(result);
    } else {
        ctx.body = new ErrorMedel('更新博客失败');
    }
})

router.post('/delete', loginCheck, async function (ctx, next) {
    const author = ctx.session.username;
    let result = await deleteBlog(id, author);
    if (result) {
        ctx.body = new SuccessModel(result);
    } else {
        ctx.body = new ErrorMedel('更新博客失败');
    }
})
module.exports = router
