const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: "source-map",
    context: path.join(__dirname, './src'),
    entry: {
        vendor: './lib/vendor.ts',
        app: './lib/app.ts',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'html',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            { test: /pixi\.js/, loader: 'expose?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
            { test: /p2\.js/, loader: 'expose?p2' },
            { test: /jquery\.js/, loader: 'expose?$' },
        ],
    },
    resolve: {
        alias: {
            'phaser': path.join(__dirname, './node_modules/phaser/build/custom/phaser-split.js'),
            'pixi': path.join(__dirname, './node_modules/phaser/build/custom/pixi.js'),
            'p2': path.join(__dirname, './node_modules/phaser/build/custom/p2.js'),
            'jquery': path.join(__dirname, './node_modules/jquery/dist/jquery.js'),
        },
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: true,
        }),
        new HtmlWebpackPlugin({
            template: 'app.html',
            chunksSortMode: 'dependency',
        }),
        new CopyWebpackPlugin([
            {
                from: '../static'
            },
        ]),
    ],
    devServer: {
        contentBase: './dist',
        progress: true,
        watch: true,
        hot: true,
    }
};