const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = {
  entry: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'static/bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    // noParse: [/autoit.js/],
    rules: [
      // {
      //   test: /\.js$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(es6|js|jsx)$/, // Transform all .js files required somewhere within an entry point...
        loader: 'babel-loader', // ...with the specified loaders...
        exclude: /node_modules/ // ...except for the node_modules folder.
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader:'url-loader',
        options: {
          limit: 10000,
        },
        exclude: /node_modules/
      },
      {
        test: /\.(eot|woff|woff2|svg)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          mimetype: 'image',
          name: '[path][name].[ext]',
        },
        //don't exclude node_modules since file loader takes .eot files from bootstrap in node_modules
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
  ],
  stats: false, // Don't show stats in the console
};

const productionConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            },
          },
        }),
      },
    ],
  },
  plugins: [
		new AppCachePlugin({
			exclude: ['.htaccess']
		}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'src/css/styles.css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

const developmentConfig = {
  devServer: {
    historyApiFallback: true,
    hotOnly: true,
    stats: 'errors-only',
    overlay: true,
		port: process.env.PORT || 3000,
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Transform all .css files required somewhere within an entry point...
        use: [
					'style-loader',
				  {
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // For hot reloading
  ]
};

module.exports = (env) => (
  merge(
    commonConfig,
    env === 'production' ? productionConfig : developmentConfig
  )
);
