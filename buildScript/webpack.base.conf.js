const path = require('path')
const utils = require('./utils')
const config = require('../conf')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractLess = new ExtractTextPlugin({
  filename: "./css/[name].css",
  disable: process.env.NODE_ENV === "development"
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    main: resolve('/src/main.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'src': resolve('src'),
      'style': resolve('src/style'),
      'temp': resolve('src/template'),
      '@': resolve('src/views'),
      'lib': resolve('src/lib'),
      'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }, {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // less
      {
        test: /\.(less|css)$/,
        use: extractLess.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { minimize: true } },
            { loader: "less-loader", options: { minimize: true } }
          ]
        })
      }
    ]
  },
  plugins: [
    extractLess,
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: resolve('/build/index.html'),
      template: resolve('/public/index.html'),
      inject: true,
      title: 'Airbub',
      chunks:['main']
    })
  ]
}
