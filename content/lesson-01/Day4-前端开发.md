# Day 4：Vibe Coding 前端开发

## 课程信息

- **日期**：第4天
- **总课时**：8课时（每课时40分钟）
- **上午**：4课时（Vibe Coding入门 + 界面开发）
- **下午**：4课时（API集成 + 联调测试）
- **晚自习**：2课时（项目完善）

**前置条件**：学员已完成Pre-Lesson，熟悉opencode工具基本使用

---

## 整体目标

1. 掌握Vibe Coding开发模式
2. 使用opencode辅助完成前端界面开发
3. 实现API集成
4. 完成端到端联调

---

## 上午课程：Vibe Coding入门与界面开发

### 课时1：Vibe Coding开发模式（40分钟）

#### 学习目标
- 理解Vibe Coding的核心理念
- 掌握opencode的使用技巧
- 学会与AI协作编写代码

#### 课程内容

**1. Vibe Coding理念（10分钟）**

**什么是 Vibe Coding？**
```
传统开发：程序员手动编写每一行代码
Vibe Coding：用自然语言描述需求，AI生成代码，程序员审核调整

核心理念：
- 描述意图，而非实现细节
- AI是编程伙伴，不是工具
- 快速迭代，持续对话
```

**Vibe Coding 工作流**：
```
┌─────────────────────────────────────────────────────────────┐
│                     Vibe Coding 循环                         │
│                                                              │
│   描述需求 ──→ AI生成代码 ──→ 运行测试 ──→ 反馈调整 ──┐     │
│        ↑                                              │     │
│        └──────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

**2. opencode 使用技巧（20分钟）**

**基本使用模式**：

**模式1：从零开始创建项目**
```
用户：帮我创建一个React聊天应用，使用Vite，需要对话界面和输入框

opencode会：
1. 生成项目初始化命令
2. 创建必要的文件结构
3. 编写组件代码
4. 提供运行指令
```

**模式2：迭代优化现有代码**
```
用户：在消息列表中添加加载动画，三个点跳动的那种

opencode会：
1. 分析现有代码
2. 添加加载组件
3. 添加CSS动画
4. 集成到现有流程
```

**模式3：修复问题**
```
用户：API调用失败时没有错误提示，帮我加上

opencode会：
1. 定位API调用代码
2. 添加错误处理逻辑
3. 添加用户友好的错误提示
```

**有效沟通技巧**：
```
✅ 好的描述：
- "创建一个聊天界面，顶部有标题，中间是消息列表，底部是输入框和发送按钮"
- "消息分两种样式：用户消息靠右蓝色背景，AI消息靠左灰色背景"
- "发送消息后显示加载动画，收到回复后消失"

❌ 不好的描述：
- "做一个界面"（太模糊）
- "改一下那个东西"（不具体）
- "写个组件"（缺少上下文）
```

---

**3. MCP与Skills回顾（10分钟）**

**Day 1学过的概念在opencode中的应用**：

**MCP（Model Context Protocol）**：
- opencode通过MCP协议连接各种工具
- 文件系统、终端、Git等都通过MCP暴露

**Skills**：
- opencode内置多种技能
- 代码生成、调试、重构等
- 可以扩展自定义技能

---

### 课时2-3：使用Vibe Coding开发聊天界面（80分钟）

#### 学习目标
- 使用opencode创建React项目
- 通过对话完成界面开发
- 掌握迭代优化技巧

#### 实践任务

**1. 创建项目（15分钟）**

**任务描述**：
```
使用opencode创建一个React聊天应用项目
```

**与opencode对话示例**：
```
用户：帮我创建一个React项目，使用Vite，项目名叫power-chat-app。
      这是一个电力系统智能助手的前端，需要聊天界面。

opencode：好的，我来帮你创建项目...

[opencode执行命令]
npm create vite@latest power-chat-app -- --template react
cd power-chat-app
npm install

[opencode创建文件结构]
power-chat-app/
├── src/
│   ├── components/
│   │   ├── ChatHeader.jsx
│   │   ├── MessageList.jsx
│   │   ├── ChatInput.jsx
│   │   └── LoadingDots.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
└── package.json

