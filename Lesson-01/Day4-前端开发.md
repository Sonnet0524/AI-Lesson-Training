# Day 4：前端开发

## 课程信息

- **日期**：第4天
- **总课时**：8课时（每课时40分钟）
- **上午**：4课时（React界面开发）
- **下午**：4课时（API集成）
- **晚自习**：2课时（项目完善）

---

## 整体目标

1. 掌握React基础开发
2. 完成前端界面开发
3. 实现API集成
4. 完成端到端联调

---

## 上午课程：React界面开发

### 课时1：React快速入门（40分钟）

#### 学习目标
- 理解React核心概念
- 掌握组件结构
- 能够创建简单组件

#### 课程内容

**1. React核心概念（15分钟）**

**组件**：
```javascript
// 函数组件
function Welcome({ name }) {
  return <h1>你好，{name}</h1>;
}
```

**Props**：
```javascript
// 父组件传递props
<Welcome name="张三" />

// 子组件接收props
function Welcome({ name }) {
  return <h1>你好，{name}</h1>;
}
```

**State**：
```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      点击次数：{count}
    </button>
  );
}
```

---

**2. 项目结构（15分钟）**

```
my-app/
├── src/
│   ├── components/       # 可复用组件
│   │   ├── Header.js
│   │   ├── ChatInput.js
│   │   └── ChatMessage.js
│   ├── pages/           # 页面组件
│   │   └── Home.js
│   ├── services/        # API服务
│   │   └── api.js
│   ├── App.js           # 根组件
│   └── index.js         # 入口文件
├── public/
└── package.json
```

---

**3. 创建第一个组件（10分钟）**

```javascript
// src/components/Hello.js
function Hello() {
  return (
    <div className="hello">
      <h1>Hello React!</h1>
    </div>
  );
}

export default Hello;
```

```javascript
// src/App.js
import Hello from './components/Hello';

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;
```

---

### 课时2-3：聊天界面开发（80分钟）

#### 学习目标
- 完成聊天界面布局
- 实现消息列表
- 实现输入框

#### 实践任务

**1. 创建项目（15分钟）**

```bash
# 使用Vite创建React项目
npm create vite@latest my-chat-app -- --template react
cd my-chat-app
npm install
npm run dev
```

---

**2. 聊天界面布局（25分钟）**

```javascript
// src/pages/ChatPage.js
import { useState } from 'react';
import './ChatPage.css';

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: '你好，我是智能助手，有什么可以帮您？' }
  ]);
  const [input, setInput] = useState('');
  
  return (
    <div className="chat-container">
      {/* 头部 */}
      <header className="chat-header">
        <h1>智能助手</h1>
      </header>
      
      {/* 消息列表 */}
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>
      
      {/* 输入框 */}
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入您的问题..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>发送</button>
      </div>
    </div>
  );
}

export default ChatPage;
```

```css
/* src/pages/ChatPage.css */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 800px;
  margin: 0 auto;
}

.chat-header {
  padding: 20px;
  background: #1890ff;
  color: white;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin-bottom: 16px;
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.bot {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
}

.message.user .message-content {
  background: #1890ff;
  color: white;
}

.message.bot .message-content {
  background: #f0f0f0;
  color: #333;
}

.chat-input {
  display: flex;
  padding: 20px;
  border-top: 1px solid #eee;
}

.chat-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 12px;
}

.chat-input button {
  padding: 12px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

---

**3. 添加问题建议（20分钟）**

```javascript
// 添加问题建议
const suggestions = [
  '查询用电量',
  '故障报修',
  '业务咨询',
  '投诉建议'
];

