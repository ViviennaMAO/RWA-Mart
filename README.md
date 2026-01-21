# RWA Mart - Luffa SuperBox 小程序

一个基于 Luffa SuperBox 的现实世界资产（RWA）数据监控和投资平台。

## 📱 项目概述

RWA Mart 为 Luffa 用户提供一站式的 RWA 链上数据监控、分析及投资入口，涵盖私人信贷、代币化国债、房地产等资产类别。

### 主要功能

- ✅ **钱包集成**: 通过 Luffa SDK 实现一键钱包连接
- ✅ **市场概览**: 显示全网 RWA TVL 和宏观经济数据
- ✅ **热门协议**: 展示高 APY 和高增长的 RWA 协议
- 🚧 **资产列表**: 多维度排序和筛选（开发中）
- 🚧 **个人资产**: 多链持仓和收益监控（开发中）

## 🛠️ 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS 4
- **路由**: React Router 7
- **图表**: Recharts
- **钱包集成**: Luffa SuperBox SDK

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 `http://localhost:5173`

⚠️ **注意**: Luffa SDK 功能只在 SuperBox 环境中可用，本地开发仅用于 UI 测试。

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
RWA Mart/
├── src/
│   ├── components/      # 可复用组件
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── hooks/          # 自定义 Hooks
│   │   └── useLuffaWallet.ts  # 钱包连接 Hook
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx
│   │   └── Market.tsx
│   ├── types/          # TypeScript 类型定义
│   │   └── luffa.d.ts  # Luffa SDK 类型
│   ├── utils/          # 工具函数
│   │   └── luffaHelpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── docs/               # 文档
│   ├── RWA Mart PRD.md          # 产品需求文档
│   ├── LUFFA_INTEGRATION.md     # Luffa 集成说明
│   └── DEPLOYMENT_GUIDE.md      # 部署指南
├── index.html
├── package.json
└── vite.config.ts
```

## 🔌 Luffa SDK 集成

### 钱包连接

```typescript
import { useLuffaWallet } from './hooks/useLuffaWallet'

function MyComponent() {
  const { address, isConnected, connect, formatAddress } = useLuffaWallet()

  return (
    <div>
      {isConnected ? (
        <p>已连接: {formatAddress(address)}</p>
      ) : (
        <button onClick={connect}>连接钱包</button>
      )}
    </div>
  )
}
```

### 辅助函数

```typescript
import {
  isInLuffaEnvironment,
  sendLuffaTransaction,
  signMessage
} from './utils/luffaHelpers'

// 检查是否在 Luffa 环境
if (isInLuffaEnvironment()) {
  // 执行 Luffa 特定逻辑
}

// 发送交易
const result = await sendLuffaTransaction(serializedData, 'endless')

// 签名消息
const signature = await signMessage('Hello Luffa')
```

## 📚 文档

- [产品需求文档 (PRD)](./docs/RWA%20Mart%20PRD.md)
- [Luffa 集成说明](./docs/LUFFA_INTEGRATION.md)
- [部署指南](./docs/DEPLOYMENT_GUIDE.md)
- [Luffa 官方文档](https://luffa.im/SuperBox/docs/)

## 🎯 已完成功能

### Phase 1: 钱包集成 ✅

- [x] 引入 Luffa SDK
- [x] 创建 TypeScript 类型定义
- [x] 实现 `useLuffaWallet` Hook
- [x] 集成钱包连接到 UI
- [x] 实现地址格式化和缓存
- [x] 创建辅助工具函数

### Phase 2: 数据集成 ✅

- [x] 创建 RWA 数据类型定义
- [x] 实现 `useRWAData` Hook
- [x] Home 页面数据集成
- [x] Market 页面数据展示
- [x] 数据筛选和排序
- [x] 加载状态和骨架屏
- [x] 分享功能实现
- [x] 宏观数据展示

### Phase 3: UI 界面增强 ✅

- [x] 首页市场概览
- [x] 热门协议列表
- [x] 响应式布局
- [x] 渐变背景效果
- [x] 加载动画
- [x] 交互反馈

## 🚧 计划中功能

### Phase 4: 真实数据源

- [ ] 接入 RWA.xyz API
- [ ] 接入宏观数据 API
- [ ] 实时 TVL 数据更新
- [ ] 协议详情页面
- [ ] 历史收益率图表

### Phase 5: 链上交互

- [ ] 实现交易发送 UI
- [ ] RWA 协议质押功能
- [ ] 交易确认界面
- [ ] 交易历史记录

### Phase 6: 个人资产

- [ ] 创建 Portfolio 页面
- [ ] 多链持仓查询
- [ ] 收益计算和展示
- [ ] 资产组合分析

## 🔧 配置

### Luffa 小程序配置

`project.config.json`:
```json
{
  "LuffaToolsappid": "mpwmj3iygswjeyuq",
  "LuffaToolsLibVersion": "2.3.1"
}
```

### 网络配置

在 `src/hooks/useLuffaWallet.ts` 中修改：
```typescript
network: 'endless'  // 主网
// network: 'ends'  // 测试网
```

## 📊 构建产物

```
dist/index.html          0.55 kB  (gzip: 0.35 kB)
dist/assets/index.css   21.49 kB  (gzip: 4.72 kB)
dist/assets/index.js   273.30 kB  (gzip: 87.01 kB)
```

**Phase 2 更新**: 新增数据管理和分享功能，整体增加 ~8KB (gzipped)

## 🐛 常见问题

**Q: 本地开发看不到钱包连接？**
A: Luffa SDK 只在 SuperBox 环境中可用，本地开发会显示 "Connect" 按钮但无法连接。

**Q: 如何测试钱包功能？**
A: 需要构建后上传到 Luffa SuperBox 进行测试。

**Q: 如何切换网络？**
A: 在 `useLuffaWallet.ts` 中修改 `network` 参数。

更多问题请查看 [部署指南](./docs/DEPLOYMENT_GUIDE.md)。

## 📞 支持

- Luffa 官方文档: https://luffa.im/SuperBox/docs/
- API 文档: https://luffa.im/SuperBox/docs/hk/API/customizeAPI.html

## 📄 许可证

MIT

## 🙏 致谢

- Luffa SuperBox 团队提供的开发支持
- RWA.xyz 提供的数据源参考

---

Built with ❤️ for the Luffa community
