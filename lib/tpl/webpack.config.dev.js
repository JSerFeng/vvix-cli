const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: 'dist.dev.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', ".jsx", '.json', '.ts', '.tsx', '.d.ts']
  },
  devServer: {
    contentBase: './public',
    port: 3000,
    open: true
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "ts-loader",
        options: {
          allowTsInNodeModules: true
        }
      }, {
        test: /.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "resolve-url-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ filename: "index.html", template: "./public/index.html" })
  ]
}