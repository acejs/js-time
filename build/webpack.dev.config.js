const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 输出到页面

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3003,
    clientLogLevel: 'warning',
    open: true,
    hot: true,
    quiet: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    progress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
