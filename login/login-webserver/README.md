# login

[toc]

## 安装

```bash
# 安装npm模块
$ npm install
```

## 配置

./server/config/index.js

```js
build: {
    name: '生产模式',
    adminMenu: [], admin管理员账户目录
    server: {
        sug: '', // sug服务地址
    },
    mongodb: {
        mainUrl: 'mongodb://localhost:27017' // mongo数据库
    }
}
```

## 启动服务

```bash
# 默认端口8088 开发模式
node server

# 自定端口 开发模式
node server --port=****

# 生产模式
node server --port=**** --build

# 初始化数据库基础文件
npm run initDb
```