function ChatPage() {
  // ... 其他代码
  
  return (
    <div className="chat-container">
      {/* ... 头部和消息列表 */}
      
      {/* 问题建议 */}
      {messages.length === 1 && (
        <div className="suggestions">
          {suggestions.map((s, index) => (
            <button 
              key={index}
              className="suggestion-btn"
              onClick={() => handleSuggestionClick(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      
      {/* 输入框 */}
      {/* ... */}
    </div>
  );
}
```

```css
.suggestions {
  padding: 16px 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #1890ff;
  color: #1890ff;
  border-radius: 16px;
  cursor: pointer;
}

.suggestion-btn:hover {
  background: #1890ff;
  color: white;
}
```

---

### 课间休息（10分钟）

---

### 课时4：加载状态与错误处理（40分钟）

#### 学习目标
- 实现加载状态
- 添加错误处理
- 提升用户体验

#### 课程内容

**1. 加载状态（20分钟）**

```javascript
function ChatPage() {
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // 添加用户消息
    const userMessage = { id: Date.now(), type: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    
    // 设置加载状态
    setLoading(true);
    
    try {
      // 调用API
      const answer = await callAgent(input);
      
      // 添加机器人回复
      const botMessage = { id: Date.now() + 1, type: 'bot', content: answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // 错误处理
      const errorMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: '抱歉，服务暂时不可用，请稍后重试。' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="chat-container">
      {/* 消息列表 */}
      <div className="message-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        
        {/* 加载指示器 */}
        {loading && (
          <div className="message bot">
            <div className="message-content loading">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          </div>
        )}
      </div>
      
      {/* 输入框 */}
      <div className="chat-input">
        <input
          disabled={loading}
          // ... 其他属性
        />
        <button disabled={loading}>发送</button>
      </div>
    </div>
  );
}
```

```css
.loading {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-dot:nth-child(1) { animation-delay: -0.32s; }
.loading-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

input:disabled, button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

---

**2. 错误处理（20分钟）**

```javascript
// src/services/api.js
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

## 午餐休息（90分钟）

---

## 下午课程：API集成与调试

### 课时5-6：API集成（80分钟）

#### 学习目标
- 完成API调用集成
- 实现完整对话流程
- 处理各种边界情况

#### 实践任务

**1. 集成API服务（30分钟）**

```javascript
// src/pages/ChatPage.js
import { callAgent } from '../services/api';

function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      content: '您好！我是智能助手，请问有什么可以帮您？' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    // 添加用户消息
    const userMessage = { 
      id: Date.now(), 
      type: 'user', 
      content: input 
    };
    setMessages(prev => [...prev, userMessage]);
    
    const userInput = input;
    setInput('');
    setLoading(true);
    
    try {
      // 调用Agent API
      const answer = await callAgent(userInput);
      
      // 添加机器人回复
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: answer 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // 错误处理
      const errorMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: '抱歉，服务暂时不可用，请稍后重试。' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // 自动发送
    setTimeout(() => handleSend(), 100);
  };
  
  // 自动滚动到底部
  useEffect(() => {
    const messageList = document.querySelector('.message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  }, [messages]);
  
  return (
    // ... 界面代码
  );
}

export default ChatPage;
```

---

**2. 添加更多功能（30分钟）**

**功能1：清除对话**
```javascript
const handleClear = () => {
  setMessages([
    { 
      id: Date.now(), 
      type: 'bot', 
      content: '对话已清除，请问有什么可以帮您？' 
    }
  ]);
};

// 在头部添加清除按钮
<header className="chat-header">
  <h1>智能助手</h1>
  <button onClick={handleClear} className="clear-btn">清除</button>
</header>
```

**功能2：复制回复**
```javascript
const handleCopy = (content) => {
  navigator.clipboard.writeText(content);
  alert('已复制到剪贴板');
};

// 在消息上添加复制按钮
<div className="message bot">
  <div className="message-content">
    {content}
    <button onClick={() => handleCopy(content)} className="copy-btn">
      📋 复制
    </button>
  </div>
</div>
```

**功能3：Markdown渲染**
```bash
npm install react-markdown
```

```javascript
import ReactMarkdown from 'react-markdown';

// 在消息内容中使用
<div className="message-content">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>
```

---

**3. 样式优化（20分钟）**

```css
/* 添加更多样式优化 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clear-btn {
  padding: 8px 16px;
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.clear-btn:hover {
  background: rgba(255,255,255,0.3);
}

.message-content {
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  font-size: 12px;
  background: rgba(0,0,0,0.1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.message-content:hover .copy-btn {
  opacity: 1;
}

/* Markdown样式 */
.message-content h1,
.message-content h2,
.message-content h3 {
  margin: 8px 0;
}

.message-content p {
  margin: 4px 0;
}

.message-content ul,
.message-content ol {
  margin: 4px 0;
  padding-left: 20px;
}

.message-content code {
  background: rgba(0,0,0,0.1);
  padding: 2px 4px;
  border-radius: 2px;
}

.message-content pre {
  background: #f6f8fa;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
}
```

---

### 课间休息（10分钟）

---

### 课时7-8：联调测试（80分钟）

#### 学习目标
- 完成端到端测试
- 修复发现的问题
- 优化用户体验

#### 实践任务

**1. 功能测试（30分钟）**

**测试清单**：
- [ ] 发送消息能正常显示
- [ ] Agent回复能正常显示
- [ ] 加载状态正常显示
- [ ] 错误处理正常
- [ ] 问题建议点击有效
- [ ] 清除对话功能正常
- [ ] 复制功能正常
- [ ] 界面响应式正常

**测试步骤**：
1. 正常对话流程
2. 快速连续发送
3. 网络异常情况
4. 长文本回复
5. 特殊字符处理

---

**2. 性能优化（25分钟）**

**优化1：消息虚拟滚动**
```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

function MessageList({ messages }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <Message message={messages[index]} />
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={messages.length}
      itemSize={100}
    >
      {Row}
    </FixedSizeList>
  );
}
```

**优化2：防抖处理**
```javascript
import { useCallback } from 'react';
import { debounce } from 'lodash';

function ChatPage() {
  const debouncedSend = useCallback(
    debounce((input) => {
      // 发送逻辑
    }, 300),
    []
  );
  
  return (
    <input
      onChange={(e) => debouncedSend(e.target.value)}
      // ...
    />
  );
}
```

---

**3. 打包部署（25分钟）**

**打包**：
```bash
npm run build
```

**本地预览**：
```bash
npm run preview
```

**部署选项**：
1. 静态托管（Vercel、Netlify）
2. 公司内网服务器
3. 云平台（阿里云、腾讯云）

---

## 晚自习：项目完善（2课时）

### 课时1：功能完善（40分钟）

**任务**：
- 根据测试反馈修复问题
- 添加额外功能
- 优化界面样式

**可选功能**：
- 历史记录
- 主题切换
- 导出对话
- 语音输入

---

### 课时2：文档准备（40分钟）

**准备内容**：
1. **项目说明文档**
   - 项目简介
   - 功能说明
   - 技术架构
   - 使用说明

2. **演示准备**
   - 准备演示脚本
   - 测试演示环境
   - 准备备用方案

3. **代码整理**
   - 清理无用代码
   - 添加必要注释
   - 统一代码风格

---

## Day 4 总结

### 今日收获

**理论知识**：
- ✅ 理解React核心概念
- ✅ 掌握组件开发方法
- ✅ 熟悉API集成流程

**实践成果**：
- ✅ 完成聊天界面开发
- ✅ 实现API调用集成
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

**文档版本**：v1.0  
**编制日期**：2024年
