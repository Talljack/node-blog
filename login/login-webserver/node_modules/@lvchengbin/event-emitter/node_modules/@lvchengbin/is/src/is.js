import isArguments from './arguments';
import isArray from './array';
import isArrowFunction from './arrow-function';
import isAsyncFunction from './async-function';
import isBoolean from './boolean';
import isDate from './date';
import isEmail from './email';
import isEmpty from './empty';
import isError from './error';
import isFalse from './false';
import isFunctoin from './function';
import isInteger from './integer';
import isIterable from './iterable';
import isNumber from './number';
import isObject from './object';
import isPromise from './promise';
import isRegExp from './regexp';
import isString from './string';
import isTrue from './true';
import isUndefined from './undefined';
import isUrl from './url';

export default {
    arguments : isArguments,
    array : isArray,
    arrowFunction : isArrowFunction,
    asyncFunction : isAsyncFunction,
    boolean : isBoolean,
    date : isDate,
    email : isEmail,
    empty : isEmpty,
    error : isError,
    false : isFalse,
    function : isFunctoin,
    integer : isInteger,
    iterable : isIterable,
    number : isNumber,
    object : isObject,
    promise : isPromise,
    regexp : isRegExp,
    string : isString,
    true : isTrue,
    undefined : isUndefined,
    url : isUrl
};
