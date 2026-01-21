# RWA Mart 小程序配置指南

## 问题原因分析

### 1. IDE 显示不正常
- 项目根目录混合了 Web 应用（React + Vite）和小程序代码
- `project.config.json` 缺少 `miniprogramRoot` 配置，导致 IDE 无法正确识别小程序目录

### 2. 真机测试域名不支持
主要原因：
- **协议问题**：小程序使用了 `http://192.168.1.145:5173`（HTTP 协议）
- **域名问题**：本地开发地址无法在真机访问
- **配置问题**：`urlCheck` 设置为 `true` 时会强制校验域名白名单

## 已修复内容

### 1. 根目录 `project.config.json`
```json
{
  "miniprogramRoot": "miniprogram/",  // 新增：指定小程序根目录
  "setting": {
    "urlCheck": false,  // 改为 false，允许开发时访问非白名单域名
    ...
  }
}
```

### 2. 小程序 `miniprogram/app.json`
添加了网络超时配置：
```json
{
  "networkTimeout": {
    "request": 10000,
    "downloadFile": 10000
  }
}
```

### 3. 创建环境配置文件 `miniprogram/config.js`
自动根据环境切换 URL：
- 开发环境：使用本地 `http://192.168.1.145:5173`
- 生产环境：使用 HTTPS 域名

### 4. 更新 `miniprogram/pages/index/index.js`
- 引入配置文件
- 添加错误处理
- 支持动态 URL 参数

## 如何解决真机测试问题

### 方案一：临时开发（推荐用于开发阶段）

1. **在微信开发者工具中：**
   - 右上角"详情" → "本地设置"
   - 勾选"不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书"

2. **确保手机和电脑在同一局域网：**
   ```bash
   # 查看电脑 IP
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

3. **更新 `miniprogram/config.js` 中的 IP 地址：**
   ```javascript
   development: 'http://你的电脑IP:5173'
   ```

4. **启动 Vite 开发服务器：**
   ```bash
   npm run dev
   ```

### 方案二：生产部署（真机正式使用）

1. **部署 Web 应用到 HTTPS 服务器**

   选项 A - 使用 Vercel（免费）：
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

   选项 B - 使用 Netlify（免费）：
   ```bash
   npm run build
   # 将 dist 目录拖到 netlify.com
   ```

   选项 C - 自己的服务器：
   ```bash
   npm run build
   # 将 dist 目录部署到 Nginx/Apache，并配置 SSL 证书
   ```

2. **更新 `miniprogram/config.js`：**
   ```javascript
   production: 'https://your-domain.com'  // 替换为实际部署的域名
   ```

3. **在微信公众平台配置业务域名：**
   - 登录 [微信公众平台](https://mp.weixin.qq.com)
   - 进入"开发" → "开发管理" → "开发设置"
   - 在"业务域名"中添加你的 HTTPS 域名
   - 下载校验文件并放到你的服务器根目录

4. **上传小程序代码：**
   - 在微信开发者工具中点击"上传"
   - 填写版本号和备注
   - 提交审核

## 项目结构说明

```
RWA Mart/
├── src/                    # React Web 应用源码
│   ├── pages/             # Web 应用页面
│   ├── components/        # React 组件
│   └── main.tsx           # Web 应用入口
├── miniprogram/           # 微信小程序代码
│   ├── pages/
│   │   └── index/
│   │       ├── index.js   # 使用 web-view 加载 Web 应用
│   │       ├── index.wxml
│   │       └── index.json
│   ├── app.js             # 小程序入口
│   ├── app.json           # 小程序配置
│   └── config.js          # 环境配置（新增）
├── dist/                  # Web 应用构建产物
├── project.config.json    # 小程序项目配置（已修复）
├── index.html             # Web 应用 HTML 模板
├── vite.config.ts         # Vite 配置
└── package.json           # 依赖配置
```

## 工作原理

1. **开发阶段：**
   - Vite 运行在 `http://localhost:5173`（或局域网 IP）
   - 小程序通过 `web-view` 加载这个本地地址
   - 可以实时看到代码修改效果

2. **生产阶段：**
   - Web 应用部署到 HTTPS 服务器
   - 小程序通过 `web-view` 加载线上地址
   - 用户访问小程序时实际看到的是你的 Web 应用

## 注意事项

### Web-view 限制
1. **域名必须是 HTTPS**（开发时可以关闭校验）
2. **域名必须在微信公众平台配置业务域名**
3. **某些 API 在 web-view 中不可用**（如支付、分享等）

### 开发建议
1. 开发时使用方案一（关闭域名校验）
2. 提交审核前使用方案二（部署到 HTTPS）
3. 定期测试真机功能
4. 关注微信小程序开发文档更新

### 常见错误

**错误 1: "不支持打开该域名"**
- 原因：域名未配置或使用了 HTTP
- 解决：配置业务域名或关闭域名校验

**错误 2: "net::ERR_CONNECTION_REFUSED"**
- 原因：本地服务未启动或 IP 地址错误
- 解决：启动 Vite 服务并检查 IP

**错误 3: "页面加载失败"**
- 原因：网络问题或 URL 配置错误
- 解决：检查网络连接和 config.js 配置

## 快速测试步骤

1. **启动开发服务器：**
   ```bash
   npm run dev
   ```

2. **打开微信开发者工具：**
   - 打开项目：选择 `RWA Mart` 根目录
   - 确认小程序 AppID 已配置

3. **开发阶段测试：**
   - 点击"编译"
   - 检查"调试器"中的 Console 输出
   - 使用"真机调试"功能

4. **真机测试前：**
   - 确保"不校验合法域名"已勾选
   - 或者已完成 HTTPS 部署和域名配置

## 相关文档

- [微信小程序 web-view 文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)
- [业务域名配置说明](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/web-view.html)
- [Luffa Tools 文档](https://docs.luffa.im/)
