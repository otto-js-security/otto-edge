const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  optimization: {
    minimize: true
  },
  target: "webworker",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "bin"),
    libraryTarget: "this",
  },
  resolve:{
    fallback: { "crypto": require.resolve("crypto-browserify"),  "stream": require.resolve("stream-browserify") },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      URL: "core-js/web/url",
    }),
    new webpack.DefinePlugin({
      "process.env": {},
    })
  ],
};
