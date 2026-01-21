# Luffa 小程序配置修复说明

## 问题分析

从错误截图看到的问题：
1. 显示"无法访问此网站"
2. Console 中出现 Web-view error
3. 错误发生在 `VM7:368` 等位置

## 根本原因

1. **环境变量问题**：`config.js` 中使用了 `__wxConfig` 这是微信小程序的全局变量，但 Luffa 小程序不支持
2. **开发服务器未启动**：本地的 `http://192.168.1.145:5173` 需要运行中
3. **Luffa SDK 加载问题**：在 web-view 环境中 SDK 的初始化可能有延迟

## 已修复内容

### 1. 修复 `miniprogram/config.js`

**修改前（有问题）：**
```javascript
const currentEnv = __wxConfig.envVersion === 'release' ? 'production' : 'development'
```

**修改后（已修复）：**
```javascript
// Luffa 小程序环境判断
// 默认使用开发环境，生产环境需要手动修改
const currentEnv = 'development'
```

### 2. 更新生产环境 URL

```javascript
const ENV = {
    development: 'http://192.168.1.145:5173',
    production: 'https://rwa-mart.vercel.app'  // 你的 Vercel 部署地址
}
```

## 解决步骤

### 步骤 1: 确保开发服务器运行

```bash
cd "/Users/vivienna/Desktop/VibeCoding/RWA Mart"
npm run dev
```

服务器应该显示：
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.145:5173/
```

### 步骤 2: 在 Luffa 开发者工具中

1. **打开项目**：选择项目根目录（包含 `project.config.json`）
2. **检查配置**：
   - 确认 `LuffaToolsappid` 设置正确：`mpwmj3iygswjeyuq`
   - 确认 `urlCheck` 设置为 `false`
3. **编译项目**：点击"编译"按钮
4. **查看 Console**：检查是否有新的错误信息

### 步骤 3: 切换到生产环境（可选）

如果要测试 Vercel 部署版本：

1. 修改 `miniprogram/config.js:12`：
```javascript
const currentEnv = 'production'  // 改为 production
```

2. 重新编译小程序

## Luffa 小程序与微信小程序的区别

### 1. 全局对象不同
- **微信小程序**：`wx`, `__wxConfig`
- **Luffa 小程序**：`luffa`, 可能有不同的配置对象

### 2. Web-View 行为
- Luffa 的 web-view 可能对 HTTPS 的要求不同
- 开发时可以通过 `urlCheck: false` 使用 HTTP

### 3. SDK 加载
- Luffa SDK 需要在 HTML 中通过 `<script>` 标签加载
- SDK 初始化可能需要等待 `DOMContentLoaded` 事件

## 调试建议

### 1. 检查 Web 应用是否正常

在浏览器中直接访问 `http://192.168.1.145:5173/`，确保：
- 页面能正常加载
- 没有 JavaScript 错误
- Luffa SDK 已加载（检查 `window.luffa` 是否存在）

### 2. 检查 Luffa 开发者工具设置

确认以下设置：
- [ ] "不校验合法域名" 已启用
- [ ] 项目 AppID 正确
- [ ] miniprogram 目录路径正确

### 3. Console 调试

在小程序的 Console 中检查：
```javascript
// 检查配置是否正确加载
console.log(config.webViewUrl)

// 检查是否加载了正确的 URL
console.log('Loading URL:', this.data.url)
```

### 4. 常见错误及解决

**错误：`__wxConfig is not defined`**
- 原因：使用了微信小程序特有的全局变量
- 解决：已在 `config.js` 中移除

**错误：`luffa is not defined`**
- 原因：Luffa SDK 未正确加载
- 解决：检查 `index.html` 中的 SDK 引用

**错误：`Cannot read property 'envVersion'`**
- 原因：尝试访问不存在的配置对象
- 解决：使用简单的环境变量而不是动态判断

## 网络配置注意事项

### 开发环境

1. **确保手机和电脑在同一网络**（如果真机调试）
2. **检查防火墙**：允许 5173 端口访问
3. **IP 地址正确**：使用实际的局域网 IP，不是 localhost

查看当前 IP：
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

更新 `miniprogram/config.js` 中的 IP：
```javascript
development: 'http://YOUR_ACTUAL_IP:5173'
```

### 生产环境

使用 HTTPS 部署的 URL，例如：
```javascript
production: 'https://rwa-mart.vercel.app'
```

## 提交更改

```bash
git add miniprogram/config.js
git commit -m "Fix Luffa miniprogram config for __wxConfig error"
git push origin main
```

## 后续步骤

1. 在 Luffa 开发者工具中重新编译
2. 检查 Console 是否还有错误
3. 测试钱包连接功能
4. 测试真机调试（可选）

## 参考资料

- [Luffa SuperBox 文档](https://luffa.im/SuperBox/docs/hk/miniProDevelopmentGuide/Introduction.html)
- [Luffa SDK 文档](https://luffa.im/luffasdk/)
- 项目文档：`docs/LUFFA_INTEGRATION.md`
