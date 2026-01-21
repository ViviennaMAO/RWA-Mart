# RWA Mart - Luffa SuperBox 部署指南

## 📋 部署前检查清单

- ✅ Luffa SDK 已集成 (`index.html`)
- ✅ 钱包连接功能已实现 (`useLuffaWallet`)
- ✅ TypeScript 类型定义已创建
- ✅ 项目构建成功
- ✅ 开发服务器测试通过

## 🚀 部署步骤

### 1. 构建生产版本

```bash
npm run build
```

构建产物会生成在 `dist/` 目录中。

### 2. 配置 Luffa 小程序

确保 `project.config.json` 配置正确：

```json
{
  "miniprogramRoot": "dist/",
  "LuffaToolsappid": "mpwmj3iygswjeyuq",
  "LuffaToolsLibVersion": "2.3.1"
}
```

### 3. 上传到 Luffa SuperBox

方式一：使用 Luffa 开发者工具
1. 打开 Luffa 开发者工具
2. 导入项目，选择 `dist/` 目录
3. 预览测试
4. 上传发布

方式二：使用命令行工具（如果支持）
```bash
# 具体命令参考 Luffa 官方文档
luffa-cli upload --project ./dist
```

## 🧪 测试指南

### 本地测试

1. 启动开发服务器：
```bash
npm run dev
```

2. 访问 `http://localhost:5173`

3. 测试要点：
   - ⚠️ 本地环境无法测试 Luffa SDK 功能
   - ✅ 可以测试 UI 布局和响应式设计
   - ✅ 会显示 "Connect" 按钮（因为不在 Luffa 环境中）

### Luffa 环境测试

1. 构建项目并上传到 Luffa
2. 在 Luffa SuperBox 中打开小程序
3. 测试钱包连接：
   - 应该自动连接钱包
   - 显示格式化的地址（如 0x1234...5678）
   - 可以手动断开和重新连接

## 🔧 配置说明

### 网络配置

在 `src/hooks/useLuffaWallet.ts` 中配置网络：

```typescript
// 主网
network: 'endless'

// 测试网
network: 'ends'
```

### 元数据配置

钱包连接时的元数据（显示在授权弹窗）：

```typescript
metadata: {
  icon: window.location.origin + '/vite.svg',  // 图标
  url: window.location.origin,                 // 网站URL
}
```

建议替换为你的实际 logo。

## 📱 移动端适配

项目已配置移动端优化：

```css
/* tailwind.config.js 已设置 */
max-width: 28rem (max-w-md)
```

在 Luffa SuperBox 中会自动适配为全屏显示。

## 🐛 常见问题

### Q: 本地开发时显示 "Connect" 按钮
A: 正常现象。Luffa SDK 只在 SuperBox 环境中可用，本地开发会显示连接按钮。

### Q: 钱包连接失败
A: 检查以下几点：
1. 确认在 Luffa SuperBox 中运行
2. 检查 SDK 是否正确加载
3. 查看浏览器控制台错误信息
4. 确认网络配置正确

### Q: 地址不显示
A:
1. 检查 localStorage 是否被清除
2. 尝试清除缓存重新连接
3. 检查 Luffa SDK 版本兼容性

### Q: 构建失败
A:
```bash
# 清除缓存重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 性能优化

当前构建产物：
- `index.html`: ~0.55 KB
- `CSS`: ~20.67 KB (gzip: 4.53 KB)
- `JavaScript`: ~266.72 KB (gzip: 85.19 KB)

建议优化：
1. 按需导入 recharts 组件
2. 使用代码分割（React.lazy）
3. 图片使用 WebP 格式
4. 启用长期缓存

## 🔐 安全注意事项

1. **永远不要在代码中硬编码私钥**
2. **所有链上交互都通过 Luffa SDK**
3. **验证用户输入，防止注入攻击**
4. **敏感操作添加用户确认**

## 📞 支持

- Luffa 官方文档: https://luffa.im/SuperBox/docs/
- 问题反馈: 联系 Luffa 技术支持
- 项目文档: 查看 `docs/` 目录

## 🎯 下一步开发

根据 PRD，建议继续开发：

1. **链上交互功能**
   - 实现 `sendTransaction` 支持 RWA 质押
   - 添加交易确认界面

2. **个人资产监控**
   - 获取用户持仓数据
   - 显示预估收益

3. **分享功能**
   - 集成 `setShareInfo`
   - 支持分享到 Luffa 群聊

4. **数据源集成**
   - 接入 RWA.xyz API
   - 或使用 Dune Analytics API
