/* global require */
const path = require('path');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react' ]
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
    devServer: {
        inline: true
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        root: [
            path.resolve('./src/js')
        ]
    },
};
