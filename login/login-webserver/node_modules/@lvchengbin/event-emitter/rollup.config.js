import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default [ {
    input : 'src/eventemitter.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/eventemitter.cjs.js', format : 'cjs' },
        { file : 'dist/eventemitter.js', format : 'umd', name : 'EventEmitter' }
    ]
}, {
    input : 'src/eventemitter.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        babel()
    ],
    output : [
        { file : 'dist/eventemitter.bc.js', format : 'umd', name : 'EventEmitter' }
    ]
} ];
