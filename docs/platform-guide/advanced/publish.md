---
title: "发布智能体"
description: "将 Agent 发布为 Http 应用或 API 服务"
lastUpdated: 2026-03-04
---

# 发布智能体

## 发布概述

完成 Agent 开发和测试后，可以发布为以下形式：

| 发布方式 | 说明 | 适用场景 |
|----------|------|----------|
| Http应用 | 生成分享链接 | 快速分享、临时使用 |
| API服务 | 提供 API 接口 | 系统集成、前端调用 |
| MCP Server | MCP 协议服务 | 其他 Agent 调用 |
| 应用集成 | 嵌入网页 | 网站集成 |

---

## 发布流程

### 步骤 1：测试验证

在发布前，确保：
- ✅ Agent 功能正常
- ✅ 测试多种场景
- ✅ 处理异常情况
- ✅ 性能符合要求

---

### 步骤 2：进入发布页面

1. 打开智能体
2. 点击右上角 **"···"** 按钮
3. 选择 **"发布"**
4. 进入智能体发布页面

---

## Http 应用

### 创建链接

**步骤**：
1. 点击 **"创建链接"** 按钮
2. 填写配置：

| 配置项 | 说明 | 必填 |
|--------|------|------|
| 链接名称 | 链接的名称 | ✅ 是 |
| 有效期 | 链接的有效期限 | ✅ 是 |
| 链接密码 | 访问密码保护 | ❌ 否 |

3. 点击 **"确定"** 创建

---

### 使用链接

**创建成功后，可以**：
- **打开**：直接访问链接
- **复制**：复制链接地址
- **嵌入网页**：获取嵌入代码

**示例嵌入代码**：
```html
<iframe 
  src="https://your-agent-url.com" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

---

### 链接管理

**操作**：
- **启用/禁用**：控制链接是否可用
- **编辑**：修改链接配置
- **删除**：删除链接

---

## API 服务

### 获取 API 信息

发布后，获取以下信息：

| 信息 | 说明 | 示例 |
|------|------|------|
| Uuid | 智能体 API 的唯一标识符 | `abc123-def456-ghi789` |
| AuthKey | 验证 API 调用权限的密钥 | `your-auth-key` |
| AuthSecret | 进一步保护 API 调用的安全密钥 | `your-auth-secret` |
| 创建时间 | API 创建时间 | `2026-03-04 10:00:00` |

---

### API 调用示例

**请求格式**：
```javascript
const response = await fetch('https://api.example.com/agent/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_KEY',
    'X-Auth-Secret': 'YOUR_AUTH_SECRET'
  },
  body: JSON.stringify({
    uuid: 'YOUR_AGENT_UUID',
    message: '用户输入的问题',
    session_id: 'session-123'  // 可选，用于多轮对话
  })
});

const data = await response.json();
console.log(data.reply);
```

---

### Python 调用示例

```python
import requests
import json

url = 'https://api.example.com/agent/chat'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_KEY',
    'X-Auth-Secret': 'YOUR_AUTH_SECRET'
}
data = {
    'uuid': 'YOUR_AGENT_UUID',
    'message': '用户输入的问题',
    'session_id': 'session-123'
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result['reply'])
```

---

### API 管理

**操作**：
- **复制**：复制 API 信息
- **刷新**：重新生成密钥
- **删除**：删除 API 服务

**注意**：刷新密钥后，旧的密钥将失效

---

## MCP Server

### 发布为 MCP Server

**步骤**：
1. 在发布页面选择 **"MCP Server"**
2. 填写配置：

| 配置项 | 说明 |
|--------|------|
| 服务名称 | MCP 服务名称 |
| 描述 | 服务功能描述 |

3. 点击 **"发布"**

---

### 获取 MCP 配置

发布后，获取 MCP 配置：

```json
{
  "mcpServers": {
    "your_agent_name": {
      "url": "https://api.example.com/mcp/your-agent/sse?token=YOUR_TOKEN"
    }
  }
}
```

---

### 其他 Agent 调用

在另一个 Agent 的 MCP 配置中添加此配置，即可调用。

---

## 应用集成

### 嵌入网页

**步骤**：
1. 选择 **"应用集成"**
2. 选择集成方式：
   - iframe 嵌入
   - JavaScript SDK
   - React 组件

---

### iframe 嵌入

**代码**：
```html
<!DOCTYPE html>
<html>
<head>
  <title>智能客服</title>
