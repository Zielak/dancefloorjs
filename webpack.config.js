const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Visualizer = require("webpack-visualizer-plugin")
const webpack = require("webpack")

module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: {
		app: "./app.js",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				// TODO: depending on environment disable 'exclude' and 'use' (test/dev)
				test: /\.js$/,
				exclude: /(node_modules)/,
				// use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Dancefloor",
			template: "./index.ejs",
		}),
		new webpack.ProvidePlugin({
			// TODO: probably disable it for production, and use their dist?
			b3: path.resolve(__dirname, "./node_modules/behavior3js/src/index"),
		}),
		new Visualizer(),
	],
	devtool: "source-map",
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 8080,
	},
}

// "plugins": [
//   [
//     "nope-provide-modules", {
//       "../test/_dom": ["window", "document"]
//     }
//   ]
// ]
