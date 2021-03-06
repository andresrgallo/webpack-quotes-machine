import path from 'path';

import CopyPlugin from 'copy-webpack-plugin';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'index.bundle.js'
	},
	mode: process.env.NODE_ENV || 'development',
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	},
	devServer: {
		contentBase: path.join(__dirname, 'src')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html')
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
		}),
		new CopyPlugin([{ from: 'src/pwa' }])
	]
};
