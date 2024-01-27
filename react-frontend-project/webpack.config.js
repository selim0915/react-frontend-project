const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[hash][ext][query]'
  },
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'public/'),
    devMiddleware: {
      publicPath: '/dist/'
    },
    port: process.env.PORT | 3002,
    hot: 'only'
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
        type: 'asset', // webpack 5 부터 asset 모듈로 대체
        generator: {
          filename: '[name][ext][query][hash]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 // 20KB
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
                Build Data: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `
    }),
    new webpack.DefinePlugin({
      TWO: JSON.stringify('1+1'),
      'api.domain': JSON.stringify('http://localhost:50001')
    }),
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
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : [])
    // new webpack.HotModuleReplacementPlugin(),
  ]
};
