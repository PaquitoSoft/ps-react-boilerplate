/*eslint-disable*/
var packageInfo = require('./package.json');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

config.plugins = [
	new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
        }
    }),
	new webpack.ProvidePlugin({
		'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		'es6-promise': 'es6-promise'
	}),
	new webpack.optimize.UglifyJsPlugin()
];

module.exports = config;
