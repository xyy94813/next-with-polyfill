# next-with-polyfill

Import polyfills in your Next.js project

[![Test And Build](https://github.com/xyy94813/next-with-polyfill/workflows/Test%20And%20Build/badge.svg?branch=master)](https://github.com/xyy94813/next-with-polyfill/actions?query=workflow%3A%22Test+And+Build%22)
[![Codecov](https://img.shields.io/codecov/c/github/xyy94813/next-with-polyfill/master.svg?style=flat-square)](https://codecov.io/gh/xyy94813/next-with-polyfill/branch/master)
[![Dependencies](https://img.shields.io/david/xyy94813/next-with-polyfill.svg)](https://david-dm.org/xyy94813/next-with-polyfill)
[![DevDependencies](https://img.shields.io/david/dev/xyy94813/next-with-polyfill.svg)](https://david-dm.org/xyy94813/next-with-polyfill?type=dev)

[![npm package](https://img.shields.io/npm/v/next-with-polyfill.svg?style=flat-square)](https://www.npmjs.org/package/next-with-polyfill)
[![npm downloads](https://img.shields.io/npm/dm/next-with-polyfill.svg?style=flat-square)](http://npmjs.com/next-with-polyfill)

## Usage

### Install

Use npm:

```
npm i next-with-polyfill -S
```

Or use yarn:

```
yarn add next-with-polyfill
```

### Config

#### Normal Config

in `next.config.js`

```js
const withPlugins = require('next-compose-plugins');
const withPolyfill = require('next-with-polyfill');

module.exports = withPlugins([
  withPolyfill([
    './node_modules/core-js/stable',
    './node_modules/regenerator-runtime/runtime',
  ]),
]);
```

#### Change the Polyfill ChunkName

```js
const withPlugins = require('next-compose-plugins');
const withPolyfill = require('next-with-polyfill');
const {
  CLIENT_STATIC_FILES_RUNTIME_POLYFILLS,
} = require('next/dist/next-server/lib/constants.js');

module.exports = withPlugins([
  withPolyfill(
    [
      './node_modules/core-js/stable',
      './node_modules/regenerator-runtime/runtime',
    ],
    CLIENT_STATIC_FILES_RUNTIME_POLYFILLS, 
  ),
]);
```

## Contribution

DefinitelyTyped only works because of contributions by users like you!

### Git Message

[Follow the Angular git commit message specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

But, you can ignore the `scope`
