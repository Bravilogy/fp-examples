/* global require */
const path = require('path');

process.noDeprecation = true;

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'stage-0', 'react' ]
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        inline: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            path.resolve('./src/js'), 'node_modules'
        ]
    },
};
