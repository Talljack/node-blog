/**
 *
 */
const bcrypt = require('bcryptjs');

// 加密
exports.genSalt = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(function (err, salt) {
            if (err) {
                reject('bcryptjs genSalt error');
                throw new Error(err)
            }
            bcrypt.hash(password, salt, function (error, hash) {
                if (error) {
                    reject('bcryptjs genSalt error');
                    throw new Error(error)
                }
                resolve(hash)
            });
        });
    })
};

// 校验
exports.compare = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then((res) => {
            resolve(res)
        }).catch(err => {
            reject('bcryptjs compare error');
            throw new Error(err)
        });
    })
};
