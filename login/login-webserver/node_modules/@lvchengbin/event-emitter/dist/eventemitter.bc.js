(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmitter = factory());
}(this, (function () { 'use strict';

var isString = (function (str) {
  return typeof str === 'string' || str instanceof String;
});

var isAsyncFunction = (function (fn) {
  return {}.toString.call(fn) === '[object AsyncFunction]';
});

var isFunction = (function (fn) {
  return {}.toString.call(fn) === '[object Function]' || isAsyncFunction(fn);
});

var isRegExp = (function (reg) {
  return {}.toString.call(reg) === '[object RegExp]';
});

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var EventEmitter = function () {
    function EventEmitter() {
        classCallCheck(this, EventEmitter);

        this.__listeners = {};
    }

    createClass(EventEmitter, [{
        key: '$alias',
        value: function $alias(name, to) {
            this[name] = this[to].bind(this);
        }
    }, {
        key: '$on',
        value: function $on(evt, handler) {
            var listeners = this.__listeners;
            listeners[evt] ? listeners[evt].push(handler) : listeners[evt] = [handler];
            return this;
        }
    }, {
        key: '$once',
        value: function $once(evt, handler) {
            var _this = this;

            var _handler = function _handler() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                handler.apply(_this, args);
                _this.$removeListener(evt, _handler);
            };
            return this.$on(evt, _handler);
        }
    }, {
        key: '$removeListener',
        value: function $removeListener(evt, handler) {
            var listeners = this.__listeners,
                handlers = listeners[evt];

            if (!handlers || !handlers.length) {
                return this;
            }

            for (var i = 0; i < handlers.length; i += 1) {
                handlers[i] === handler && (handlers[i] = null);
            }

            setTimeout(function () {
                for (var _i = 0; _i < handlers.length; _i += 1) {
                    handlers[_i] || handlers.splice(_i--, 1);
                }
            }, 0);

            return this;
        }
    }, {
        key: '$emit',
        value: function $emit(evt) {
            var handlers = this.__listeners[evt];
            if (handlers) {
                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                for (var i = 0, l = handlers.length; i < l; i += 1) {
                    handlers[i] && handlers[i].apply(handlers, args);
                }
                return true;
            }
            return false;
        }
    }, {
        key: '$removeAllListeners',
        value: function $removeAllListeners(rule) {
            var checker = void 0;
            if (isString(rule)) {
                checker = function checker(name) {
                    return rule === name;
                };
            } else if (isFunction(rule)) {
                checker = rule;
            } else if (isRegExp(rule)) {
                checker = function checker(name) {
                    rule.lastIndex = 0;
                    return rule.test(name);
                };
            }

            var listeners = this.__listeners;
            for (var attr in listeners) {
                if (checker(attr)) {
                    listeners[attr] = null;
                    delete listeners[attr];
                }
            }
        }
    }]);
    return EventEmitter;
}();

return EventEmitter;

})));
