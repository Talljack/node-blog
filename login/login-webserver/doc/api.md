# login-页面登录平台

[toc]

## 功能汇总




## 文件目录

```js
server
├── api
│   └── api.js // 其他api请求服务
├── common // 通用模块
│   ├── baseHttp.js // axios封装
│   ├── commander.js // 命令行
│   ├── console.js // 终端log颜色显示
│   ├── constant.js // 常量集合
│   ├── status.js // api请求通用返回数据
│   ├── upload.js // multiparty封装
│   └── xlsx.js // 创建xlsx相关
├── config // 配置相关
│   ├── index.js
│   └── jwt.js
├── controllers
│   ├── classify.js // 术语归类
│   ├── common.js // 通用
│   ├── detail.js // 术语详情
│   ├── detailFiles.js // 术语详情文件存储相关
│   ├── feature.js // 特征管理
│   ├── feedback.js // 规则反馈
│   ├── isLogin.js // 是否登录
│   ├── log.js // 日志
│   ├── login.js // 登录
│   ├── manage.js // 人员管理
│   ├── rule.js // 规则维护
│   ├── schema.js // 术语对照
│   ├── upload.js // 上传服务
│   └── user.js // 用户相关
├── data.js
├── db // 数据库相关
│   ├── index.js
│   ├── init // 数据库初始化
│   │   └── index.js
│   ├── models
│   │   ├── classify.js // 术语归类数据
│   │   ├── detail.js // 术语详情数据
│   │   ├── rules.js // 规则维护数据
│   │   ├── schema.js // 术语对照数据
│   │   └── user.js // 初始化用户数据
│   └── schema // 数据库表
│       ├── DetailModel.js // 术语详情表
│       ├── LogModel.js // 日志表
│       ├── RuleModel.js // 规则维护表
│       ├── SchemaItemModel.js // 术语对照表
│       ├── UserModel.js // 用户数据表
│       ├── classifyModel.js // 术语归类表
│       ├── customClassify.js // 术语归类目录维护
│       ├── customRules.js // 规则维护目录维护
│       └── customSchema.js // 术语对照目录维护
├── middleware // koa中间件
│   ├── errMiddleware.js // 捕获错误
│   ├── log.js // api请求日志处理
│   └── loginMiddleware.js // 登录中间件
├── router // 路由
│   ├── classirfy.js // 术语归类
│   ├── common.js // 通用
│   ├── detail.js // 术语详情
│   ├── detailFile.js // 术语详情文件处理
│   ├── feature.js // 特征管理
│   ├── feedback.js // 规则反馈
│   ├── index.js // 路由入口
│   ├── isLogin.js // 验证登录
│   ├── log.js // 日志
│   ├── login.js // 登录
│   ├── manage.js // 人员管理 `超级管理员`
│   ├── rule.js // 规则维护
│   ├── schema.js // 术语对照
│   ├── upload.js // 上传服务
│   └── user.js // 用户信息
├── services // 处理controller事务相关
│   ├── bcrypt.js
│   ├── classify.js
│   ├── common.js
│   ├── detail.js
│   ├── detailfile.js
│   ├── feature.js
│   ├── feedback.js
│   ├── jwt.js
│   ├── log.js
│   ├── manage.js
│   ├── rule.js
│   ├── schemaModel.js
│   └── user.js
└── util // 工具库
```

 ## 数据库设计

> 使用mongodb用于数据存储

数据表设计

### 日志

| 列 | 数据类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| _id | ObjectId |  | mongodb自生成  |
| user_id | String || 用户id |
| user_name | String || 用户名称 |
| action | String || 用户行为：create、delete、update、find |
| type | String || 一级目录名称 |
| sub_type | String || 二级目录名称 |
| message | String || 操作详情 |
| create_time | String || 创建时间 |

## api

- 通用 base_url 为`/api`
- 通用返回状态码：`status`: 0成功、1提示、2错误、3未登录。当`status !== 0`时 message存有错误信息
- 用户权限：`permission`: 0普通用户、1超级管理员、2管理员
- api请求需要登录验证的header中添加 `Authorization`参数，内容为`'Bearer' + token`
- 直接的GET请求query添加`token`参数

### 登录

#### 判断用户登录状态

- 请求路径:
    
    /islogin

- 请求方式：

    GET   
    
- 请求参数

    无  
    
- 返回参数

    ```js
    {
        status: 0，
        result: {
            permission: 1, // 用户权限 管理员和普通用户
            user_name: 'root', // 用户名
        }
    }
    ```    

    #### 登录

- 请求路径:
    
    /login

- 请求方式：

    POST
    
- 请求参数

    | 参数名 | 是否必须 | 内容 | 说明  |
    | --- | --- | --- | --- |
    | action | 是 | login | |
    | name | 是 || 账户名称 |
    | password | 是 || 密码 |

    ```js
    { 
        action: '',
        name: '',
        password: ''
    }
    ```    
    
- 返回参数

    ```js
    {
        status: 0,
        result: {
            token:'', // 用户登录验证
            user_name:'', // 用户名称
            permission: 1, // 用户权限
            rules: []
        }
    }
    ```   
