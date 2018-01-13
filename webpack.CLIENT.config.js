'use strict';

/* jshint node:true */

const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const chalk = require('chalk');

module.exports = function (env) {
    const ExtractSASS = new ExtractTextPlugin('app.css');

    console.log(chalk.green.bold.underline('Setting environment:'), env || 'development');
    
    // Most config items assume dev env
    let config = {
        devtool: "eval-source-map", 

        entry: [ path.resolve(__dirname, 'src/client/app.js') ],
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app.js',
        },

        plugins: [
            ExtractSASS,
            new HtmlWebpackPlugin({
                template: 'src/client/app.html',
                inject: 'body',
            }),

            // Plugins to speed up compile-time
            new Webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
            new HardSourceWebpackPlugin(),
            new Webpack.optimize.AggressiveMergingPlugin(),
        ],

        module: {
            rules: [
                // NOTE: to my future self who is reusing this webpack config, below is *THE* way to get
                // fonts loading correctly, w/ relative paths, where SCSS is located in a different dir.
                // resolve-url-loader <- actually *searches* for the file using file-system operations
                // - css-loader and sass-load MUST include source-maps
                {
                    test: /\.scss$/i,
                    exclude: /(node_modules|bower_components)/,
                    use: ExtractSASS.extract([ 
                        { 
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'resolve-url-loader'
                        },
                        { 
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ])
                },

                // NOTE: to my future self, who is reusing this webpack config, below is *THE* way to have
                // files copied into a subdirectory, relative to the configure webpack output path.
                {
                    test: /\.(ttf|eot|woff|woff2|otf)$/,
                    loader: 'file-loader',
                    options: {
                        name: "assets/fonts/[name].[ext]" // output path + /assets/fonts/...
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: "assets/images/[name].[ext]" // output path + /assets/image/...
                    }
                },
            ]
        }
    };

    if (env != "production") {
        console.log('Running babel-loader');
        config.module.rules.push({
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: { 
                loader: 'babel-loader',
                options: {
                    // TODO: use the "extends" option to extend a core .babelrc
                    babelrc: false,
                    cacheDirectory:true,
                    presets: ['react'],
                    plugins: [
                        "syntax-flow",
                        "transform-flow-strip-types"
                    ]
                }
            }        
        });
    }

    if (env == "production") {
        // Most of these increase build time

        // no sourcemaps - security
        config.devtool = undefined;

        // uglify JS for download speed
        config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
            parallel: true,
            uglifyOptions: { warnings: true }
        }));

        // compile w/ babel for supporting older browsers
        config.module.rules.push({
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader'],
        });
    }

    return config;
};

