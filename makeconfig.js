var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var StaticSitePlugin = require('react-static-webpack-plugin');

module.exports = function(options){
	var entry, jsLoaders, plugins, cssLoaders;

	//If production flag is set to true
	if (options.prod) {
		entry = [
			path.resolve(__dirname, 'src/index.js')
		];

		// cssLoaders = ExtractTextPlugin.extract('style-loader', 'css-loader'); //!postcss-loader

		//Plugins
		plugins = [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				screw_ie8: true,
				compress: {
					warnings: false
				}
			}),
			// new HtmlWebpackPlugin({
			// 	template: 'index.html',
			// 	minify: {
			// 			removeComments: true,
	    //     	collapseWhitespace: true,
	    //     	removeRedundantAttributes: true,
	    //     	useShortDoctype: true,
	    //     	removeEmptyAttributes: true,
	    //     	removeStyleLinkTypeAttributes: true,
	    //     	keepClosingSlash: true,
	    //     	minifyJS: true,
	    //     	minifyCSS: true,
	    //     	minifyURLs: true
			// 	},
			// 	inject: true
			// }),
			// new ExtractTextPlugin('src/css/blogolio.css'),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
      // new StaticSitePlugin({
      //   src: 'app',
      //   stylesheet: '/src/css/blogolio.css',
      //   favicon: '/favicon.ico',
      //   template: path.join(__dirname, 'index.html.js')
      // })
		];

		//if option is false then change to development settings
		} else {
			entry = [
				'webpack-dev-server/client?http://localhost:3000', //Need for hot reloading
				'webpack/hot/only-dev-server',
				path.resolve(__dirname, 'src/index.js')
			];
			cssLoaders = 'style-loader!css-loader';

			plugins = [
				new webpack.HotModuleReplacementPlugin(), //for hot reloading
				// new HtmlWebpackPlugin({
				// 	template: 'index.html',
				// 	inject: true
				// }),
				// new webpack.ProvidePlugin({
				// 	$: 'jquery',
				// 	jQuery: 'jquery'
				// })
			]
		}

		plugins.push(new AppCachePlugin({
			exclude: ['.htaccess']
		}));

		// switch (process.env.npm_lifecycle_event) {
		// 	case 'build':
		//
		// 	case 'stats':
		// 		config = merge(
		//
		// 		);
		// 		break;
		// 	default:
		//
		// }

		return {
			entry: {app: entry},
			output: {
				path: path.join(__dirname, 'build'),
				publicPath: '/', //set publicPath: '/Blogolio/' for production else publicPath: '/'
				filename: 'static/bundle.js',
				libraryTarget: 'umd'
			},
			module: {
					// noParse: [/autoit.js/],
		    	rules: [
					// { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
					{
			    		test: /\.(es6|js|jsx)$/, // Transform all .js files required somewhere within an entry point...
			        loader: 'babel-loader', // ...with the specified loaders...
							query: {compact: false},
			        exclude: /node_modules/ // ...except for the node_modules folder.
			    },
			    {
			    		test:   /\.css$/, // Transform all .css files required somewhere within an entry point...
			        loader: cssLoaders // ...with PostCSS (if used)
			    },
					{ 	test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
							loader: 'url?limit=10000&mimetype=application/octet-stream'
					},
					{
							test: /\.(jpg|jpeg|gif|png)$/,
    					loader:'url-loader?limit=10000',
							exclude: /node_modules/
					},
					{
							test: /\.(eot|woff|woff2|svg)(\?\S*)?$/,
      				loader: 'file-loader?limit=10000&mimetype=image&name=[path][name].[ext]'
							//don't exclude node_modules since file loader takes .eot files from bootstrap in node_modules
    			}
				]
		  },
		  plugins: plugins,
			target: 'web', // Make web variables accessible to webpack, e.g. window
			stats: false, // Don't show stats in the console
			// progress: true
			// quiet: true
		}
}
