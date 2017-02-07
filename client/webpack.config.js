var webpack = require('webpack');
var path = require('path');


module.exports = {
   // entry:  ['webpack/hot/dev-server','./main.jsx'],
    entry: './main.jsx',
    output: {
        path: './',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
                //loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract(
            //     'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap'
            //     )
            // }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};