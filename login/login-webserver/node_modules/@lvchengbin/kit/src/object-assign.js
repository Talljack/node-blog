import isFunction from '@lvchengbin/is/src/function';

const assign = ( dest, ...sources ) => {
    if( isFunction( Object.assign ) ) {
        return Object.assign( dest, ...sources );
    }
    const obj = sources[ 0 ];
    for( let property in obj ) {
        if( obj.hasOwnProperty( property ) ) {
            dest[ property ] = obj[ property ];
        }
    }
    if( sources.length > 1 ) {
        return assign( dest, ...sources.splice( 1, sources.length - 1 ) );
    }
    return dest;
};

export default assign;
