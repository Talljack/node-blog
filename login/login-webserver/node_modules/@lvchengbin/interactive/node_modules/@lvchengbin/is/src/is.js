import isArguments from './arguments';
import array from './array';
import arrowFunction from './arrow-function';
import asyncFunction from './async-function';
import isBoolean from './boolean';
import date from './date';
import email from './email';
import empty from './empty';
import error from './error';
import isFalse from './false';
import isFunctoin from './function';
import integer from './integer';
import iterable from './iterable';
import number from './number';
import object from './object';
import plainObject from './plain-object';
import promise from './promise';
import regexp from './regexp';
import string from './string';
import isTrue from './true';
import isUndefined from './undefined';
import url from './url';
import node from './node';
import textNode from './text-node';
import elementNode from './element-node';
import fragmentNode from './fragment-node';
import isWindow from './window';
import isClass from './class';
import ip from './ip';
import ipv4 from './ipv4';
import ipv6 from './ipv6';
import privateIPv4 from './private-ipv4';
import generator from './generator';
import oneDimensionalArray from './one-dimensional-array';
import isMap from './map';
import isSet from './set';

export default {
    arguments : isArguments,
    array,
    arrowFunction,
    asyncFunction,
    boolean : isBoolean,
    date,
    email,
    empty,
    error,
    false : isFalse,
    function : isFunctoin,
    integer,
    iterable,
    number,
    object,
    plainObject,
    promise,
    regexp,
    string,
    true : isTrue,
    undefined : isUndefined,
    url,
    node,
    textNode,
    elementNode,
    fragmentNode,
    window : isWindow,
    class : isClass,
    ip,
    ipv4,
    ipv6,
    privateIPv4,
    generator,
    oneDimensionalArray,
    map : isMap,
    set : isSet
};
