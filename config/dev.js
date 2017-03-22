const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () =>
  ({
    entry: {
      bundle: [
        'webpack/hot/dev-server',
        path.resolve(__dirname, '../src'),
      ],
    },
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      contentBase: path.resolve(__dirname, '../dist'),
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: 'Elm-Simple-Playground',
        filename: 'index.html',
        template: path.resolve(__dirname, '../templates', 'index.ejs'),
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
          use: [
            'style-loader',
            'css-loader',
          ],
        }
      ],
    },
  });
