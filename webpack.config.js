const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		app: './app.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		]
	},
	plugins: [new HtmlWebpackPlugin({
		title: 'Dancefloor',
		template: './index.ejs'
	})],
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8080
	}
};
