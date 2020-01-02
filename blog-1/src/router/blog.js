const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../control/blog');
const { SuccessModel, ErrorMedel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const method = req.method;
    let id = req.query.id;
    const loginCheck = (req) => {
        if (!req.session.username) {
            return Promise.resolve(new ErrorModel('not login'));
        }
    }
    // 获取博客列表  author keyword
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const result = getList(author, keyword);
        return result.then(listData => {
            return Promise.resolve(new SuccessModel(listData));
        })
    }

    // 获取博客详情  query id
    if (method === 'GET' && req.path === '/api/blog/detail') {
        let result = getDetail(id);
        return result.then(resData => {
            return new SuccessModel(resData);
        })
    }

    // 新建一篇博客  id postData
    if (method === 'POST' && req.path === '/api/blog/new') {
        let result = loginCheck(req);
        if (result) {
            return result;
        }
        req.body.author = req.session.username;
        return newBlog(req.body).then(data => {
            return new SuccessModel(data);
        })
    }

    // 更新一篇博客 id postData
    if (method === 'POST' && req.path === '/api/blog/update') {
        let result = loginCheck(req);
        if (result) {
            return result;
        }

        let resultData = updateBlog(id, req.body);
        return resultData.then(res => {
            if (res) {
                return new SuccessModel(res);
            } else {
                return new ErrorMedel('更新博客失败');
            }
        })
    }

    // 删除一篇博客 id
    if (method === 'POST' && req.path === '/api/blog/delete') {
        let result = loginCheck(req);
        if (result) {
            return result;
        }

        const author = req.session.username;
        let resultData = deleteBlog(id, author);
        return resultData.then(res => {
            if (res) {
                return new SuccessModel(res);
            } else {
                return new ErrorMedel('删除博客失败');
            }
        })
    }
}
module.exports = handleBlogRouter;