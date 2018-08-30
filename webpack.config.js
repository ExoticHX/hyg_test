const path = require('path')
const webpack = require('webpack')
const HTMLPLUGIN = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: 'web',
    entry: path.join(__dirname,'src/index.js'),
    output:     {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname,'dist')
    },  
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader:'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ] 
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|)$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit:1024,
                        name:'[name]-aaa.[ext]'
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPLUGIN()
    ]
}
if (isDev) {
    config.module.rules.push({
        //css预处理器
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    },)
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',//设置这个可以通过IP或者127.0.0.1访问
        overlay: {
            errors: true,
        },
        hot: true,//只修改某一渲染组件，而不影响全局数据
        //open:true//自动打开浏览器加载页面
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname,'./src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            //css预处理器
            test: /\.styl$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap:true,
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    )
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}
module.exports = config