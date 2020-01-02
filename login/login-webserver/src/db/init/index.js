
const schemas = require('../models/schema');
const users = require('../models/user');

const UsersModel = require('../schema/UserModel');
const {genSalt} = require('../../services/bcrypt');
const Config = require('../../config');

const ALL_SCHEMA = [
    {
        name: 'contrast',
        data: schemas
    },
    {
    	name: 'user',
    	data: users
    }
];

// 创建用户
const initUserDb = async () => {
    try {
        return await Promise.all(users.map(user => {
            genSalt(user.password).then(newPwd => {
                user.password = newPwd;
                if (user.permission === 2) {
                    user.rules = getAdminRules()
                } else {
                    user.rules = getAllRules()
                }
                return UsersModel.updateOne({account: user.account}, user, {upsert: true})
            })
        }))
    } catch (e) {
        console.error('创建用户失败');
        throw new Error(e)
    }
};

const initDb = async () => {
    try {
        return await Promise.all([initUserDb()])
    } catch (e) {
        console.error(e);
        throw new Error(Constant.mongodb.CREATE_ERROR)
    }
};

initDb().then(() => {
    console.log('初始化数据成功');
    process.exit()
}).catch(err => {
    process.exit();
    throw new Error(err)
});