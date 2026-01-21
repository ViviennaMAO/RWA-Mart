// 环境配置
const ENV = {
    // 开发环境 - Vite 开发服务器（可能在 Luffa web-view 中样式加载有问题）
    development: 'http://192.168.1.145:5173',

    // 本地构建版本 - 用于测试生产构建（推荐在 Luffa 中使用）
    build: 'http://192.168.1.145:5174',

    // 生产环境 - 部署到 Vercel 后使用
    production: 'https://rwa-mart.vercel.app'
}

// Luffa 小程序环境判断
// 使用 build 模式可以正确加载样式
const currentEnv = 'build'

module.exports = {
    webViewUrl: ENV[currentEnv],
    ENV
}
