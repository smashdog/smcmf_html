module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/index.php': {
                target: 'http://xcj.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/index\.php': '/index.php'
                }
            }
        },
        before: app => {}
    },
    chainWebpack: config => {
      // GraphQL Loader
      config.module
        .rule('vue')
        .test(/\.vue$/)
        .use('iview-loader')
          .loader('iview-loader')
          .options({
              prefix: true
          })
          .end()
    }
}