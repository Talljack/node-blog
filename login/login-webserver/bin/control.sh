#!/bin/bash

#被占用,则返回0,否则返回1
function check_port_occupation
{
    local result_str proc_port
    if [ $# -eq 1 -a $1 > 0 ];
    then
        proc_port=$1
        result_str=`/usr/sbin/lsof -P -i :$proc_port +c 0 |grep "*:$proc_port\>" | awk '{print $1}' | uniq`
        if [ -z "${result_str}" ];
        then
            return 1
        else
            return 0
        fi
    else
        return 0
    fi
}

function check_proc_exist
{
    local proc_name proc_port port_name
    if [ $# -eq 2 -a $2 -gt 0 2>/dev/null ];then
        proc_name=$1
        proc_port=$2
        port_name=`/usr/sbin/lsof -P -i :$proc_port +c 0 |grep "*:$proc_port\>"|awk '{print $1}'|uniq`
        if [ "$proc_name" = "$port_name" ];then
            return 0
        else
            return 1
        fi
    elif [ $# -eq 1 ];then
        proc_name=$1
        pstree -pl|grep "\-${proc_name}([0-9].*)" &>/dev/null
        if [ $? -eq 0 ];then
            return 0
        else
            return 1
        fi
    else
        return 1
    fi
}
