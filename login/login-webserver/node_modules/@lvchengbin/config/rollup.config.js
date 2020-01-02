import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/config.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/config.cjs.js', format : 'cjs' },
        { file : 'dist/config.js', format : 'umd', name : 'Config' }
    ]
}, {
    input : 'src/config.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        buble( {
            transforms : {
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/config.bc.js', format : 'umd', name : 'Config' }
    ]
} ];
