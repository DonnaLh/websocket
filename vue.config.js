module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    devServer: {
        host: 'localhost',
        port: '8081',
        https: false,
        open: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}