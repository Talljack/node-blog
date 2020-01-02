const http = require('http');

const server = http.createServer((req, res) => {
    // 模拟日志
    console.log('log log');
    // 模拟出错
    console.error('模拟出错');
    // 模拟一个错误
    if (req.url === '/err') {
        throw new Error('页面崩溃了。。。');
    }
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({
        code: 0,
        data: 'PM2 test server start...'
    }))
})

server.listen(8000, () => {
    console.log('now is running');
})