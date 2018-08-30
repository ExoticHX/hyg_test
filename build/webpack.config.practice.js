const path = require('path')
const webpack = require('webpack')
const HTMLPLUGIN = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPLUGIN({
    template: path.join(__dirname, 'template.html')
  })
]

const devServer = {
  port: '8080',
  host: '0.0.0.0', // 设置这个可以通过IP或者127.0.0.1访问
  overlay: {
    errors: true
  },
  hot: true // 只修改某一渲染组件，而不影响全局数据
  // open:true//自动打开浏览器加载页面
}
let config
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        // css预处理器
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})
module.exports = config
