const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: './dist/',
                    limit: 20000, // 20KB
                }
            }
        ]
    },
    plugins: [
        new MyWebpackPlugin()
    ]
}