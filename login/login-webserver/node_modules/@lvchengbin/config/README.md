# Config

A simple library for creating and managing config object.

## Start

To install the package with `npm`.

```js
$ npm i @lvchengbin/config --save
```

To use the package in nodejs:

```js
const Config = require( '@lvchengbin/config' );
```

Or using the package as an ES6 module:

```js
import Config from '@lvchengbin/config';
```

## Usage

To create a config object by default config value;

```js
import Config from '@lvchengbin/config';

const config = new Config( {
    baseUrl : 'js/lib',
    paths : {
        app : '../app'
    }
} );

config.set( 'baseUrl', 'js/base' ); // set new value for baseUrl
config.set( 'paths.app', '../../app' ); // set new value for paths.app

// replace the whole config object
config.set( {
    baseUrl : 'js',
    paths : {
        lib : '../lib'
    }
} );

config.get(); // to get the whole config object

config.get( 'baseUrl' ); // get the value of baseUrl

config.get( 'paths.app' ); // get the value of paths.app
```
