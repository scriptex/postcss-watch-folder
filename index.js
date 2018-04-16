var fs = require('fs');
var postcss = require('postcss');
var chokidar = require('chokidar');

// use fs-extra (promisified fs)

module.exports = postcss.plugin('postcss-watch-folder', function(opts) {
	opts = opts || {};

	if (!opts.folder) {
		return;
	}

	// Check of folder exists

	var watcher = chokidar.watch(opts.folder, {
		persistent: true
	});

	return function(root, result) {
		return new Promise(function(resolve, reject) {
			watcher.on('add', function(filepath) {
				fs.readFile(filepath, 'utf8', function(err, data) {
					if (err) {
						reject(err);
					}

					root.prepend(data);
					resolve();
				});
			});
		});
	};
});
