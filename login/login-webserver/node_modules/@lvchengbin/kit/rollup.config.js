import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/kit.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/kit.cjs.js', format : 'cjs' },
        { file : 'dist/kit.js', format : 'umd', name : 'kit' }
    ]
}, {
    input : 'src/kit.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        buble( {
            transforms : {
                arrow : true,
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/kit.bc.js', format : 'umd', name : 'kit' }
    ]
} ];
