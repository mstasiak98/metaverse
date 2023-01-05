const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {path: path.resolve(__dirname, 'dist'), filename: 'bundle.js',},
    module: {
        rules: [
            {
                test: /\.js$/i, include: path.resolve(__dirname, 'src'), use: {
                    loader: 'babel-loader', options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href']
                    }
                }
            }
        ],
    },
    devServer: {
        static: 'dist',
        port: 8080,
        open: true,
        hot: true
    },
};