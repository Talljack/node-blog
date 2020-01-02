#!/bin/sh
cd /Users/yugangcao/Desktop/nodejs-myblog/blog-1/log
cp access.log $(date +%Y-%m-%d).access.log
echo '' > access.log