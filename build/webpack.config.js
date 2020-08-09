const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const dev = require('./webpack.dev.config')
const pro = require('./webpack.pro.config')

module.exports = (env, argv) => {
  const config = argv.mode === 'development' ? dev : pro
  return merge(base, config)
}
