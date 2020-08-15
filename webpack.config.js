const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    module: "development",
    entry: "./src/index.js",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        contentBase: "./dist/",
    },
};
