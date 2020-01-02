/**
 *
 */
const crypto = require('crypto');

exports.getFormatSugs = (list, query) => {
    let sugList = [];
    let allSugdata = [];
    list.forEach(item => {
        let index = item.indexOf(query);
        if (index >= 0 && sugList.indexOf(item) < 0) {
            sugList.push(item);
            allSugdata.push({
                value: item,
                index: index
            })
        }
    });
    allSugdata.sort((a, b) => {
        return a.value.length - b.value.length
    }).sort((a, b) => {
        return a.index - b.index
    });
    return allSugdata.map(item => {
        return item.value
    })
};


exports.whole = (promises = []) => {
    const results = [];
    let l = promises.length;

    return new Promise(resolve => {
        promises.forEach((promise, i) => {
            promise.then(value => {
                results[i] = {status: 1, value};
                l--;
            }).catch(e => {
                results[i] = {status: 0, error: e};
                l--
            }).finally(() => {
                l || resolve(results);
            });
        });
    });
};

// 获取文件的MD5
exports.createFileMd5 = (file) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const readerStream = fs.createReadStream(file.path);
        readerStream.on('data', function (chunk) {
            hash.update(chunk);
        });
        readerStream.on('end', function () {
            resolve(hash.digest('hex'))
        })
    })
};