opencode：项目已创建，运行 `npm run dev` 启动开发服务器
```

---

**2. 开发聊天界面（35分钟）**

**迭代开发对话示例**：

```
用户：创建聊天界面的基本布局，包含头部、消息区域、输入区域三部分

opencode：我来创建聊天界面组件...
[生成 ChatPage.jsx 和对应CSS]

---

用户：消息区域需要显示对话消息，每条消息有用户消息和AI消息两种样式

opencode：我来添加消息显示功能...
[创建 MessageItem 组件，添加用户/AI两种样式]

---

用户：输入区域需要输入框和发送按钮，按回车也能发送

opencode：我来完善输入功能...
[添加输入框、发送按钮、回车事件处理]

---

用户：添加问题建议功能，首次进入时显示4个常见问题按钮

opencode：我来添加问题建议...
[添加 SuggestionButtons 组件]

---

用户：界面需要更美观，使用蓝色作为主题色，参考微信聊天界面风格

opencode：我来优化样式...
[优化CSS，调整颜色、圆角、间距等]
```

**最终生成的代码示例**：

```jsx
// src/App.jsx - 由opencode生成
import { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import SuggestionButtons from './components/SuggestionButtons';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: '您好！我是电力智能助手，请问有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { id: Date.now(), type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // API调用将在下午实现
    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, type: 'bot', content: '这是模拟回复' };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleClear = () => {
    setMessages([
      { id: Date.now(), type: 'bot', content: '对话已清除，请问有什么可以帮您？' }
    ]);
  };

  return (
    <div className="chat-container">
      <ChatHeader onClear={handleClear} />
      <MessageList messages={messages} loading={loading} />
      {messages.length === 1 && (
        <SuggestionButtons onSelect={handleSuggestionClick} />
      )}
      <ChatInput 
        value={input} 
        onChange={setInput} 
        onSend={handleSend}
        disabled={loading}
      />
    </div>
  );
}

export default App;
```

---

**3. 添加加载动画和错误处理（20分钟）**

**与opencode对话**：
```
用户：添加加载动画，AI正在回复时显示三个跳动的点

opencode：我来创建加载动画组件...
[创建 LoadingDots.jsx 和对应CSS动画]

---

用户：添加错误处理，如果API调用失败显示友好的错误提示

opencode：我来添加错误处理...
[修改 handleSend 函数，添加 try-catch 和错误消息显示]

---

用户：添加复制消息功能，hover时显示复制按钮

opencode：我来添加复制功能...
[修改 MessageItem 组件，添加复制按钮和功能]
```

---

### 课时4：项目结构与代码审查（40分钟）

#### 学习目标
- 理解生成的代码结构
- 学会审查和调整AI生成的代码
- 掌握代码优化技巧

#### 课程内容

**1. 代码审查要点（20分钟）**

**审查清单**：
```
□ 代码结构是否清晰
□ 组件划分是否合理
□ 是否有冗余代码
□ 样式是否统一
□ 是否有潜在bug
□ 是否符合React最佳实践
```

**常见问题与修复**：

```
问题：opencode生成的代码中useState初始值不正确

用户：初始化messages的状态类型好像有问题，帮我检查一下

opencode：我来检查并修复...
[分析并修正代码]

---

问题：CSS样式命名不一致

用户：CSS类名有些是驼峰有些是中划线，统一改成中划线命名

opencode：我来统一命名风格...
[批量修改CSS类名和对应引用]
```

---

**2. 让opencode优化代码（20分钟）**

**优化对话示例**：

```
用户：代码看起来有点乱，帮我整理一下，按照最佳实践重构

opencode：我来重构代码...
1. 抽取公共逻辑到自定义Hook
2. 优化组件结构
3. 添加必要的注释
4. 统一代码风格

---

用户：帮我添加PropTypes类型检查

opencode：我来添加类型检查...
[安装prop-types，添加PropTypes定义]

---

用户：把API相关的逻辑抽离到单独的service文件

