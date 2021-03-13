const path = require("path")

module.exports = {
  mode: "production",
  entry: './src/main.tsx',
  output: {
    filename: 'dist.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', ".jsx", '.json', '.ts', '.tsx', '.d.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          allowTsInNodeModules: true
        }
      }, {
        test: /\.s[a|c]ss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "resolve-url-loader"
        ]
      }
    ]
  }
}