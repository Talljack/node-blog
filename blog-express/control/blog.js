const { queryInfo } = require('../db/mysql');
const xss = require('xss');
const getList = (author, keyword) => {
    let query = 'select * from blog where 1=1 ';
    if (author) {
        query += `and author='${author}' `;
    }
    if (keyword) {
        query += `and title like '%${keyword}%' `;
    }
    query += 'order by createTime desc;';
    return queryInfo(query);
}
const getDetail = (id) => {
    let query = `select * from blog where id='${id}';`;
    return queryInfo(query).then(res => {
        return res[0];
    })
}
const newBlog = (blogData = {}) => {
    // 预防XSS攻击  使用XSS库函数即可
    const title = xss(blogData.title);
    const content = blogData.content;
    const createTime = Date.now();
    const author = blogData.author;
    let query = `insert into blog (title, content, createTime, author) values ('${title}', '${content}', ${createTime}, '${author}');`;
    return queryInfo(query).then(res => {
        return {
            id: res.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title;
    const content = blogData.content;
    const query = `update blog set title='${title}', content='${content}' where id='${id}';`;
    return queryInfo(query).then(res => {
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const deleteBlog = (id, author) => {
    let query = `delete from blog where id='${id}' and author='${author}';`;
    return queryInfo(query).then(res => {
        if (res.affectedRows > 0) {
            return true;
        }
        return false;
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}