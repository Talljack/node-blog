const path = require('path');
const fs = require('fs');

// 创建写入文件流
function createWriteStream(filename) {
    let fullname = path.join(__dirname, '../', '../', 'log', filename);
    const writeStream = fs.createWriteStream(fullname, {
        flags: 'a'
    })
    return writeStream;
}

// 写入文件
function writeLog (wirteStream, log) {
    wirteStream.write(log + '\n');
}

// 写入access的log
const accessStream = createWriteStream('access.log');

const access = (log) => {
    writeLog(accessStream, log);
}

module.exports = {
    access
}

