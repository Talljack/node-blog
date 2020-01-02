import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default [ {
    input : 'src/is.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/is.cjs.js', format : 'cjs' },
        { file : 'dist/is.js', format : 'umd', name : 'IS' }
    ]
}, {
    input : 'src/is.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        babel()
    ],
    output : [
        { file : 'dist/is.bc.js', format : 'umd', name : 'IS' }
    ]
} ];
