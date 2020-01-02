const readline = require( 'readline' );
const strip = require( 'strip-ansi' );
const style = require( 'cli-style' );
const is = require( '@lvchengbin/is' );
const escape = require( '@lvchengbin/escape' );
const isKey = require( './lib/is-key' );
const man = require( './lib/man' );

const EXEC = Symbol( 'exec' );
const MAN = Symbol( 'man' );
const COMPLETER = Symbol( 'completer' );

const helpCommands = [ 'help', 'man', '?' ];
const exitCommands = [ 'exit', 'quit' ];


function isMan( cmd ) {
    cmd = cmd.trim();
    if( !cmd ) return false;
    for( const item of helpCommands ) {
        if( item.toLowerCase() === cmd.toLowerCase() ) return true;
        const reg = new RegExp( `${escape.regexp(item)}[ \\t]+(.*)` );
        const matches = cmd.match( reg );
        if( matches ) return matches[ 1 ];
    }
    return false;
}

function isExit( cmd ) {
    for( const item of exitCommands ) {
        if( item.toLowerCase() === cmd.toLowerCase() ) return true;
    }
    return false;
}

const styles = {
    warn : {
        color : 'orange'
    },
    prompt : {
        color : 'green'
    }
};

class Interactive extends require( 'events' ) {
    constructor( options = {} ) {
        super();
        const { stdin, stdout } = process;

        this.active = false;
        this.options = options;
        this.exit = false;
        this.title = options.title;

        if( !this.options.instructions ) {
            this.options.instructions = {};
        }

        this.style = Object.assign( {}, styles, options.styles || {} );

        const opts = {
            input : stdin, 
            output : stdout,
            removeHistoryDuplicates : true,
            prompt : options.prompt || '>',
            terminal : true
        };

        if( options.completer ) {
            opts.completer = options.completer.bind( this );
        }

        if( options.help ) {
            this.help = options.help;
        }

        if( options.completions || this.help || this.exit ) {
            this.completions = options.completions || [];
            if( this.help ) {
                this.completions.push( ...helpCommands );
            }
            if( this.options.exit ) {
                this.completions.push( ...exitCommands );
            }
        }

        if( this.completions && !options.completer ) {
            opts.completer = this[ COMPLETER ] .bind( this );
        }

        const onsigint = () => {
            if( this.exit ) return this.close();
            this.exit = true;
            console.log( style( `(^C again to quit ${this.title || 'interactive mode'})`, this.style.warn ) );
        };

        this.rl = readline.createInterface( opts );

        this.rl.on( 'line', cmd => {
            if( !this.active ) return;
            this[ EXEC ]( cmd.trim() );
        } );

        this.on( 'start', () => {
            this.rl.on( 'SIGINT', onsigint );
        } );

        this.on( 'pause', () => {
            this.rl.removeListener( 'SIGINT', onsigint );
        } );

        stdin.setEncoding( this.options.encoding || 'utf8' );

        /**
         * The process.setRawMode function can only be used inside a TTY context, and it can be checked with process.stdout.isTTY.
         * But if starting this nodejs process with some process management toolkits, such as nodemon, a child process will be used, and the process.stdout.isTTY will return a true value, but the process.stdin.setRawMode is undefined.
         *
         * to start nodemon with --no-stdin or -I
         */
        //is.function( stdin.setRawMode ) && stdin.setRawMode( true );

        stdin.on( 'keypress', ( chunk, key ) => {

            this.emit( 'keypress', chunk, key );

            if( options.oo ) {
                if( isKey( key, options.oo ) ) return this.toggle();
            }

            if( !this.active ) return;

            if( options.keys ) {
                for( const command of Object.keys( options.keys ) ) {
                    if( isKey( key, options.keys[ command ] ) ) {
                        return this[ EXEC ]( command );
                    }
                }
            }
        } );

        readline.emitKeypressEvents( process.stdin, this.rl );
    }

    [ COMPLETER ]( line ) {
        const hits = this.completions.filter( c => {
            if( !c.indexOf( line ) ) return c;
        } );
        return [ hits && hits.length ? hits : [], line ]
    }

    start() {
        if( this.active ) return this;
        this.active = true;
        this.prompt( this.options.prompt );
        this.emit( 'start' );
        return this;
    }

    pause() {
        if( !this.active ) return this;
        this.active = false;
        this.emit( 'pause' );
        return this;
    }

    toggle() {
        if( this.active ) {
            return this.pause();
        }
        return this.start();
    }

    close() {
        this.emit( 'close' );
        return this.rl.close();
    }

    [ EXEC ]( cmd ) {
        cmd = cmd.trim();

        if( this.options.exit && isExit( cmd ) ) {
            return this.close();
        }

        const instructions = this.options.instructions;
        if( !this.active ) {
            if( !cmd ) return;
            if( cmd === instructions.start ) {
                this.start();
                return;
            }
        }

        if( this.active ) {
            if( !cmd ) return this.prompt();
            if( cmd === instructions.pause ) {
                this.pause();
                return;
            }

            if( this.help ) {
                const man = isMan( cmd );
                if( man === true ) return this[ MAN ]();
                if( is.string( man ) ) return this[ MAN ]( man );
            }

        }

        this.emit( 'command', cmd );
    }

    [ MAN ]( item ) {
        if( !this.help ) {
            man( 'No help information!' );
            return this.prompt();
        }
        item = strip( item );
        if( !item ) {
            man( this.help );
            return this.prompt();
        }
        if( this.help[ item ] ) {
            man( this.help[ item ] );
            return this.prompt();
        }
        man( `Cannot find help information of "${item}"` );
        return this.prompt();
    }

    prompt( tag ) {
        if( !is.undefined( tag ) ) this.tag = tag;
        this.rl.setPrompt( this.tag || '>' );
        this.rl.prompt();
    }
}

module.exports = Interactive;
