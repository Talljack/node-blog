/**
 *
 */
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const Constant = require('../common/constant');

const upload = function (req, updatePath) {
    return new Promise((resolve, reject) => {
        let form = new multiparty.Form();
        form.uploadDir = updatePath;
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(Constant.upload.UPLOAD_ERR)
            } else {
                let file = files.file[0];
                let originFileName = file.originalFilename;
                let filePath = path.resolve(updatePath + originFileName);
                fs.renameSync(file.path, filePath);
                resolve({
                    file: file,
                    filePath: filePath
                });
            }
        })
    })

};

module.exports = upload;
