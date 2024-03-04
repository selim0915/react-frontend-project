require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry: {
    app: mode === 'production' ? ['./src/index.tsx'] : ['webpack-hot-middleware/client?reload=true', './src/index.tsx']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '..', 'public'),
      publicPath: '/'
    },
    port: 50002,
    compress: true,
    historyApiFallback: true,
    hot: true,
    devMiddleware: {
      // writeToDisk: true
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
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader' // 오른쪽부터 실행 됨
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        type: 'asset/resource',
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
      templateParameters: {
        title: mode === 'development' ? 'DEV SAMPEOPLE' : 'SAMPEOPLE'
      },
      minify:
        mode === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true
            }
          : false
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...(mode === 'production' ? [new MiniCssExtractPlugin({ filename: '[name].css' })] : [])
  ]
};
