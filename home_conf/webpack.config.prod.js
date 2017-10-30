// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';



const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
    throw new Error('Production builds must have NODE_ENV=production.');
}

// Note: defined here because it will be used more than once.
const cssFilename = 'view/WapSite/Exchange/static/css/[name].[contenthash:8].css';


const extractTextPluginOptions = shouldUseRelativeAssetPaths ? // Making sure that the publicPath goes back to to build folder.
    {
        publicPath: Array(cssFilename.split('/').length).join('../')
    } : {};

// <script src="https://cdn.bootcss.com/react/16.0.0/umd/react.production.min.js"></script>
module.exports = {

    bail: true,
    devtool: false,
    externals: {
        'jquery': 'var $',
        'react': 'var React',
        'react-dom': 'var ReactDOM',
        'react-router-dom': 'var ReactRouterDOM',
        'redux': 'var Redux',
        'react-redux': 'var ReactRedux',
        'redux-thunk': 'var ReduxThunk',

    },
    entry: {

        main: [require.resolve('./polyfills'), paths.appIndexJs],
        // reactjs: ['./src/js/min/react', './src/js/min/react-dom', './src/js/min/react-router-dom', './src/js/min/redux', './src/js/min/react-redux', './src/js/min/redux-thunk'],
        // reactjs: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux', 'redux-thunk'],
        // vendor: ['react', 'react-dom'],
    },

    output: {
        path: paths.appBuild,
        filename: 'view/WapSite/Exchange/static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        publicPath: publicPath,
        devtoolModuleFilenameTemplate: info =>
            path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/'),
    },

    resolve: {

        modules: ['node_modules', paths.appNodeModules].concat(
            process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
        ),

        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
        alias: {

            'babel-runtime': path.dirname(
                require.resolve('babel-runtime/package.json')
            ),

            'react-native': 'react-native-web',
        },
        plugins: [

            new ModuleScopePlugin(paths.appSrc),
        ],
    },
    module: {
        strictExportPresence: true,
        loaders: [{
            test: /\.sass/,
            loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
        }, {
            test: /\.scss/,
            loader: 'style!css!postcss!sass?outputStyle=expanded'
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.styl/,
            loader: 'style-loader!css-loader!stylus-loader'
        }, {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.(mp4|ogg|svg)$/,
            loader: 'file-loader'
        }],
        rules: [{
                test: /\.(js|jsx)$/,

                enforce: 'pre',
                use: [{
                    options: {
                        formatter: eslintFormatter,
                        // @remove-on-eject-begin
                        // TODO: consider separate config for production,
                        // e.g. to enable no-console and no-debugger only in production.
                        baseConfig: {
                            extends: [require.resolve('eslint-config-react-app')],
                        },
                        ignore: false,
                        useEslintrc: false,
                        // @remove-on-eject-end
                    },
                    loader: require.resolve('eslint-loader'),
                }, ],
                include: paths.appSrc,
            },

            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                    /\.scss$/, //....新增项!
                    /\.sass$/ //....新增项!
                ],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },

            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 5000,
                    name: 'view/WapSite/Exchange/static/media/[name].[ext]',
                },
            },
            // Process JS with Babel.
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: require.resolve('babel-loader'),
                options: {
                    // @remove-on-eject-begin
                    babelrc: false,
                    presets: [require.resolve('babel-preset-react-app')],
                    // @remove-on-eject-end
                    compact: true,
                },
            },


            {
                test: [/\.scss$/, /\.sass$/],
                use: [{
                    loader: "style-loader", // creates style nodes from JS strings 
                    options: {
                        minimize: true // css压缩
                    },

                }, {
                    loader: "css-loader" // translates CSS into CommonJS 

                }, {
                    loader: "sass-loader", // compiles Sass to CSS 

                }]
            },

            {
                test: [/\.css$/],
                use: [
                    require.resolve('style-loader'), {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true // css压缩

                        },
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },


            // {
            //        test: /\.scss$/,
            //        loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            //    },
            // ** STOP ** Are you adding a new loader?
            // Remember to add the new extension(s) to the "file" loader exclusion list.
        ],
    },
    plugins: [
        //        new webpack.optimize.CommonsChunkPlugin({
        //     chunks: ['main', 'vendor'],
        //     names: 'react.min'
        // }),
        //       new webpack.optimize.CommonsChunkPlugin({
        //     chunks: ['main', 'vendor'],
        //     names: 'react.min'
        // }),
        new InterpolateHtmlPlugin(env.raw),
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHtml,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),

        new webpack.DefinePlugin(env.stringified),
        // Minify the code.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,

                comparisons: false,
            },
            output: {
                comments: false,

                ascii_only: true,
            },
            sourceMap: true,
        }),
        new ExtractTextPlugin({
            filename: cssFilename,
        }),

        new ManifestPlugin({
            fileName: 'asset-manifest.json',
        }),

        new SWPrecacheWebpackPlugin({

            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {

                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: publicUrl + '/index.html',

            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        //分离公共模块


    ],

    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};