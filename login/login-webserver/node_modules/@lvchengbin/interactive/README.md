# Interactive

A simple utility for building togglable interactive cli tool easily in node.js.

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [Usage](#usage)
    * [Command Completion](#command-completion)
    * [Toggle Interactive Mode](#toggle-interactive-mode)
    * [Shortcut Keys](#shortcut-keys)
* [API](#api)
    * [new Interactive( options )](#new-interactive-options-)
    * [start()](#start)
    * [pause()](#pause)
    * [toggle()](#toggle)
    * [close()](#close)
    * [prompt( tag )](#prompt-tag-)
* [Events](#events)
    * [Event:start](#eventstart)
    * [Event:pause](#eventpause)
    * [Event:close](#eventclose)
    * [Event:command](#eventcommand)
    * [Event:keypress](#eventkeypress)

<!-- vim-markdown-toc -->

## Installation

```bash
$ npm i @lvchengbin/interactive --save
```
## Usage

An example is always a better way for starting:

```js
const Interactive = require( '@lvchengbin/interactive' );

const interactive = new Interactive( {
    title : 'Interactive Mode',
    prompt : '~~> ',
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

interactive.on( 'command', command => {
    console.log( 'command: ', command );
    if( command === 'change prompt' ) {
        interactive.prompt( 'New Prompt> ' );
    } else {
        interactive.prompt();
    }
} );

interactive.start();
```

### Command Completion

You can provide a `completion` list in options, and this list will be used in `completor` function:

```js
const Interactive = require( '@lvchengbin/interactive' );

const interactive = new Interactive( {
    title : 'Interactive Mode',
    prompt : '~~> ',
    completions : [ 'command1', 'command2' ],
} );

interactive.start();
```

### Toggle Interactive Mode

The interactive mode can be started and paused by calling `interactive.start()` and `interactive.pause()`, and even you can use `interactive.close()` to close it throughly.

There are another two ways for switching between active(started) and inactive(paused) mode:
 - instructions.start and instructions.pause
 - on-off option

For example: 

```js
const Interactive = require( '@lvchengbin/interactive' );

const interactive = new Interactive( {
    instructions : {
        start : 'Start Interactive Mode',
        pause : 'Pause Interactive Mode'
    },
    oo : 'CTRL+Y'
} );

interactive.start();
```

In the code above, `instructions.start` is set to `Start Interactive Mode` and `instructions.pause` is set to `Pause Interactive Mode`. That means you can start or pause the interactive mode by typing these two commands. The `oo` option specified a shortcutkey for toggle the interactive mode.

### Shortcut Keys

You can specify some shortcut keys for particular commands, for example:

```js
const Interactive = require( '@lvchengbin/interactive' );

const interactive = new Interactive( {
    keys : {
        'command arg1 arg2' : [ 'CTRL+Y', '\u000c' ]
    }
} );

interactive.on( 'command', () => { } );

interactive.start();
```

With the code above, while the input equal to `CTRL`+`Y` or equal to `\u000c`, the command event will be emitted with command `command arg1 arg2`.


## API

### new Interactive( options )

To create a new instance, and it will start to listen to the input.

**options**

 - title `String`
    The title of the application.

 - prompt `String`
    The default prompt string.

 - instructions `Object`
    To specify special instructions:
    * start: start the interactive mode
    * pause: pause the interactive mode

 - oo `String` `Array`
    A shortcut key used to toggle interactive mode.

 - keys `Object`
    A map for defining shortcut keys for particular comamnds that the key should be the command, and the value should be a `String` or an `Array` of keys.

 - completions `Array`
    A command list which will be used for completion. The `help`, `man` and `?` commands will be append into the completion list if the `help` option is set. The `exit` and `quit` commands will be append into the completion list if the `exit` option is set to `true`.

 - completor `Function`
    To speciy your own completor.

 - exit `Boolean`
    By setting this options to true, the interactive mode will be exited with command `exit` and `quit`.

 - help `String` `Object`
    The help information which will be shown with `help` command. If this option is an object, the `help <key>` command will show the information of corresponding value of the `key`.

### start()

 To start the interactive mode.

### pause()

 To pause the interactive mode.

### toggle()

 To toggle the interactive mode.

### close()

 To close the interactive mode throughly, this method will close the `readline.Interface`.

### prompt( tag )

 To set and show the prompt.

## Events

### Event:start

 The `'start'` event is emitted when the interactive mode start.

### Event:pause

 The `'pause'` event is emitted when the interactive mode pause.

### Event:close

 The `'close'` event is emitted when the interactive mode close

### Event:command

 The `'command'` event is emitted while getting new command.

### Event:keypress

 The `'keypress'` event is emitted while any keys are pressed. The callback function will accept two arguments, the `chunk` and the `key` object.

