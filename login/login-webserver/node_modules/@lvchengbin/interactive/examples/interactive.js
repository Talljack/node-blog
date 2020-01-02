const style = require( 'cli-style' );
const Interactive = require( '..' );

const styles = {
    tag : {
        color : 'orange'
    }
};

const interactive = new Interactive( {
    title : 'Interactive Mode',
    prompt : 'IM> ',
    instructions : {
        start : 'Start Interactive Mode',
        pause : 'Pause Interactive Mode'
    },
    oo : 'CTRL+Y',
    keys : {
        'show .' : '\b'
    },
    completions : [ 'show', 'hide' ],
    exit : true,
    help : {
        show : 'Help information for "show" command.',
        hide : 'Help information for "hide" command.'
    }
} );

interactive.on( 'start', () => {
    console.log( style( 'start', styles.tag ) );
    interactive.prompt();
} );

interactive.on( 'pause', () => {
    console.log( style( 'pause', styles.tag ) );
} );

interactive.on( 'command', command => {
    console.log( style( 'command: ', styles.tag ), command );
    if( command === 'change prompt' ) {
        interactive.prompt( 'New Prompt> ' );
    } else {
        interactive.prompt();
    }
} );

interactive.start();

//interactive.on( 'keypress', ( chunk, key ) => {
    //console.log( style( 'keypress: ', styles.tag ), key );
    //interactive.prompt();
//} );
