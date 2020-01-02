(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.is = factory());
}(this, (function () { 'use strict';

    function isArguments (obj) { return ({}).toString.call( obj ) === '[object Arguments]'; }

    function isArray (obj) { return Array.isArray( obj ); }

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

    function isAsyncFunction (fn) { return ( {} ).toString.call( fn ) === '[object AsyncFunction]'; }

    function isFunction (fn) { return ({}).toString.call( fn ) === '[object Function]' || isAsyncFunction( fn ); }

    /**
     * arrow function
     *
     * Syntax: () => {}
     *
     * IE : no
     * Android : >= 5.0
     */

    function arrowFunction (fn) {
        if( !isFunction( fn ) ) { return false; }
        return /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test( fn.toString() );
    }

    function isBoolean (s) { return typeof s === 'boolean'; }

    function date (date) { return ({}).toString.call( date ) === '[object Date]'; }

    function email (str) { return /^(([^#$%&*!+-/=?^`{|}~<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( str ); }

    function isString (str) { return typeof str === 'string' || str instanceof String; }

    function isObject (obj) { return obj && typeof obj === 'object' && !Array.isArray( obj ); }

    function empty (obj) {
        if( isArray( obj ) || isString( obj ) ) {
            return !obj.length;
        }
        if( isObject( obj ) ) {
            return !Object.keys( obj ).length;
        }
        return !obj;
    }

    function error (e) { return ({}).toString.call( e ) === '[object Error]'; }

    function isFalse ( obj, generalized ) {
        if ( generalized === void 0 ) generalized = true;

        if( isBoolean( obj ) || !generalized ) { return !obj; }
        if( isString( obj ) ) {
            return [ 'false', 'no', '0', '', 'nay', 'n', 'disagree' ].indexOf( obj.toLowerCase() ) > -1;
        }
        return !obj;
    }

    function isNumber ( n, strict ) {
        if ( strict === void 0 ) strict = false;

        if( ({}).toString.call( n ).toLowerCase() === '[object number]' ) {
            return true;
        }
        if( strict ) { return false; }
        return !isNaN( parseFloat( n ) ) && isFinite( n )  && !/\.$/.test( n );
    }

    function isInteger ( n, strict ) {
        if ( strict === void 0 ) strict = false;


        if( isNumber( n, true ) ) { return n % 1 === 0; }

        if( strict ) { return false; }

        if( isString( n ) ) {
            if( n === '-0' ) { return true; }
            return n.indexOf( '.' ) < 0 && String( parseInt( n ) ) === n;
        }

        return false;
    }

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

    function iterable (obj) {
        try {
            return isFunction( obj[ Symbol.iterator ] );
        } catch( e ) {
            return false;
        }
    }

    // https://github.com/jquery/jquery/blob/2d4f53416e5f74fa98e0c1d66b6f3c285a12f0ce/test/data/jquery-1.9.1.js#L480

    function isPlainObject (obj) {
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

        var key;
        for( key in obj ) {} // eslint-disable-line

        return key === undefined || ({}).hasOwnProperty.call( obj, key );
    }

    function promise (p) { return p && isFunction( p.then ); }

    function regexp (reg) { return ({}).toString.call( reg ) === '[object RegExp]'; }

    function isTrue ( obj, generalized ) {
        if ( generalized === void 0 ) generalized = true;

        if( isBoolean( obj ) || !generalized ) { return !!obj; }
        if( isString( obj ) ) {
            return [ 'true', 'yes', 'ok', '1', 'yea', 'yep', 'y', 'agree' ].indexOf( obj.toLowerCase() ) > -1;
        }
        return !!obj;
    }

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
    function ipv4 (ip) {
        if( !isString( ip ) ) { return false; }
        var pieces = ip.split( '.' );
        if( pieces.length !== 4 ) { return false; }

        for( var i$1 = 0, list = pieces; i$1 < list.length; i$1 += 1 ) {
            var i = list[i$1];

            if( !isInteger( i ) ) { return false; }
            if( i < 0 || i > 255 ) { return false; }
        }
        return true;
    }

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

    function ipv6 (ip) {
        /**
         * An IPv6 address should have at least one colon(:)
         */
        if( ip.indexOf( ':' ) < 0 ) { return false; }

        /**
         * An IPv6 address can start or end with '::', but cannot start or end with a single colon.
         */
        if( /(^:[^:])|([^:]:$)/.test( ip ) ) { return false; }

        /**
         * An IPv6 address should consist of colon(:), dot(.) and hexadecimel
         */
        if( !/^[0-9A-Fa-f:.]{2,}$/.test( ip ) ) { return false; }

        /**
         * An IPv6 address should not include any sequences bellow:
         * 1. a hexadecimal with length greater than 4
         * 2. three or more consecutive colons
         * 3. two or more consecutive dots
         */
        if( /[0-9A-Fa-f]{5,}|:{3,}|\.{2,}/.test( ip ) ) { return false; }

        /**
         * In an IPv6 address, the "::" can only appear once.
         */
        if( ip.split( '::' ).length > 2 ) { return false; }

        /**
         * if the IPv6 address is in mixed form.
         */
        if( ip.indexOf( '.' ) > -1 ) {
            var lastColon = ip.lastIndexOf( ':' );
            var hexadecimal = ip.substr( 0, lastColon );
            var decimal = ip.substr( lastColon + 1 );
            /**
             * the decimal part should be an valid IPv4 address.
             */
            if( !ipv4( decimal ) ) { return false; }

            /**
             * the length of the hexadecimal part should less than 6.
             */
            if( hexadecimal.split( ':' ).length > 6 ) { return false; }
        } else {
            /**
             * An IPv6 address that is not in mixed form can at most have 8 hexadecimal sequences.
             */
            if( ip.split( ':' ).length > 8 ) { return false; }
        }
        return true;
    }

    function encodePathname( pathname ) {
        if( !pathname ) { return pathname; }
        var splitted = pathname.split( '/' );
        var encoded = [];
        for( var i = 0, list = splitted; i < list.length; i += 1 ) {
            var item = list[i];

            encoded.push( encodeURIComponent( item ) );
        }
        return encoded.join( '/' );
    }

    function encodeSearch( search ) {
        if( !search ) { return search; }
        return '?' + search.substr( 1 ).replace( /[^&=]/g, function (m) { return encodeURIComponent( m ); } );
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
    var slashedProtocol = [ 'http:', 'https:', 'ftp:', 'gopher:', 'file:' ];

    function url (url) {
        var assign;

        if( !isString( url ) ) { return false; }
        /**
         * scheme = ALPHA * ( ALPHA / DIGIT / "+" / "-" / "." )
         */
        var splitted = url.match( /^([a-zA-Z][a-zA-Z0-9+-.]*:)([^?]*)(\?[^#]*)?(#.*)?/ );
        if( !splitted ) { return false; }
        var scheme = splitted[1];
        var hier = splitted[2];
        var search = splitted[3]; if ( search === void 0 ) search = '';
        var hash = splitted[4]; if ( hash === void 0 ) hash = '';
        var protocol = scheme.toLowerCase();
        var username = '';
        var password = '';
        var href = protocol;
        var origin = protocol;
        var port = '';
        var pathname = '/';
        var hostname = '';

        if( slashedProtocol.indexOf( protocol ) > -1 ) {
            if( /^[:/?#[]@]*$/.test( hier ) ) { return false; }
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
            var matches = hier.substr( 2 ).match( /(?:(?:(?:([^:/?#[\]@]*):([^:/?#[\]@]*))?@)|^)([^:/?#[\]@]+|\[[^/?#[\]@]+\])(?::([0-9]+))?(\/.*|\/)?$/ );
            if( !matches ) { return false; }
            (assign = matches, username = assign[1], username = username === void 0 ? '' : username, password = assign[2], password = password === void 0 ? '' : password, hostname = assign[3], hostname = hostname === void 0 ? '' : hostname, port = assign[4], port = port === void 0 ? '' : port, pathname = assign[5], pathname = pathname === void 0 ? '/' : pathname);
            if( port && port > 65535 ) { return false; }

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
                var ip = hostname.replace( /\.+$/, '' );
                if( !ipv4( ip ) ) {
                    var pieces = ip.split( '.' );
                    if( pieces.length > 4 ) { return false; }
                    /**
                     * 300 => 0.0.1.44
                     * 2 => 0.0.0.2
                     */
                    if( pieces.length === 1 ) {
                        var n = pieces[ 0 ];
                        ip = [ ( n >> 24 ) & 0xff, ( n >> 16 ) & 0xff, ( n >> 8 ) & 0xff, n & 0xff ].join( '.' );
                    } else {
                        var l = pieces.length;
                        if( l < 4 ) {
                            pieces.splice.apply( pieces, [ l - 1, 0 ].concat( ( Array( 3 - l ).join( 0 ).split( '' ) ) ) );
                        }
                        ip = pieces.join( '.' );
                    }
                    if( !ipv4( ip ) ) { return false; }
                }
                hostname = ip;
            } else if( hostname.charAt( 0 ) === '[' ) {
                if( !ipv6( hostname.substr( 1, hostname.length - 2 ) ) ) { return false; }
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
            href: href,
            protocol: protocol,
            origin: origin,
            username: username,
            password: password,
            hostname: hostname,
            host : hostname + ( port ? ':' + port : '' ),
            pathname : encodePathname( pathname ),
            search : encodeSearch( search ),
            hash: hash,
            port: port
        };
    }

    function isNode (s) { return ( typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string' ); }

    function textNode (node) { return node && node.nodeType === 3 && isNode( node ); }

    function elementNode (node) { return node && node.nodeType === 1 && isNode( node ); }

    function fragmentNode (node) { return node && node.nodeType === 11 && isNode( node ); }

    function isWindow (obj) { return obj && obj === obj.window; }

    function isClass (obj) { return isFunction( obj ) && /^\s*class\s+/.test( obj.toString() ); }

    function ip (ip) { return ipv4( ip ) || ipv6( ip ); }

    /**
     * Private IPv4 address
     *
     * 10.0.0.0 ~ 10.255.255.255
     * 172.16.0.0 ~ 172.31.255.255
     * 192.168.0.0 ~ 192.168.255.255
     */

    function privateIPv4 (ip) {
        if( !ipv4( ip ) ) { return false; }
        if( /^10\..*/.test( ip ) ) { return true; }
        if( /^192\.168\..*/.test( ip ) ) { return true; }
        if( /^172\.(1[6-9]|2[0-9]|3[0-1])\..*/.test( ip ) ) { return true; }
        return false;
    }

    function generator (fn) {
        try {
            return new Function( 'fn', 'return fn.constructor === (function*(){}).constructor' )( fn );
        } catch( e ) {
            return false;
        }
    }

    function oneDimensionalArray ( arr, strict ) {
        if( !isArray( arr ) ) { return false; }

        for( var i = 0, list = arr; i < list.length; i += 1 ) {
            var item = list[i];

            if( !item ) { continue; }
            if( strict && isPlainObject( item ) ) { return false; }
            if( isArray( item ) ) { return false; }
        }
        return true;
    }

    function isMap (obj) { return ({}).toString.call( obj ) === '[object Map]'; }

    function isSet (obj) { return ({}).toString.call( obj ) === '[object Set]'; }

    var is = {
        arguments : isArguments,
        array: isArray,
        arrowFunction: arrowFunction,
        asyncFunction: isAsyncFunction,
        boolean : isBoolean,
        date: date,
        email: email,
        empty: empty,
        error: error,
        false : isFalse,
        function : isFunction,
        integer: isInteger,
        iterable: iterable,
        number: isNumber,
        object: isObject,
        plainObject: isPlainObject,
        promise: promise,
        regexp: regexp,
        string: isString,
        true : isTrue,
        undefined : isUndefined,
        url: url,
        node: isNode,
        textNode: textNode,
        elementNode: elementNode,
        fragmentNode: fragmentNode,
        window : isWindow,
        class : isClass,
        ip: ip,
        ipv4: ipv4,
        ipv6: ipv6,
        privateIPv4: privateIPv4,
        generator: generator,
        oneDimensionalArray: oneDimensionalArray,
        map : isMap,
        set : isSet
    };

    return is;

})));
