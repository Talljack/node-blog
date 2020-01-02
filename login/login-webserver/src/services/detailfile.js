/**
 *
 */
const Constant = require('../common/constant');
const {createLog} = require('./log');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.saveFile = (file, filePath) => {
    let buffer = fs.readFileSync(file.path);
    let fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    let md5 = fsHash.digest('hex');
    let ext = file.type.split('/').pop();
    let fileName = md5 + '.' + ext;
    let fileRenamePath = path.resolve(__dirname, filePath + fileName);
    if (fs.existsSync(fileRenamePath)) {
        return fileName
    }
    fs.copyFileSync(file.path, path.resolve(__dirname, fileRenamePath));
    return fileName
};

exports.uploadFile = (files, saveFilePath) => {
    let fileNames = [];
    if (isNaN(files.length)) {
        let fileName = this.saveFile(files, saveFilePath);
        fileNames.push(fileName)
    } else {
        files.forEach(item => {
            let fileName = this.saveFile(item, saveFilePath);
            fileNames.push(fileName)
        });
    }
    return fileNames
};

exports.deleteFile = (fileName) => {
    const filePath = path.resolve(__dirname, '../../files/detailfile/' + fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    } else {
        throw new Error('文件不存在')
    }
};
