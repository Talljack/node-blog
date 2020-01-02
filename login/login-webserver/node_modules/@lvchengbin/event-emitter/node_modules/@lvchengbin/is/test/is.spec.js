import is from '../src/is';

describe( 'is', () => {
    it( 'is.arguments', () => {
        ( function() {
            expect( is.arguments( arguments ) ).toBeTruthy();
        } )();
        expect( is.arguments( [] ) ).toBeFalsy();
    } );

    it( 'is.array', () => {
        ( function() {
            expect( is.array( arguments ) ).toBeFalsy();
        } )();
        expect( is.array( [] ) ).toBeTruthy();
    } );

    it( 'is.arrowFunction', () => {
        expect( is.arrowFunction( () => {} ) ).toBeTruthy();
        expect( is.arrowFunction( () => 1 ) ).toBeTruthy();
        expect( is.arrowFunction( () => {
            return 1;
        } ) ).toBeTruthy();
        expect( is.arrowFunction( '() => 1' ) ).toBeFalsy();
        expect( is.arrowFunction( function() {} ) ).toBeFalsy();
    } );

    it( 'is.asyncFunction', () => {
        expect( is.asyncFunction( async () => {} ) ).toBeTruthy();
        expect( is.asyncFunction( () => {} ) ).toBeFalsy();
        expect( is.asyncFunction( function() {} ) ).toBeFalsy();
    } );

    it( 'is.boolean', () => {
        expect( is.boolean( true ) ).toBeTruthy();
        expect( is.boolean( false ) ).toBeTruthy();
        expect( is.boolean( 0 ) ).toBeFalsy();
        expect( is.boolean( 1 ) ).toBeFalsy();
    } );

    it( 'is.date', () => {
        expect( is.date( new Date ) ).toBeTruthy();
        expect( is.date( +new Date ) ).toBeFalsy();
    } );

    it( 'is.email', () => {
        expect( is.email( 'a@b.cc' ) ).toBeTruthy();
        expect( is.email( 'a.x@b.cc' ) ).toBeTruthy();
        expect( is.email( 'a.x@b.c.dd' ) ).toBeTruthy();
        expect( is.email( '@b.c.dd' ) ).toBeFalsy();
        expect( is.email( 'b.c.dd' ) ).toBeFalsy();
        expect( is.email( 'b@' ) ).toBeFalsy();
        expect( is.email( 'a#x@b.c.dd' ) ).toBeFalsy();
        expect( is.email( 'a-x@b.cc' ) ).toBeFalsy();
    } );

    it( 'is.empty', () => {
        expect( is.empty() ).toBeTruthy();
        expect( is.empty( false ) ).toBeTruthy();
        expect( is.empty( '' ) ).toBeTruthy();
        expect( is.empty( null ) ).toBeTruthy();
        expect( is.empty( [] ) ).toBeTruthy();
        expect( is.empty( {} ) ).toBeTruthy();
        expect( is.empty( 0 ) ).toBeTruthy();
        expect( is.empty( parseInt( 'abc' ) ) ).toBeTruthy();
        expect( is.empty( '0' ) ).toBeFalsy();
        expect( is.empty( 1 ) ).toBeFalsy();
    } );

    it( 'is.error', () => {
        expect( is.error( new Error ) ).toBeTruthy();
        expect( is.error( new TypeError ) ).toBeTruthy();
    } );

    it( 'is.false', () => {
        expect( is.false( false ) ).toBeTruthy();
        expect( is.false( 0 ) ).toBeTruthy();
        expect( is.false( 'false' ) ).toBeTruthy();
        expect( is.false( 'nay' ) ).toBeTruthy();
        expect( is.false( 'n' ) ).toBeTruthy();
        expect( is.false( 'no' ) ).toBeTruthy();
        expect( is.false( '0' ) ).toBeTruthy();
        expect( is.false( '' ) ).toBeTruthy();
        expect( is.false( '', false ) ).toBeTruthy();
        expect( is.false( true ) ).toBeFalsy();
        expect( is.false( 'true' ) ).toBeFalsy();
        expect( is.false( 'false', false ) ).toBeFalsy();
        expect( is.false( 'no', false ) ).toBeFalsy();
        expect( is.false( '0', false ) ).toBeFalsy();
    } );

    it( 'is.function', () => {
        expect( is.function( () => {} ) ).toBeTruthy();
        expect( is.function( function() {} ) ).toBeTruthy();
        expect( is.function( async function() {} ) ).toBeTruthy();
        expect( is.function( Array.isArray ) ).toBeTruthy();
        expect( is.function( new Object ) ).toBeFalsy();
        expect( is.function( 'function' ) ).toBeFalsy();
    } );

    it( 'is.integer', () => {
        expect( is.integer( 1 ) ).toBeTruthy();
        expect( is.integer( 0 ) ).toBeTruthy();
        expect( is.integer( '1' ) ).toBeTruthy();
        expect( is.integer( '0' ) ).toBeTruthy();
        expect( is.integer( '-0' ) ).toBeTruthy();
        expect( is.integer( 2.0 ) ).toBeTruthy();
        expect( is.integer( '-1.0' ) ).toBeFalsy();
        expect( is.integer( '1.1' ) ).toBeFalsy();
        expect( is.integer( 1.1 ) ).toBeFalsy();
        expect( is.integer( 1.1 ) ).toBeFalsy();
        expect( is.integer( '1', true ) ).toBeFalsy();
        expect( is.integer( '0', true ) ).toBeFalsy();
        expect( is.integer( '-0', true ) ).toBeFalsy();
    } );

    it( 'is.iterable', () => {
        function* iterable() { yield 1; }
        expect( is.iterable( [] ) ).toBeTruthy();
        expect( is.iterable( '' ) ).toBeTruthy();
        expect( is.iterable( 'a' ) ).toBeTruthy();
        expect( is.iterable( new Map() ) ).toBeTruthy();
        expect( is.iterable( new Set() ) ).toBeTruthy();
        expect( is.iterable( iterable() ) ).toBeTruthy();
        ( function() { 
            expect( is.iterable( arguments ) ).toBeTruthy();
        } )();
    } );

    it( 'is.number', () => {
        expect( is.number( 1 ) ).toBeTruthy();
        expect( is.number( '1' ) ).toBeTruthy();
        expect( is.number( '1.0' ) ).toBeTruthy();
        expect( is.number( '1.0.0' ) ).toBeFalsy();
        expect( is.number( 'a' ) ).toBeFalsy();
        expect( is.number( '1', true ) ).toBeFalsy();
        expect( is.number( '1.0', true ) ).toBeFalsy();
    } );

    it( 'is.object', () => {
        expect( is.object( {} ) ).toBeTruthy();
        expect( is.object( new Object ) ).toBeTruthy();
        expect( is.object( new Date ) ).toBeTruthy();
        expect( is.object( Promise.resolve() ) ).toBeTruthy();
        expect( is.object( null ) ).toBeFalsy();
        expect( is.object( function() {} ) ).toBeFalsy();
    } );

    it( 'is.promise', () => {
        expect( is.promise( new Promise( () => {} ) ) ).toBeTruthy();
        expect( is.promise( Promise.resolve() ) ).toBeTruthy();
        expect( is.promise( Promise.reject() ) ).toBeTruthy();
    } );

    it( 'is.regexp', () => {
        expect( is.regexp( /ii/ ) ).toBeTruthy();
        expect( is.regexp( new RegExp( '' ) ) ).toBeTruthy();
        expect( is.regexp( '/i/' ) ).toBeFalsy();
    } );

    it( 'is.string', () => {
        expect( is.string( '' ) ).toBeTruthy();
        expect( is.string( '0' ) ).toBeTruthy();
        expect( is.string( String( 0 ) ) ).toBeTruthy();
        expect( is.string( new String( 'abc' ) ) ).toBeTruthy();
        expect( is.string( null ) ).toBeFalsy();
        expect( is.string( 0 ) ).toBeFalsy();
        expect( is.string( true ) ).toBeFalsy();
    } );

    it( 'is.true', () => {
        expect( is.true( true ) ).toBeTruthy();
        expect( is.true( 1 ) ).toBeTruthy();
        expect( is.true( 'true' ) ).toBeTruthy();
        expect( is.true( 'yes' ) ).toBeTruthy();
        expect( is.true( 'ok' ) ).toBeTruthy();
        expect( is.true( '1' ) ).toBeTruthy();
        expect( is.true( 'false', false ) ).toBeTruthy();
        expect( is.true( 'no', false ) ).toBeTruthy();
        expect( is.true( '0', false ) ).toBeTruthy();
        expect( is.true( false ) ).toBeFalsy();
        expect( is.true( 0 ) ).toBeFalsy();
        expect( is.true( 'false' ) ).toBeFalsy();
        expect( is.true( 'no' ) ).toBeFalsy();
        expect( is.true( '0' ) ).toBeFalsy();
    } );

    it( 'is.undefined', () => {
        expect( is.undefined() ).toBeFalsy();
        expect( is.undefined( undefined ) ).toBeTruthy();
    } );

    it( 'is.url', () => {
        expect( is.url( 'http://a.b' ) ).toBeTruthy();
        expect( is.url( 'https://a.b' ) ).toBeTruthy();
        expect( is.url( 'ftp://a.b' ) ).toBeTruthy();
        expect( is.url( 'https://a.b?x=1&y=2#xx' ) ).toBeTruthy();
        expect( is.url( 'http://localhost' ) ).toBeTruthy();
        expect( is.url( 'http://u:p@x.x:1000' ) ).toBeTruthy();
        expect( is.url( 'httpc://a.b?x=1&y=2#xx' ) ).toBeFalsy();
        expect( is.url( '://a.b?x=1&y=2#xx' ) ).toBeFalsy();
        expect( is.url( 'www.xx.com' ) ).toBeFalsy();
        expect( is.url( 'http://333.333.333.333' ) ).toBeFalsy();
        expect( is.url( 'http://www.xx.com:23543535' ) ).toBeFalsy();
    } );
} );
