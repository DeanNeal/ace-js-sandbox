var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CssSourceMapPlugin = require('css-sourcemaps-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
    entry: {
        app: ['./dev/app.js']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: NODE_ENV == 'prod' ? '[name][hash].js' : '[name].js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'dev'),
                query: {
                    presets: 'es2015',
                    plugins: ['transform-decorators-legacy' ]
                }
            },
            {
                test: /\.(tpl|html)$/,
                loader: 'html',
                query: {
                    // variable: 'data',
                    withImports: true
                    // engine: 'lodash'
                }
            },
            {
                test: /\.scss$/,
                loader: 'css-loader!resolve-url!sass-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=[path][name].[ext]'
            }
        ]
    },

    sassLoader: {
        includePath: ['dev/assets/scss']
    },

    plugins: [
      //  new CssSourceMapPlugin(),
        new ExtractTextPlugin("[name].css", {allChunks: true}),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery",
        //     "moment": "moment"
        // }),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            context: 'dev/assets/img',
            from: '**/*',
            to: 'assets/img'
        }, {
            context: 'dev/assets/css',
            from: '**/*',
            to: 'css'
        }, {
            context: 'dev/mock-data',
            from: '**/*',
            to: 'mock-data'
        }]),
        new HtmlWebpackPlugin({
            title: 'ACE',
            alwaysWriteToDisk: true,
            filename: path.resolve('build/index.html'),
            template: path.resolve(__dirname, 'dev/index.html')
        }),
         new HtmlWebpackHarddiskPlugin({
            alwaysWriteToDisk: true,
            filename: 'index.html'
         })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "vendor"
        // })
    ],
    // Create Sourcemaps for the bundle
    // devtool: 'source-map',
    resolve: {
        root: path.resolve(__dirname, 'dev'),
        alias: {
            img: 'img'
            //framework: 'framework',
            //assets: path.resolve(__dirname, 'dev/assets'),
        },
        extensions: ['', '.js', '.html', '.scss', '.css']
    },
    devServer: {
        port: "8080",
        contentBase: path.resolve(__dirname, 'build'),
        colors: true,
        historyApiFallback: true,
        // hot: false,
        inline: true // reloads page after any changes
    }
};

//------PRODUCTION CONFIG--------//
if (NODE_ENV == 'prod') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                keep_fnames: true
            }
        }),
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname),
            verbose: true
        })
    )
}