</head>
<body>
  <iframe 
    src="https://your-agent-url.com?embed=true"
    width="400px"
    height="600px"
    frameborder="0"
    style="border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  </iframe>
</body>
</html>
```

---

### JavaScript SDK

**引入 SDK**：
```html
<script src="https://cdn.example.com/agent-sdk.js"></script>
```

**初始化**：
```javascript
const agent = new AgentSDK({
  uuid: 'YOUR_AGENT_UUID',
  authKey: 'YOUR_AUTH_KEY',
  authSecret: 'YOUR_AUTH_SECRET'
});

// 发送消息
agent.send('你好').then(reply => {
  console.log(reply);
});

// 监听消息
agent.onMessage((message) => {
  console.log('收到消息:', message);
});
```

---

### React 组件

**安装**：
```bash
npm install @agent/sdk-react
```

**使用**：
```jsx
import { AgentChat } from '@agent/sdk-react';

function App() {
  return (
    <div className="App">
      <AgentChat 
        uuid="YOUR_AGENT_UUID"
        authKey="YOUR_AUTH_KEY"
        authSecret="YOUR_AUTH_SECRET"
        theme="purple"
        width="400px"
        height="600px"
      />
    </div>
  );
}
```

---

## 发布最佳实践

### 1. 版本管理

**建议**：
- 保留测试版本
- 发布正式版本
- 标注版本号
- 记录更新日志

---

### 2. 访问控制

**建议**：
- 设置访问密码
- 限制访问频率
- 监控使用情况
- 定期更新密钥

---

### 3. 性能优化

**优化方向**：
- 简化 Agent 流程
- 减少不必要的模块
- 缓存常用结果
- 优化响应速度

---

### 4. 安全考虑

**安全措施**：
- 不要在代码中硬编码密钥
- 使用环境变量存储敏感信息
- 启用 HTTPS
- 设置访问白名单

---

## 常见问题

### Q1: API 调用失败？

**排查步骤**：
1. 检查 API 地址是否正确
2. 检查认证信息是否有效
3. 检查请求格式是否正确
4. 检查网络连接

---

### Q2: Http 链接无法访问？

**排查**：
1. 检查链接是否过期
2. 检查是否被禁用
3. 检查密码是否正确
4. 检查权限设置

---

### Q3: 如何实现多轮对话？

**方案**：
1. 使用 `session_id` 参数
2. 保持相同的 `session_id`
3. 服务端会保存对话上下文

**示例**：
```javascript
// 第一次对话
await agent.send('你好', { session_id: 'user-123' });

// 第二次对话（使用相同 session_id）
await agent.send('我刚才说了什么？', { session_id: 'user-123' });
```

---

### Q4: 如何处理大量请求？

**方案**：
1. 实现请求队列
2. 限流控制
3. 负载均衡
4. 缓存常见问题

---

## 使用统计

### 查看统计

在智能体发布页面，可以查看：

| 统计项 | 说明 |
|--------|------|
| 总调用次数 | API 和 Http 应用总调用次数 |
| 成功率 | 成功调用的比例 |
| 平均响应时间 | 平均响应耗时 |
| 错误类型 | 常见错误类型统计 |

---

### 数据分析

**分析维度**：
- 按时间段统计
- 按用户统计
- 按功能统计
- 错误趋势分析

---

## 相关资源

- [快速开始](../quick-start) - 创建第一个 Agent
- [模块概览](../modules/) - 了解所有模块
- [MCP 服务](./mcp) - 创建和调用 MCP

---

**最后更新**：2026-03-04
