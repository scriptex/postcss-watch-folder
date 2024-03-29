const chokidar = require('chokidar');
const { appendFile, readFile, writeFileSync, existsSync } = require('fs');

const PRINT = '/*CHANGE*/';
const PRINT_REG = /\n?\/\*CHANGE\*\//gm;

module.exports = (options = {}) => {
	const opts = {
		main: './style.css',
		folder: '.',
		...options
	};

	if (!existsSync(opts.folder)) {
		throw new TypeError(`postcss-watch-folder: The specified folder (${opts.folder}) could not be located.`);
	}

	if (!existsSync(opts.main)) {
		throw new TypeError(`postcss-watch-folder: The specified main file (${opts.main}) could not be located.`);
	}

	const watcher = chokidar.watch(opts.folder);

	return {
		postcssPlugin: 'postcss-watch-folder',
		Once() {
			watcher.on('add', () => {
				appendFile(opts.main, PRINT, () => {
					readFile(opts.main, 'utf8', (err, data) => {
						writeFileSync(opts.main, data.replace(PRINT_REG, ''));
					});
				});
			});
		}
	};
};

module.exports.postcss = true;
