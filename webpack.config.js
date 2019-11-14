const path = require('path');

const config = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'index.js',
        publicPath: "dist/"
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    }
}

module.exports = config;
module.exports = (env, options) => {
    config.devtool = options.mode === 'production' ? false : "source-map";
    return config;
}