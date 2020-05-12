var BundleTracker = require("webpack-bundle-tracker");
var path = require("path");
module.exports = {
    context: __dirname,
    entry: "./src/",
    mode: "development",

    output: {
        path: path.resolve("../static/bundles/"),
        filename: "bundle.js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"],
    },

    plugins: [
        new BundleTracker({
            path: path.resolve("../static/"),
            filename: "webpack-stats.json"
        })
    ],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {test: /\.svg$/, loader: 'file-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    }
};