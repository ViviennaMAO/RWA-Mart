# Luffa 钱包集成说明

## 已完成的功能

### 1. SDK 集成
- ✅ 在 `index.html` 中引入 Luffa SDK 脚本
- ✅ 创建完整的 TypeScript 类型定义 (`src/types/luffa.d.ts`)

### 2. 钱包连接功能
- ✅ 实现 `useLuffaWallet` Hook (`src/hooks/useLuffaWallet.ts`)
- ✅ 支持自动连接和手动连接
- ✅ 实现地址缓存到 localStorage
- ✅ 实现地址格式化显示 (0x1234...5678)

### 3. UI 集成
- ✅ 在 Home 页面显示钱包连接按钮
- ✅ 显示真实的用户钱包地址
- ✅ 加载状态显示

## 功能说明

### useLuffaWallet Hook

提供以下状态和方法：

```typescript
const {
  address,       // 钱包地址
  nickname,      // 用户昵称
  avatar,        // 用户头像
  uid,           // Luffa UID
  isConnected,   // 是否已连接
  isLoading,     // 是否加载中
  error,         // 错误信息
  connect,       // 连接钱包方法
  disconnect,    // 断开连接方法
  formatAddress, // 格式化地址方法
} = useLuffaWallet()
```

### 自动连接逻辑

1. 首次加载时检查 localStorage 缓存
2. 如果有缓存，直接使用缓存的地址
3. 如果在 Luffa 环境中且无缓存，自动调用连接
4. 用户也可以手动点击 "Connect" 按钮连接

### 网络配置

当前使用 `endless` 主网，可在 `useLuffaWallet.ts` 中修改：

```typescript
network: 'endless' // 主网
// network: 'ends' // 测试网
```

## 下一步开发建议

根据 PRD，还需要实现以下功能：

### 1. 链上交互功能
创建 `useLuffaTransaction` Hook 实现：
- `sendTransaction()` - 发送交易
- `packageTransaction()` - 打包交易参数

### 2. 分享功能
实现 `setShareInfo()` 支持分享到 Luffa 群聊

### 3. 用户持仓数据
在 "My Portfolio" 页面：
- 获取用户在 RWA 协议中的持仓
- 显示预估收益

## 部署到 Luffa SuperBox

### 构建项目
```bash
npm run build
```

### 配置说明
确保 `project.config.json` 正确配置：
- `LuffaToolsappid`: 你的 Luffa 小程序 appid
- `LuffaToolsLibVersion`: SDK 版本

### 测试环境
- 开发环境：`npm run dev`
- 在 Luffa SuperBox 中打开开发服务器地址测试

## API 参考

Luffa SDK 文档：
https://luffa.im/SuperBox/docs/hk/API/customizeAPI.html

## 注意事项

1. **SDK 加载时机**：SDK 通过 `<script>` 标签异步加载，需要等待加载完成
2. **错误处理**：已实现基本错误处理，生产环境建议添加更详细的错误提示
3. **网络切换**：当前固定使用主网，后续可添加网络切换功能
4. **安全性**：敏感操作应该始终通过 Luffa SDK 进行，不直接处理私钥
