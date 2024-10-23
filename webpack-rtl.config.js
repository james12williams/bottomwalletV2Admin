/**
 * Main file of webpack config for RTL.
 * Please do not modified unless you know what to do
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const del = require('del')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RtlCssPlugin = require('rtlcss-webpack-plugin');

// global variables
const rootPath = path.resolve(__dirname)
const distPath = rootPath + '/src/_metronic/assets';

const entries = {
    'css/style': './src/_metronic/assets/sass/style.scss',
}

// remove older folders and files
;(async () => {
    await del.sync(distPath + '/css', {force: true})
})();

function mainConfig() {
    return {
        // enabled/disable optimizations
        mode: 'development',
        // console logs output, https://webpack.js.org/configuration/stats/
        stats: 'errors-only',
        performance: {
            // disable warnings hint
            hints: false,
        },
        entry: entries,
        output: {
            // main output path in assets folder
            path: distPath,
            // output path based on the entries' filename
            filename: '[name].js',
        },
        resolve: {
            extensions: ['.scss'],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
            new HtmlWebpackPlugin({
                title: 'TinyMCE Webpack Demo',
                meta: {viewport: 'width=device-width, initial-scale=1'}
            }),
            new RtlCssPlugin({
                filename: '[name].rtl.css',
            }),
            {
                apply: (compiler) => {
                    // hook name
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
                        ;(async () => {
                            await del.sync(distPath + '/css/*.js', {force: true})
                        })()
                    })
                },
            },
        ],
        module: {
            rules: [
                {
                    test: /skin\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /content\.css$/i,
                    use: ['css-loader'],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    tinymceVendor: {
                        test: /[\\/]node_modules[\\/](tinymce)[\\/](.*js|.*skin.css)|[\\/]plugins[\\/]/,
                        name: 'tinymce'
                    },
                },
            }
        },
    }
}
new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
});

module.exports = function () {
    return [mainConfig()]
};
