// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var assetsRoot = path.resolve(__dirname, '../public/')
module.exports = {
  build: {
    index: path.resolve(assetsRoot, 'index.html'),
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsDist: path.resolve(__dirname, '../dist'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    host: '0.0.0.0',
    port: 3000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
