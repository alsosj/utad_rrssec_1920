var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    context: __dirname,
    entry: "./src/",
    mode: "development",

    output: {
        path: require("path").resolve("../static/assets/bundles/"),
        filename: "bundle.js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"],
    },

    plugins: [
        new BundleTracker({
            path: __dirname,
            filename: "./webpack-stats.json"
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