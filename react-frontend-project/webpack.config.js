require('dotenv').config();
const path = require('path');
// const webpack = require('webpack');
// const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
console.log('mode: ', mode);

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/'
    },
    port: process.env.WEBPACK_PORT || 3002,
    compress: true,
    historyApiFallback: true,
    hot: true,
    client: {
      progress: true,
      logging: 'info',
      overlay: true
    },
    devMiddleware: {
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader' // 오른쪽부터 실행 됨
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/resource', // webpack 5 부터 asset 모듈로 대체
        generator: {
          filename: 'images/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 20KB
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    // new webpack.BannerPlugin({
    //   banner: `
    //     Build Data: ${new Date().toLocaleString()}
    //     Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
    //     Author: ${childProcess.execSync('git config user.name')}
    //   `
    // }),
    // new webpack.DefinePlugin({
    //   TWO: JSON.stringify('1+1'),
    //   'api.domain': JSON.stringify('http://localhost:50001')
    // }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(dev)' : '(prod)'
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true
            }
          : false
    }),
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : [])
  ]
};
