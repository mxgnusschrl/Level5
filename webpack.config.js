const path = require('path');

const ideConfig = {
    mode: 'production', // development
    context: path.resolve(__dirname, 'htdocs'),
    entry: {
        home: [
            './js/Main.js',
        ],
        // style: [
        //     './htdocs/css/embedded.css'
        // ]
    },
    devtool: 'source-map',
    performance: {
        hints: false
    },
    output: {
        path: path.resolve(__dirname, 'htdocs/packed/'),
        filename: 'packed.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader", "source-map-loader"],
                enforce: "pre"
            }
        ]
    },
    plugins: [
      ]
}

module.exports = [ideConfig];