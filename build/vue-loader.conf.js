/**
 * @Author: yuanmanxue
 * @Date:   2017-10-20 04:58:18
 * @Last modified by:   yuanmanxue
 * @Last modified time: 2018-01-19 09:51:07
 */

'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  cssModules: {
    localIdentName: '[path][name]---[local]---[hash:base64:5]',
    camelCase: true
  },
  extractCSS: true,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
