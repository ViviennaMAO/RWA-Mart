// 环境配置
const ENV = {
    // 开发环境 - 本地开发时使用
    development: 'http://192.168.1.145:5173',

    // 生产环境 - 部署到 Vercel 后使用
    production: 'https://rwa-mart.vercel.app'
}

// Luffa 小程序环境判断
// 默认使用开发环境，生产环境需要手动修改
const currentEnv = 'development'

module.exports = {
    webViewUrl: ENV[currentEnv],
    ENV
}
