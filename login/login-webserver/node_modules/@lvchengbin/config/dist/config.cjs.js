'use strict';

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

var isObject = obj => obj && typeof obj === 'object' && !Array.isArray( obj );

class Config {
    constructor( config = {} ) {
        if( config instanceof  Config ) return config;
        if( !isObject( config ) ) {
            throw new TypeError( 'Expect an Object for default config value.' );
        }
        this.config = config;
    }

    set( path, value ) {

        if( arguments.length === 1 ) {
            if( !isObject( path ) ) {
                throw new TypeError( 'Expect an Object for default config value.' );
            }
            return this.config = path;
        }

        let obj = this.config;
        const list = path.split( '.' );

        for( let i = 0, l = list.length; i < l; i += 1 ) {
            const item = list[ i ];
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
    }

    get( path, defaultValue ) {

        if( !arguments.length ) {
            return  this.config;
        }

        let tmp = this.config;

        for( let item of path.split( '.' ) ) {
            try { 
                tmp = tmp[ item ];
            } catch( e ) { 
                tmp = undefined;
            }
            if( typeof tmp === 'undefined' ) break;
        }

        if( isUndefined( tmp ) ) {
            return defaultValue;
        }

        return tmp;
    }
}

module.exports = Config;
