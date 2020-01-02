'use strict';

var isArguments = obj => ({}).toString.call( obj ) === '[object Arguments]';

var isArray = obj => Array.isArray( obj );

/**
 * async function
 *
 * @syntax: 
 *  async function() {}
 *  async () => {}
 *  async x() => {}
 *
 * @compatibility
 * IE: no
 * Edge: >= 15
 * Android: >= 5.0
 *
 */

var isAsyncFunction = fn => ( {} ).toString.call( fn ) === '[object AsyncFunction]';

var isFunction = fn => ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn );

/**
 * arrow function
 *
 * Syntax: () => {}
 *
 * IE : no
 * Android : >= 5.0
 */

var arrowFunction = fn => {
    if( !isFunction( fn ) ) return false;
    return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
};

var isBoolean = s => typeof s === 'boolean';

var date = date => ({}).toString.call( date ) === '[object Date]';

var email = str => /^(([^#$%&*!+-/=?^`{|}~<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( str );

var isString = str => typeof str === 'string' || str instanceof String;

var isObject = obj => obj && typeof obj === 'object' && !Array.isArray( obj );

var empty = obj => {
    if( isArray( obj ) || isString( obj ) ) {
        return !obj.length;
    }
    if( isObject( obj ) ) {
        return !Object.keys( obj ).length;
    }
    return !obj;
};

var error = e => ({}).toString.call( e ) === '[object Error]';

var isFalse = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !obj;
    if( isString( obj ) ) {
        return [ 'false', 'no', '0', '', 'nay', 'n', 'disagree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !obj;
};

var isNumber = ( n, strict = false ) => {
    if( ({}).toString.call( n ).toLowerCase() === '[object number]' ) {
        return true;
    }
    if( strict ) return false;
    return !isNaN( parseFloat( n ) ) && isFinite( n )  && !/\.$/.test( n );
};

var isInteger = ( n, strict = false ) => {

    if( isNumber( n, true ) ) return n % 1 === 0;

    if( strict ) return false;

    if( isString( n ) ) {
        if( n === '-0' ) return true;
        return n.indexOf( '.' ) < 0 && String( parseInt( n ) ) === n;
    }

    return false;
};

/**
 * iterable
 *
 * @compatibility
 *
 * IE: no
 * Edge: >= 13
 * Android: >= 5.0
 *  
 */

var iterable = obj => {
    try {
        return isFunction( obj[ Symbol.iterator ] );
    } catch( e ) {
        return false;
    }
};

// https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L480

var isPlainObject = obj => {
    if( !isObject( obj ) ) {
        return false;
    }

    try {
        if( obj.constructor && !({}).hasOwnProperty.call( obj, 'constructor' ) && !({}).hasOwnProperty.call( obj.constructor.prototype, 'isPrototypeOf' ) ) {
            return false;
        }
    } catch( e ) {
        return false;
    }

    let key;
    for( key in obj ) {} // eslint-disable-line

    return key === undefined || ({}).hasOwnProperty.call( obj, key );
};

var promise = p => p && isFunction( p.then );

var regexp = reg => ({}).toString.call( reg ) === '[object RegExp]';

var isTrue = ( obj, generalized = true ) => {
    if( isBoolean( obj ) || !generalized ) return !!obj;
    if( isString( obj ) ) {
        return [ 'true', 'yes', 'ok', '1', 'yea', 'yep', 'y', 'agree' ].indexOf( obj.toLowerCase() ) > -1;
    }
    return !!obj;
};

function isUndefined() {
    return arguments.length > 0 && typeof arguments[ 0 ] === 'undefined';
}

/**
 * BNF of IPv4 address
 *
 * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
 *
 * dec-octet = DIGIT                ; 0-9
 *           / %x31-39 DIGIT        ; 10-99
 *           / "1" 2DIGIT           ; 100-199
 *           / "2" 2DIGIT           ; 200-249
 *           / "25" %x30-35         ; 250-255
 */
var ipv4 = ip => {
    if( !isString( ip ) ) return false;
    const pieces = ip.split( '.' );
    if( pieces.length !== 4 ) return false;

    for( const i of pieces ) {
        if( !isInteger( i ) ) return false;
        if( i < 0 || i > 255 ) return false;
    }
    return true;
};

/**
 * BNF of IPv6:
 *
 * IPv6address =                             6( h16 ":" ) ls32
 *              /                       "::" 5( h16 ":" ) ls32
 *              / [               h16 ] "::" 4( h16 ":" ) ls32
 *              / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
 *              / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
 *              / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
 *              / [ *4( h16 ":" ) h16 ] "::"              ls32
 *              / [ *5( h16 ":" ) h16 ] "::"              h16
 *              / [ *6( h16 ":" ) h16 ] "::"
 *
 *  ls32 = ( h16 ":" h16 ) / IPv4address
 *       ; least-significant 32 bits of address
 *
 *  h16 = 1 * 4HEXDIG
 *      ; 16 bits of address represented in hexadcimal
 */

var ipv6 = ip => {
    /**
     * An IPv6 address should have at least one colon(:)
     */
    if( ip.indexOf( ':' ) < 0 ) return false;

    /**
     * An IPv6 address can start or end with '::', but cannot start or end with a single colon.
     */
    if( /(^:[^:])|([^:]:$)/.test( ip ) ) return false;

    /**
     * An IPv6 address should consist of colon(:), dot(.) and hexadecimel
     */
    if( !/^[0-9A-Fa-f:.]{2,}$/.test( ip ) ) return false;

    /**
     * An IPv6 address should not include any sequences bellow:
     * 1. a hexadecimal with length greater than 4
     * 2. three or more consecutive colons
     * 3. two or more consecutive dots
     */
    if( /[0-9A-Fa-f]{5,}|:{3,}|\.{2,}/.test( ip ) ) return false;

    /**
     * In an IPv6 address, the "::" can only appear once.
     */
    if( ip.split( '::' ).length > 2 ) return false;

    /**
     * if the IPv6 address is in mixed form.
     */
    if( ip.indexOf( '.' ) > -1 ) {
        const lastColon = ip.lastIndexOf( ':' );
        const hexadecimal = ip.substr( 0, lastColon );
        const decimal = ip.substr( lastColon + 1 );
        /**
         * the decimal part should be an valid IPv4 address.
         */
        if( !ipv4( decimal ) ) return false;

        /**
         * the length of the hexadecimal part should less than 6.
         */
        if( hexadecimal.split( ':' ).length > 6 ) return false;
    } else {
        /**
         * An IPv6 address that is not in mixed form can at most have 8 hexadecimal sequences.
         */
        if( ip.split( ':' ).length > 8 ) return false;
    }
    return true;
};

function encodePathname( pathname ) {
    if( !pathname ) return pathname;
    const splitted = pathname.split( '/' );
    const encoded = [];
    for( const item of splitted ) {
        encoded.push( encodeURIComponent( item ) );
    }
    return encoded.join( '/' );
}

function encodeSearch( search ) {
    if( !search ) return search;
    return '?' + search.substr( 1 ).replace( /[^&=]/g, m => encodeURIComponent( m ) );
}

/**
 * <user>:<password> can only be supported with FTP scheme on IE9/10/11
 *
 * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
 * reserved = gen-delims / sub-delims
 * gen-delims = ":" / "/" / "?" / "#" / "[" / "]" / "@"
 * sub-delims = "!" / "$" / "&" / "'" / "(" / ")"
 *              / "*" / "+" / "," / ";" / "="
 *
 * pct-encoded = "%" HEXDIG HEXDIG
 */

/**
 * protocols that always contain a // bit and must have non-empty path
 */
const slashedProtocol = [ 'http:', 'https:', 'ftp:', 'gopher:', 'file:' ];

var url = url => {
    if( !isString( url ) ) return false;
    /**
     * scheme = ALPHA * ( ALPHA / DIGIT / "+" / "-" / "." )
     */
    const splitted = url.match( /^([a-zA-Z][a-zA-Z0-9+-.]*:)([^?]*)(\?[^#]*)?(#.*)?/ );
    if( !splitted ) return false;
    let [ , scheme, hier, search = '', hash = '' ] = splitted;
    const protocol = scheme.toLowerCase();
    let username = '';
    let password = '';
    let href = protocol;
    let origin = protocol;
    let port = '';
    let pathname = '/';
    let hostname = '';

    if( slashedProtocol.indexOf( protocol ) > -1 ) {
        if( /^[:/?#[]@]*$/.test( hier ) ) return false;
        hier = '//' + hier.replace( /^\/+/, '' );
        href += '//';
        origin += '//';
    }

    /**
     * hier-part = "//" authority path-abempty
     *              / path-absolute
     *              / path-rootless
     *              / path-empty
     * authority = [ userinfo "@" ] host [ ":" port ]
     * userinfo = *( unreserved / pct-encoded /sub-delims / ":" )
     *
     * path = path-abempty      ; begins with "/" or is empty
     *      / path-absolute     ; begins with "/" but not "//"
     *      / path-noscheme     ; begins with a non-colon segment
     *      / path-rootless     ; begins with a segment
     *      / path-empty        ; zero characters
     *
     * path-abempty     = *( "/" segment )
     * path-absolute    = "/" [ segment-nz *( "/" segment ) ]
     * path-noscheme    = segment-nz-nc *( "/" segment )
     * path-rootless    = segment-nz *( "/" segment )
     * path-empty       = 0<pchar>
     * segment          = *pchar
     * segment-nz       = 1*pchar
     * setment-nz-nc    = 1*( unreserved / pct-encoded /sub-delims / "@" )
     *                  ; non-zero-length segment without any colon ":"
     *
     * pchar            = unreserved / pct-encoded /sub-delims / ":" / "@"
     *
     * host = IP-literal / IPv4address / reg-name
     * IP-leteral = "[" ( IPv6address / IpvFuture ) "]"
     * IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
     * reg-name = *( unreserved / pct-encoded / sub-delims )
     *
     * PORT = *DIGIT
     * A TCP header is limited to 16-bits for the source/destination port field.
     * @see http://www.faqs.org/rfcs/rfc793.html
     */

    /**
     * "//" authority path-abempty
     */
    if( slashedProtocol.indexOf( protocol ) > -1 ) {
        const matches = hier.substr( 2 ).match( /(?:(?:(?:([^:/?#[\]@]*):([^:/?#[\]@]*))?@)|^)([^:/?#[\]@]+|\[[^/?#[\]@]+\])(?::([0-9]+))?(\/.*|\/)?$/ );
        if( !matches ) return false;
        [ , username = '', password = '', hostname = '', port = '', pathname = '/' ] = matches;
        if( port && port > 65535 ) return false;

        if( username || password ) {
            if( username ) {
                href += username;
            }

            if( password ) {
                href += ':' + password;
            }
            href += '@';
        }

        /**
         * To check the format of IPv4
         * includes: 1.1.1.1, 1.1, 1.1.
         * excludes: .1.1, 1.1..
         */
        if( /^[\d.]+$/.test( hostname ) && hostname.charAt( 0 ) !== '.' && hostname.indexOf( '..' ) < 0 ) {
            let ip = hostname.replace( /\.+$/, '' );
            if( !ipv4( ip ) ) {
                const pieces = ip.split( '.' );
                if( pieces.length > 4 ) return false;
                /**
                 * 300 => 0.0.1.44
                 * 2 => 0.0.0.2
                 */
                if( pieces.length === 1 ) {
                    const n = pieces[ 0 ];
                    ip = [ ( n >> 24 ) & 0xff, ( n >> 16 ) & 0xff, ( n >> 8 ) & 0xff, n & 0xff ].join( '.' );
                } else {
                    const l = pieces.length;
                    if( l < 4 ) {
                        pieces.splice( l - 1, 0, ...( Array( 3 - l ).join( 0 ).split( '' ) ) );
                    }
                    ip = pieces.join( '.' );
                }
                if( !ipv4( ip ) ) return false;
            }
            hostname = ip;
        } else if( hostname.charAt( 0 ) === '[' ) {
            if( !ipv6( hostname.substr( 1, hostname.length - 2 ) ) ) return false;
        }

        href += hostname;
        origin += hostname;
        if( port ) {
            href += ':' + port;
            origin += ':' + port;
        }
        href += pathname;
    } else {
        pathname = hier;
        href += hier;
        origin = null;
    }

    href += search + hash;

    return {
        href,
        protocol,
        origin,
        username,
        password,
        hostname,
        host : hostname + ( port ? ':' + port : '' ),
        pathname : encodePathname( pathname ),
        search : encodeSearch( search ),
        hash,
        port
    };
};

var isNode = s => ( typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string' );

var textNode = node => node && node.nodeType === 3 && isNode( node );

var elementNode = node => node && node.nodeType === 1 && isNode( node );

var fragmentNode = node => node && node.nodeType === 11 && isNode( node );

var isWindow = obj => obj && obj === obj.window;

var isClass = obj => isFunction( obj ) && /^\s*class\s+/.test( obj.toString() );

var ip = ip => ipv4( ip ) || ipv6( ip );

/**
 * Private IPv4 address
 *
 * 10.0.0.0 ~ 10.255.255.255
 * 172.16.0.0 ~ 172.31.255.255
 * 192.168.0.0 ~ 192.168.255.255
 */

var privateIPv4 = ip => {
    if( !ipv4( ip ) ) return false;
    if( /^10\..*/.test( ip ) ) return true;
    if( /^192\.168\..*/.test( ip ) ) return true;
    if( /^172\.(1[6-9]|2[0-9]|3[0-1])\..*/.test( ip ) ) return true;
    return false;
};

var generator = fn => {
    try {
        return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
    } catch( e ) {
        return false;
    }
};

var oneDimensionalArray = ( arr, strict ) => {
    if( !isArray( arr ) ) return false;

    for( const item of arr ) {
        if( !item ) continue;
        if( strict && isPlainObject( item ) ) return false;
        if( isArray( item ) ) return false;
    }
    return true;
};

var isMap = obj => ({}).toString.call( obj ) === '[object Map]';

var isSet = obj => ({}).toString.call( obj ) === '[object Set]';

var is = {
    arguments : isArguments,
    array: isArray,
    arrowFunction,
    asyncFunction: isAsyncFunction,
    boolean : isBoolean,
    date,
    email,
    empty,
    error,
    false : isFalse,
    function : isFunction,
    integer: isInteger,
    iterable,
    number: isNumber,
    object: isObject,
    plainObject: isPlainObject,
    promise,
    regexp,
    string: isString,
    true : isTrue,
    undefined : isUndefined,
    url,
    node: isNode,
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

module.exports = is;
