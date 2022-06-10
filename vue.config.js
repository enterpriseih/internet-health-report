const path = require('path')
module.exports = {
    runtimeCompiler: true,
    devServer: {
        port: 8080,
        compress: true,
        overlay: {
            warnings: false,
            errors: true,
        },
        open: 'Google Chrome',
        proxy: {
            '/api': {
                target: 'http://175.24.90.72:8000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    chainWebpack: webpackConfig => {
        webpackConfig.module
            .rule('ify-loader')
            .test(/node_module\/plotly.js\/*.js$/)
            .use('ify-loader')
            .loader('ify-loader')

        webpackConfig.module
            .rule('i18n')
            .resourceQuery(/blockType=i18n/)
            .type('javascript/auto')
            .use('i18n')
            .loader('@kazupon/vue-i18n-loader')
            .end()
    },
    pluginOptions: {
        quasar: {
            rtlSupport: true,
            treeShake: true,
        },
        i18n: {
            locale: 'en-us',
            fallbackLocale: 'en-us',
            localeDir: 'locales',
            enableInSFC: true,
        },
    },
    transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/],
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, './src'),
                src: path.join(__dirname, './src'),
            },
            extensions: ['.js', '.vue', '.json', '.styl'],
        },
    },
    publicPath: '/ihr/',
}
