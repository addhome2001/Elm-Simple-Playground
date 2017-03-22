const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = () =>
  ({
    entry: {
      bundle: path.resolve(__dirname, '../src'),
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          unused: true,
          dead_code: true,
        },
        output: {
          comments: false,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HtmlWebpackPlugin({
        title: 'Elm-Simple-Playground',
        filename: 'index.html',
        template: path.resolve(__dirname, '../templates', 'index.ejs'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.elm'],
      modules: ['node_modules'],
    },
    module: {
      noParse: /\.elm$/,
      rules: [
        {
          test: /\.elm$/,
          exclude: [/elm-stuff/, /node_modules/],
          use: [
            {
              loader: 'elm-webpack-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
        }
      ],
    },
  });
