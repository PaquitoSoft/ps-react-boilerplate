var babelJestTransformer = require('babel-jest');
var packageInfo = require('./package.json');

var transformer = babelJestTransformer.createTransformer();

module.exports = {
	process: function(src, filename) {
		if (/\.(png|scss)$/.test(filename)) {
			return '';
		} else {
			return transformer.process(src, filename);
		}
	}
};