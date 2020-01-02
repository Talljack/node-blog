#!/bin/bash

CURRENT_PATH=`cd $(dirname $0);pwd`
ROOT_PATH=${CURRENT_PATH}/..
DEPLOY_HOME=$HOME/cdss/nginx/html/cdss-platform

function check_proc_exist
{
    local proc_name proc_port port_name
    proc_name=$1
    proc_port=$2
    port_name=`/usr/sbin/lsof -P -i :$proc_port +c 0 |grep "*:$proc_port\>"|awk '{print $1}'|uniq`
    if [ "$proc_name" = "$port_name" ];then
        return 0
    else
        return 1
    fi
}

if [[ ! -d "$HOME/cdss/nginx" ]]; then
    echo "Please install nginx($HOME/cdss/nginx)" 1>&2
    exit 1
fi

readonly NGINX_PORT=`cat $HOME/cdss/nginx/conf/nginx.conf | grep "^ *listen" | sed 's/ *listen *\([0-9]*\);/\1/g'`

rm -rf ${DEPLOY_HOME}
cp -r ${ROOT_PATH}/cdss-platform ${DEPLOY_HOME}

host_ip=$(/sbin/ip addr | awk '/^[0-9]+: / {}; /inet.*global/ {print gensub(/(.*)\/(.*)/, "\\1", "g", $2)}' | head -n 1)
echo "Current Host: ${host_ip}"
host_repalce_cmd="sed -i \"s/127\.0\.0\.1/${host_ip}/g\" \`grep \"127.0.0.1\" -rl ${DEPLOY_HOME}\`"
eval ${host_repalce_cmd}

cp ${ROOT_PATH}/conf/nginx.conf $HOME/cdss/nginx/conf/

check_proc_exist "nginx" ${NGINX_PORT}
if [ "$?" -ne 0 ]; then
    $HOME/cdss/nginx/sbin/nginx
    if [ "$?" -ne 0 ]; then
        echo "Please start nginx" 1>&2
        exit 1
    fi
else
    $HOME/cdss/nginx/sbin/nginx -s reload
    if [ "$?" -ne 0 ]; then
        echo "Please reload nginx" 1>&2
        exit 1
    fi
fi

exit 0
