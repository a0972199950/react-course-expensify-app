const path = require("path");
const port = process.env.PORT || 8080;

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            loader: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/
        },{
            test: /\.s?css$/,
            use: [
                "style-loader",
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: path.join(__dirname, "public"),
        // 若瀏覽器尋找頁面時收到404，則強制載入首頁
        historyApiFallback: true
    },
}