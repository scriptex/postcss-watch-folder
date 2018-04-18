# postcss-watch-folder

A [PostCSS](https://github.com/postcss/postcss) plugin to watch a folder for new files.

## Why?

I've had issues when using globs to import stylesheets: `@import 'settings/**/*.scss';`.
It appears that both SASS and PostCSS do not handle the event of adding files to a watched folder.

This simple plugin solves this issue by watching for `add` event and updating the main entrypoint.

## Install

```
npm i postcss-watch-folder --save-dev
```

or

```
yarn add postcss-watch-folder --dev
```

## Usage

Standard:

```
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const postcss = require('postcss');
const folderWatcher = require('postcss-watch-folder');
const opts = {
  folder: './your/stylesheets/folder',
  main: './your/stylesheets/folder/main.css'
}

postcss([folderWatcher(opts)])
  .process(css, {
    from: './your/stylesheets/folder/main.css',
    to: './your/dist/folder/app.css'
  })
  .then(result => {
    writeFileSync('./your/dist/folder/app.css', result.css);
  });
```

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

## Options

There are two configuration options. They are both required and the plugin will not work if they are not provided:

```
folder: './assets/styles/',         // The folder to watch
main  : './assets/styles/main.css'  // The main styles entrypoint
```

## License

MIT
