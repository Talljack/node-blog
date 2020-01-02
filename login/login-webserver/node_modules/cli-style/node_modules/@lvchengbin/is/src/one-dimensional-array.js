import isArray from './array';
import isPlainObject from './plain-object';

export default ( arr, strict ) => {
    if( !isArray( arr ) ) return false;

    for( const item of arr ) {
        if( !item ) continue;
        if( strict && isPlainObject( item ) ) return false;
        if( isArray( item ) ) return false;
    }
    return true;
};
