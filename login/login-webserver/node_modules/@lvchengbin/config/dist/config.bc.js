(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Config = factory());
}(this, (function () { 'use strict';

    function isUndefined() {
        return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
    }

    function isObject (obj) { return obj && typeof obj === 'object' && !Array.isArray( obj ); }

    var Config = function Config( config ) {
        if ( config === void 0 ) config = {};

        if( config instanceof  Config ) { return config; }
        if( !isObject( config ) ) {
            throw new TypeError( 'Expect an Object for default config value.' );
        }
        this.config = config;
    };

    Config.prototype.set = function set ( path, value ) {

        if( arguments.length === 1 ) {
            if( !isObject( path ) ) {
                throw new TypeError( 'Expect an Object for default config value.' );
            }
            return this.config = path;
        }

        var obj = this.config;
        var list = path.split( '.' );

        for( var i = 0, l = list.length; i < l; i += 1 ) {
            var item = list[ i ];
            if( i === l - 1 ) {
                obj[ item ] = value;
            } else {
                if( isUndefined( obj[ item ] ) ) {
                    obj[ item ] = {};
                }
                obj = obj[ item ];
            }
        }
        return value;
    };

    Config.prototype.get = function get ( path, defaultValue ) {

        if( !arguments.length ) {
            return  this.config;
        }

        var tmp = this.config;

        for( var i = 0, list = path.split( '.' ); i < list.length; i += 1 ) {
            var item = list[i];

                try { 
                tmp = tmp[ item ];
            } catch( e ) { 
                tmp = undefined;
            }
            if( typeof tmp === 'undefined' ) { break; }
        }

        if( isUndefined( tmp ) ) {
            return defaultValue;
        }

        return tmp;
    };

    return Config;

})));
