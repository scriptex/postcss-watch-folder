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

```
npm i postcss-watch-folder --save-dev
```

or

```
yarn add postcss-watch-folder --dev
```

## Usage

Webpack:

```webpack.config.js
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

```
folder: './assets/styles/',         // The folder to watch
main  : './assets/styles/main.css'  // The main styles entrypoint
```

Default options are:

```
folder: '.',           // Current working directory
main  : './style.css'  // style.css located in CWD
```

## License

MIT
