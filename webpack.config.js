require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WEBPACK_PORT } = require('./server/properties');

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry: path.resolve(__dirname, './front/src/index.tsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    port: WEBPACK_PORT,
    static: {
      publicPath: '/',
    },
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader', // 오른쪽부터 실행 됨
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 20KB
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './front/public', 'index.html'),
      favicon: path.resolve(__dirname, './front/public', 'favicon.ico'),
      templateParameters: {
        title: mode === 'development' ? 'DEV project' : 'project',
      },
      minify:
        mode === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
    }),
    ...(mode === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : []),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/i,
          chunks: 'async',
          name: 'node_vendors',
        },
      },
    },
    mergeDuplicateChunks: true,
  },
};
