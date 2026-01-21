// 环境配置
const ENV = {
    // 开发环境 - 需要在微信开发者工具中关闭"不校验合法域名"
    development: 'http://192.168.1.145:5173',

    // 生产环境 - 需要部署到 HTTPS 服务器，并在微信公众平台配置业务域名
    // 替换为你的实际部署域名
    production: 'https://your-domain.com'
}

// 根据编译类型自动选择环境
// 在开发者工具中运行时使用 development
// 真机预览/发布时使用 production
const currentEnv = __wxConfig.envVersion === 'release' ? 'production' : 'development'

module.exports = {
    webViewUrl: ENV[currentEnv]
}