opencode：我来抽离API逻辑...
[创建 services/api.js，封装API调用函数]
```

---

## 午餐休息（90分钟）

---

## 下午课程：API集成与联调

### 课时5-6：API集成（80分钟）

#### 学习目标
- 使用opencode集成灵知平台API
- 实现完整的对话流程
- 处理各种边界情况

#### 实践任务

**1. 创建API服务（25分钟）**

**与opencode对话**：
```
用户：创建API服务文件，连接灵知平台Agent API。
      API地址是 https://api.xxx.com/agent/{uuid}，
      需要Authorization header，请求格式是POST JSON。

opencode：我来创建API服务...

// services/api.js
const API_CONFIG = {
  baseUrl: 'https://api.xxx.com/agent',
  uuid: 'your-uuid-here',
  authKey: 'your-auth-key-here'
};

export const callAgent = async (question) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.uuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.authKey}`
      },
      body: JSON.stringify({
        query: question,
        context: {}
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data.answer;
  } catch (error) {
    console.error('API调用失败:', error);
    throw error;
  }
};
```

---

**2. 集成到组件（25分钟）**

**与opencode对话**：
```
用户：把API服务集成到App组件中，替换掉模拟的延迟回复

opencode：我来集成API...

// 修改 App.jsx
import { callAgent } from './services/api';

// 修改 handleSend 函数
const handleSend = async () => {
  if (!input.trim() || loading) return;
  
  const userMessage = { id: Date.now(), type: 'user', content: input };
  setMessages(prev => [...prev, userMessage]);
  
  const userInput = input;
  setInput('');
  setLoading(true);
  
  try {
    const answer = await callAgent(userInput);
    const botMessage = { id: Date.now() + 1, type: 'bot', content: answer };
    setMessages(prev => [...prev, botMessage]);
  } catch (error) {
    const errorMessage = { 
      id: Date.now() + 1, 
      type: 'bot', 
      content: '抱歉，服务暂时不可用，请稍后重试。',
      isError: true
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setLoading(false);
  }
};
```

---

**3. 添加更多功能（30分钟）**

**与opencode对话**：
```
用户：消息自动滚动到底部

opencode：我来添加自动滚动功能...
[添加 useEffect 监听 messages 变化，滚动到底部]

---

用户：支持Markdown格式的回复内容

opencode：我来添加Markdown支持...
[安装 react-markdown，修改消息显示组件]

---

用户：添加重新发送功能，错误消息旁边显示重试按钮

opencode：我来添加重试功能...
[修改 MessageItem 组件，添加重试按钮和逻辑]

---

用户：把API配置改成环境变量，不要硬编码

opencode：我来改用环境变量...
[创建 .env 文件，修改 api.js 读取环境变量]
```

---

### 课间休息（10分钟）

---

### 课时7-8：联调测试与优化（80分钟）

#### 学习目标
- 使用opencode辅助测试
- 修复发现的问题
- 优化用户体验

#### 实践任务

**1. 功能测试（30分钟）**

**测试对话示例**：
```
用户：帮我写一个测试清单，检查所有功能是否正常

opencode：我来生成测试清单...

## 功能测试清单

### 基础功能
- [ ] 页面正常加载
- [ ] 开场白正确显示
- [ ] 问题建议按钮显示
- [ ] 输入框可正常输入

### 对话功能
- [ ] 发送消息正常显示
- [ ] AI回复正常显示
- [ ] 加载动画正常显示
- [ ] 自动滚动到底部

### API集成
- [ ] 正常请求返回正确
- [ ] 网络错误有友好提示
- [ ] 重试功能正常

### 辅助功能
- [ ] 清除对话正常
- [ ] 复制消息正常
- [ ] Markdown渲染正常

---

用户：发现一个bug，快速连续发送消息会导致重复请求

opencode：我来修复这个问题...
[添加防抖逻辑，禁用发送中的输入]
```

---

**2. 样式优化（25分钟）**

**与opencode对话**：
```
用户：界面在手机上显示有问题，帮我改成响应式布局

opencode：我来优化响应式布局...
[添加媒体查询，调整移动端样式]

---

用户：添加深色模式支持

opencode：我来添加深色模式...
[添加主题切换功能，定义深色模式样式]

---

用户：加载动画改成更优雅的骨架屏效果

opencode：我来创建骨架屏组件...
[创建 Skeleton 组件，替换加载动画]
```

