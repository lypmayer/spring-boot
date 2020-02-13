const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

console.log('BUILD_DIR', BUILD_DIR);
console.log('SRC_DIR', SRC_DIR);

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
	return {
		mode: 'development',
		entry: {
			index: [`${SRC_DIR}/`],
		},
		output: {
			path: BUILD_DIR,
			filename: '[name].bundle.js',
			chunkFilename: '[name].bundle.js',
			publicPath: '/',
		},
		devServer: {
			contentBase: BUILD_DIR,
			compress: false,
			hot: false,
			historyApiFallback: true,
			disableHostCheck: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				},
				{
					test: /\.html$/,
					loader: 'html-loader',
				},
				{
					test: /\.s?css$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-react'],
						},
					},
				},
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							// loader: 'url-loader'
							loader: 'file-loader',
							options: {
								name: '[path][name].[ext]',
							},
						},
					],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
					options: {
						name: './fonts/[name].[ext]',
					},
				},
			],
		},
		optimization: {
			minimize: false,
			splitChunks: {
				chunks: 'all',
				name: true,
				cacheGroups: {
					styles: {
						name: false,
						test: /\.css$/,
						chunks: 'all',
						enforce: true,
					},
				},
			},
			runtimeChunk: true, // This line is just for you to know where I added the lines above.
		},
		devtool: false,
		plugins: [
			new webpack.SourceMapDevToolPlugin({}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new webpack.HotModuleReplacementPlugin(),
			new HtmlWebpackPlugin({
				inject: true,
				template: './public/index.html',
			}),
			new ManifestPlugin({
				fileName: 'asset-manifest.json',
			}),
			new CopyWebpackPlugin([{ from: 'public/css', to: 'public/css' }, { from: 'public/images', to: 'public/images' }, { from: 'public/favicon.ico', to: 'public/favicon.ico' }], {
				copyUnmodified: false,
			}),
		],
	};
};
