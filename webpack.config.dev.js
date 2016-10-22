/*eslint-disable*/
var path = require('path');
var packageInfo = require('./package.json');
var webpack = require('webpack');

// NodeJS 0.10.X does not implement promises
require('es6-promise').polyfill();


// Based on https://github.com/facebookincubator/create-react-app/blob/master/config/webpack.config.dev.js
module.exports = {
	entry: {
		'app-bundle': ['./src/main.js'],
		'vendor': [
			'react', 
			'react-dom',
			'lscache',
			'object-assign',
			'page',
			'react-redux',
			'redux',
			'redux-thunk',
			'whatwg-fetch'
		]
	},

	output: {
		path: path.resolve('./dist/js'),
		filename: '[name].js',
		publicPath: '/js/'
	},

	devtool: 'source-map',

	module: {
		preLoaders: [{
			loader: 'eslint',
			test: /\.jsx?$/,
			include: './src/**/*'
		}],

		loaders: [
			{
				loader: 'babel',
				test: /\.jsx?$/,
				exclude: /(node_modules)/
			},

			{
				loaders: ['style', 'css', 'sass'],
				test: /\.s?css$/
			},

			// "file" loader makes sure those assets get served by WebpackDevServer.
			// When you `import` an asset, you get its (virtual) filename.
			// In production, they would get copied to the `build` folder.
			// {
			//     test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
			//     exclude: /\/favicon.ico$/,
			//     loader: 'file',
			//     query: {
			//         name: 'static/media/[name].[hash:8].[ext]'
			//     }
			// },

			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 25000,
					name: 'static/media/[name].[hash:8].[ext]'
				}
			},

			// "postcss" loader applies autoprefixer to our CSS.
			// "css" loader resolves paths in CSS and adds assets as dependencies.
			// "style" loader turns CSS into JS modules that inject <style> tags.
			// In production, we use a plugin to extract that CSS to a file, but
			// in development "style" loader enables hot editing of CSS.
			// {
			//     test: /\.css$/,
			//     loader: 'style!css!postcss'
			// },

			// JSON is not enabled by default in Webpack but both Node and Browserify
			// allow it implicitly so we also enable it.
			{
				test: /\.json$/,
				loader: 'json'
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development')
			}
		}),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
			'es6-promise': 'es6-promise'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	],

	devServer: {
		historyApiFallback: true
	}
};