---

**3. 打包部署（25分钟）**

**与opencode对话**：
```
用户：项目准备好了，帮我打包，并说明如何部署

opencode：我来帮你打包...

# 打包命令
npm run build

# 打包后文件
dist/
├── index.html
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css

# 部署方式
1. 静态托管（Vercel、Netlify）
2. 公司内网Nginx服务器
3. 云平台对象存储

---

用户：帮我配置Vercel部署

opencode：我来创建Vercel配置...
[创建 vercel.json，提供部署步骤]
```

---

## 晚自习：项目完善（2课时）

### 课时1：功能完善（40分钟）

**任务**：
- 根据测试反馈继续与opencode对话修复问题
- 添加额外功能（如历史记录、导出对话等）
- 优化界面细节

**与opencode协作**：
```
用户：添加本地存储，保存最近的对话历史

opencode：我来实现本地存储...
[使用 localStorage 保存和读取对话历史]

---

用户：添加导出对话功能，可以导出为文本文件

opencode：我来添加导出功能...
[添加导出按钮，生成文本文件下载]
```

---

### 课时2：文档准备与演示准备（40分钟）

**与opencode协作生成文档**：
```
用户：帮我生成项目README文档

opencode：我来生成README...

# 电力智能助手前端

## 项目简介
基于React的电力系统智能助手前端界面，使用Vibe Coding模式开发。

## 功能特性
- 对话式交互界面
- 知识库问答
- Markdown渲染
- 本地历史记录
- 导出对话

## 技术栈
- React 18
- Vite
- react-markdown

## 快速开始
npm install
npm run dev

## 部署
npm run build
# 将dist目录部署到服务器
```

---

## Day 4 总结

### 今日收获

**理论知识**：
- ✅ 理解Vibe Coding开发模式
- ✅ 掌握opencode使用技巧
- ✅ 学会与AI协作开发

**实践成果**：
- ✅ 使用Vibe Coding完成前端开发
- ✅ 实现API集成
- ✅ 完成端到端联调

### 明日预告

**Day 5 内容**：
- 8:30-9:30：项目准备完善
- 9:30-11:30：项目展示（12组 × 10分钟）
- 14:30-15:00：培训总结

**需要准备**：
- 完成项目最终测试
- 准备演示环境
- 准备5分钟演示内容

---

## 附录

### A. Vibe Coding 最佳实践

**1. 描述需求的技巧**
```
✅ 具体：描述功能、样式、交互
✅ 渐进：从简单开始，逐步迭代
✅ 明确：说明不想要的和想要的
✅ 上下文：提供必要的背景信息
```

**2. 迭代优化流程**
```
1. 先让AI生成基础版本
2. 运行测试
3. 描述问题让AI修复
4. 重复直到满意
```

**3. 代码审查要点**
```
□ 理解AI生成的每一行代码
□ 检查是否符合团队规范
□ 测试边界情况
□ 确认可维护性
```

### B. 常用opencode提示词

**创建组件**：
```
创建一个[组件名]组件，功能是[描述]，props包括[列表]
```

**修复问题**：
```
[描述问题现象]，帮我检查并修复
```

**优化代码**：
```
这段代码[描述问题]，帮我按照[最佳实践/某种模式]重构
```

**添加功能**：
```
在[现有功能]基础上，添加[新功能]，要求[具体描述]
```

### C. 各选题前端功能参考

**智能问数**：
- 查询输入框
- 结果展示（表格/图表）
- 图表导出功能

**智能写作**：
- 文档类型选择
- 富文本编辑器
- 模板选择面板
- 导出Word/PDF

**工单处理**：
- 工单列表
- 工单详情
- AI分析面板
- 处理状态跟踪

---

**文档版本**：v1.1  
**更新日期**：2024年3月2日  
**更新内容**：改为Vibe Coding模式，使用opencode辅助开发
**适用对象**：国网四川电力人工智能种子团队培训
