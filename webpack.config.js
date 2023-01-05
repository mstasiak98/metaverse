const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {path: path.resolve(__dirname, 'dist'), filename: 'bundle.js', assetModuleFilename: 'src/assets/[name].[ext]'},
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
                test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
                type: 'asset/resource'
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
