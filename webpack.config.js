const path = require('path');

module.exports = {
    mode: "development",
    entry:"./src/",
    output: {
        path:path.resolve(__dirname,'public'),
        filename: "index.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            }
        ]
    }
};