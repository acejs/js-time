const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 用于在下一次打包时清除之前打包的文件

module.exports = {
  mode: 'production',
  devtool: 'none',
  output: {
    libraryTarget: 'umd',
    library: 'jsMath',
    globalObject: 'this'
  },
  plugins: [new CleanWebpackPlugin()]
}
