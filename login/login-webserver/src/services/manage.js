// const UserModel = require('../db/schema/UserModel');
const Constant = require('../common/constant');
// const {getFeatureSubList} = require('./feature');

// 获取单个用户信息
exports.getUserInfo = async (data, options = null) => {
    try {
        // return await UserModel.findOne(data, options);
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.FIND_ERROR)
    }
};

// 获取用户信息
exports.getPeoples = async (data = {}, options = null, set = null) => {
    try {
        // return await UserModel.find(data, options, set);
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.FIND_ERROR)
    }
};

// 创建用户
exports.createUser = async (data) => {
    try {
        // return await UserModel.create(data)
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.CREATE_ERROR)
    }
};

// 删除用户
exports.deleteUser = async (userId) => {
    try {
        // return await UserModel.remove({_id: userId})
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.DELETE_ERROR)
    }
};

exports.updateUserInfo = async (account, params) => {
    try {
        // return await UserModel.update({account: account}, params)
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.UPDATE_ERROR)
    }
};