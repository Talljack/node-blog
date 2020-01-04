#!/bin/bash
export PATH=$NODEJS_BIN_LATEST:$PATH;

echo "node: ${node -v}"
echo "npm: ${npm -v}"

npm install

if [-d output ];then
        rm -rf output
fi

mkdir output
mkdir output/logs
cp -r config output
cp -r bin output
cp -r logs output
cp -r middleware output
cp -r node_modules output
cp -r public output
cp -r router output
cp -r utils output
cp app.js output
cp package.json output
cp package-lock.json output
cp pm2.json output
