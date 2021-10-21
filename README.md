[![GitHub release](https://img.shields.io/github/release/scriptex/postcss-watch-folder.svg)](https://github.com/scriptex/postcss-watch-folder/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/postcss-watch-folder.svg)](https://github.com/scriptex/postcss-watch-folder/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/postcss-watch-folder.svg)](https://github.com/scriptex/postcss-watch-folder/commits/master)
[![Github file size](https://img.shields.io/github/size/scriptex/postcss-watch-folder/index.js.svg)](https://github.com/scriptex/postcss-watch-folder)
[![npm](https://img.shields.io/npm/dt/postcss-watch-folder.svg)](https://www.npmjs.com/package/postcss-watch-folder)
[![npm](https://img.shields.io/npm/v/postcss-watch-folder.svg)](https://www.npmjs.com/package/postcss-watch-folder)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/postcss-watch-folder/README.md)](https://github.com/scriptex/postcss-watch-folder/)

# postcss-watch-folder

A [PostCSS](https://github.com/postcss/postcss) plugin to watch a folder for new files.

## Why?

I've had issues when using globs to import stylesheets: `@import 'settings/**/*.scss';`.

The issues appear when using sass-loader and/or postcss-loader in webpack.

Basically, both SASS and PostCSS do not handle the event of adding files to a watched folder.

This simple plugin solves this issue by watching for `add` event and updating the main entrypoint.

## Dependencies

1. NodeJS
2. NPM or Yarn
3. PostCSS
4. Bash Terminal (Default on OSX/Linux, GitBash on Windows)

## Install

```sh
npm i postcss postcss-watch-folder --save-dev
```

or

```sh
yarn add postcss postcss-watch-folder --dev
```

## Usage

Webpack:

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-watch-folder')({
                  folder: './your/stylesheets/folder',
                  main: './your/stylesheets/folder/main.css'
                }),
                ...other postcss plugins
              ],
            }
          }
        ]
      }
    ]
  }
}
```

The location of this plugin does not matter. It can be placed as first or last in the `plugins` array.

## Options

There are two configuration options. They are both required and the plugin will not work if they are not provided:

```javascript
folder: './assets/styles/',         // The folder to watch
main  : './assets/styles/main.css'  // The main styles entrypoint
```

Default options are:

```javascript
folder: '.',           // Current working directory
main  : './style.css'  // style.css located in CWD
```

## Demo

You can see a demo of the usage in [my webpack boilerplate](https://github.com/scriptex/webpack-mpa/blob/master/webpack.config.js#L147)

## Support this project

[![Tweet](https://img.shields.io/badge/Tweet-Share_this_repository-blue.svg?style=flat-square&logo=twitter&color=38A1F3)](https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20software%20project%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex%2Fpostcss-watch-folder&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome)
[![Donate](https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?style=flat-square&logo=paypal&color=222d65)](https://www.paypal.me/scriptex)
[![Become a Patron](https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?style=flat-square&logo=patreon&color=e64413)](https://www.patreon.com/atanas)

## License

MIT
