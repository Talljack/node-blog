#!/bin/bash

CURRENT_PATH=$(cd `dirname $0`; pwd)
ROOT_PATH=${CURRENT_PATH}

FTP_PATH=ftp://fs.cdss.baidu-int.com/home/work/cdss/opt/baidu_centos6/node
NODE_NAME=node-10.15.0

cd ${ROOT_PATH}
rm -rf output node_modules

if [[ ! -d "${ROOT_PATH}/${NODE_NAME}" ]]; then
    rm -f ${NODE_NAME}.tar.gz
    wget --no-passive-ftp ${FTP_PATH}/${NODE_NAME}.tar.gz
    tar zxf ${NODE_NAME}.tar.gz
    rm -f ${NODE_NAME}.tar.gz
fi

export PATH="${ROOT_PATH}/${NODE_NAME}/bin:$PATH"

npm -v
if [ "$?" -ne 0 ]; then
    echo "Fail to install npm" 1>&2
    exit 1
fi

npm install --registry=http://registry.npm.baidu-int.com
if [ "$?" -ne 0 ]; then
    echo "Fail to run npm install" 1>&2
    exit 1
fi

mkdir output
tar zcf server.tar.gz server
tar zcf node_modules.tar.gz node_modules
mv server.tar.gz node_modules.tar.gz output/
cp -r bin server.js package.json package-lock.json pm2.json output/
