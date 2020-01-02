# EventEmitter

An implementation of EventEmitter for browsers.

## Installation

```js
$ npm i @lvchengbin/eventemitter --save
```

If you want to invoke the code to browers with `<script>` tag, please use [eventemitter.js](https://github.com/LvChengbin/eventemitter/raw/master/dist/eventemitter.js). For old browsers not support ES5 syntax, please use [eventemitter.bc.js](https://raw.githubusercontent.com/LvChengbin/eventemitter/master/dist/eventemitter.bc.js).

## Usage

````js
import EventEmitter from '@lvchengbin/eventemitter';

const em = new EventEmitter();

const handler = () => {
    // some code...
};

em.$on( 'event', handler );
em.$emit( 'event', ...args );
em.$removeListener( 'event', handler );
```

## Methods

 - $on( evt, handler )

    Start to listen to an event type.


 - $once( evt, handler )

    Start to listen to an event type only once, then the listener will be removed.

 - $removeListener( evt, handler )

    Remove lister of an event type to stop listening it.

 - $emit( evt, ...args )
    
    To trigger an event

 - $removeAllListeners( rule )

    To remove listeners with a rule:
    
    - if the rule is a string, to remove all events with event type same as the rule
    - if the rule is a regexp, to remove all events match the regexp
    - if the rule is a function, to execute the function with passing an argument which is each event type, if the function returns true, all listeners of that event type will be removed.

    ```js
    em.$removeAllListeners( type => {
        if( /^ss/i.test( type ) ) {
            return true;
        }
    } );
    em.$removeAllListeners( 'click' );
    em.$removeAllListeners( /click/i );
    ```
 - $alias( alias, existsMethod )

    To set alias for a existing method, for example.


```js
import EventEmitter from '@lvchengbin/eventemitter';

class A extends EventEmitter {
    constructor() {
        super();
        this.$alias( 'on', '$on' );
        this.$alias( 'once', '$once' );
        this.$alias( 'emit', '$emit' );
        this.$alias( 'removeListener', '$removeListener' );
        this.$alias( 'removeAllListeners', '$removeAllListeners' );

        this.on( 'xxx', () => {
            // some code...
        } );
    }
}
```
