---
title: "Day 3：Agent优化与发布"
description: "Agent性能优化、高级模块使用、API发布"
outline: deep
lastUpdated: 2026-03-04
prev: /lesson-01/day2-agent-dev
next: /lesson-01/day4-frontend
---

# Day 3：Agent完善与优化

## 课程信息

- **日期**：第3天
- **总课时**：8课时（每课时40分钟）
- **上午**：4课时（高级功能）
- **下午**：4课时（优化与发布）
- **晚自习**：2课时（中期检查）

---

## 整体目标

1. 掌握高级模块（循环、代码块、多智能体）
2. 完成Agent功能优化
3. 发布API供前端调用
4. 通过中期检查

---

## 上午课程：高级功能

### 课时1-2：循环与代码块（80分钟）

#### 学习目标
- 掌握循环模块的使用方法
- 能够使用代码块进行数据处理
- 理解高级场景的编排方式

#### 课程内容

**1. 循环模块（40分钟）**

**功能**：用于循环流程，处理数组类型数据

**模块结构**：
```
┌─────────────────────────┐
│  循环                    │
│  ○ 联动激活              │
│  ○ 任一激活              │
│  ○ 信息输入（数组类型）  │
│                         │
│  [元素序号]              │  <span v-pre>{{xxxx.index}}</span> │
│  [元素值]                │  <span v-pre>{{xxxx.item}}</span> │
│  [数组长度]              │  <span v-pre>{{xxxx.length}}</span> │
│                         │
│  ○ 循环单元终点          │
│                         │
│     ○ 循环单元起点       │
│     ○ 模块运行结束       │
└─────────────────────────┘
```

**参数说明**：
| 参数 | 类型 | 说明 |
|------|------|------|
| 信息输入 | 任意类型数组 | 循环输入需为数组 |
| 元素序号 | - | 记录第n次，<span v-pre>{{xxxx.index}}</span> |
| 元素值 | - | 某个元素，<span v-pre>{{xxxx.item}}</span> |
| 数组长度 | - | 数组长度，<span v-pre>{{xxxx.length}}</span> |
| 循环单元终点 | 布尔型 | 连接最后一个模块的"运行结束" |
| 循环单元起点 | 布尔型 | 触发循环开始 |

**使用场景**：
- 批量处理多个文档
- 遍历查询结果
- 循环调用API

**案例：批量文档审查**
```
流程：
用户上传多个文档 → 循环 → 
  ├─ 文档审查（处理单个文档）
  └─ 循环单元终点 → 汇总结果 → 回复

代码块中引用：
- 当前序号：<span v-pre>{{2d3aa4ef.index}}</span>
- 当前文档：<span v-pre>{{2d3aa4ef.item}}</span>
- 总长度：<span v-pre>{{2d3aa4ef.length}}</span>
```

---

**2. 代码块模块（40分钟）**

**功能**：通过JavaScript或Python代码进行数据处理

**模块结构**：
```
┌─────────────────────────┐
│  代码块                  │
│  ○ 联动激活              │
│  ○ 任一激活              │
│  + 添加入参              │
│  ◉ javascript ○ python  │
│  [代码描述]              │
│  [代码内容]              │
│  + 添加出参              │
│                         │
│     ○ 执行成功          │
│     ○ 执行异常          │
│     ○ 执行结果          │
│     ○ 模块运行结束      │
└─────────────────────────┘
```

**参数说明**：
| 参数 | 类型 | 说明 |
|------|------|------|
| 添加入参 | 多种类型 | 布尔/字符串/知识库结果 |
| 语言选择 | - | JavaScript或Python |
| 代码描述 | - | 备注，非必填 |
| 代码内容 | - | Python函数名需为userFunction |
| 添加出参 | 多种类型 | 设定出参信息 |

**Python示例**：
```python
def userFunction(param):
    # param是入参的字典
    input_text = param['input_key']
    
    # 处理逻辑
    result = {
        'output_key': input_text.upper(),
        'length': len(input_text)
    }
    
    return result
```

**JavaScript示例**：
```javascript
function userFunction(param) {
    var input1 = param['input_key'];
    var result = {};
    
    // 处理逻辑
    result['output_key'] = input1.toUpperCase();
    result['length'] = input1.length;
    
    return result;
}
```

**使用场景**：
- 复杂数据转换
- 数学计算
- 字符串处理
- JSON解析/生成

**案例：数据格式化**
```
场景：将API返回的JSON数据格式化

入参：api_response（字符串）
代码：
def userFunction(param):
    import json
    data = json.loads(param['api_response'])
    
    # 提取需要的字段
    result = {
        'formatted': f"姓名：{data['name']}, 年龄：{data['age']}",
        'count': len(data['items'])
    }
    return result

出参：formatted（字符串）、count（数字）
```

---

### 课间休息（10分钟）

---

### 课时3：多智能体联动（40分钟）

#### 学习目标
- 理解多智能体的概念
- 掌握子智能体的调用方式
- 能够设计多智能体协作流程

#### 课程内容

**1. 多智能体概述**

**概念**：
- 主智能体：协调调度
- 子智能体：专门功能

**优势**：
- 模块化设计
- 功能复用
- 便于维护

---

**2. 子智能体构成与规则**

**核心组件**：
- 基础模块（用户提问、智能对话等）
- **Agent对话结束模块**（必须）

**关键限制**：
- 每个子智能体仅允许包含一个"Agent对话结束"模块
- 只有引入此模块，才能在"规划"画布左侧"Agents"处找到此Agent

---

**3. Agent对话结束模块**

**功能**：用于多Agents联动场景，实现跨Agent引用

**参数**：
| 参数 | 说明 |
|------|------|
| 展示确认弹窗 | 开启后弹出提示框与用户确认下一步 |
| 子Agent运行结束后确认 | 设定弹窗提问话术 |
| 重新执行母Agent | 重新执行的话术 |
| 满意，继续执行母Agent | 继续执行的话术 |
| 不满意，重新执行子Agent | 重新执行的话术 |

**输出**：
- 满意 → 继续执行母Agent
- 不满意 → 重新执行子Agent

---

**4. 多智能体案例**

**案例：SEO文章生成系统**
```
主智能体：SEO文章生成
├─ 子智能体1：SEO文章生成-2确认标题
├─ 子智能体2：SEO文章生成-3参考文章提炼
├─ 子智能体3：SEO文章生成-4收集资料需求
└─ 子智能体4：SEO文章生成-1主题生成

流程：
用户输入主题 → 子智能体1确认标题 → 
子智能体4生成主题 → 子智能体3提炼参考 → 
子智能体2收集资料 → 智能对话生成文章 → 回复
```

---

### 课时4：分组开发（40分钟）

#### 实践任务

**任务1：添加高级功能（20分钟）**
- 根据需求添加循环/代码块
- 或拆分为多智能体

**任务2：测试优化（20分钟）**
- 测试新增功能
- 优化流程
- 准备下午发布

---

## 午餐休息（90分钟）

---

## 下午课程：优化与发布

### 课时5-6：Agent优化（80分钟）

#### 学习目标
- 掌握Agent优化方法
- 提升回复质量
- 优化响应速度

#### 课程内容

**1. 回复质量优化（30分钟）**

**优化方向**：
1. **提示词优化**
   - 明确角色定位
   - 详细说明任务
   - 提供示例

2. **知识库优化**
   - 调整相似度阈值
   - 优化召回数
   - 开启重排序

3. **上下文优化**
   - 设置合适的聊天上下文条数
   - 避免上下文过长

**优化技巧**：
```
提示词优化前：
"你是一个助手，回答用户问题"

提示词优化后：
"你是国网四川电力的智能客服助手，专门回答电力业务相关问题。
回答要求：
1. 准确引用知识库内容
2. 语言简洁明了
3. 如遇不确定问题，引导用户咨询人工客服"
```

---

**2. 响应速度优化（20分钟）**

**优化方法**：
1. **减少不必要的模块**
   - 移除未使用的模块
   - 简化流程

2. **优化知识库检索**
   - 降低召回数（如从20降到10）
   - 谨慎使用重排序（消耗较大）

3. **调整模型**
   - 选择响应更快的模型
   - 降低回复字数上限

---

**3. 用户体验优化（30分钟）**

**优化方向**：
1. **对话引导**
   - 设置问题建议（3-6个）
   - 设计友好的开场白

2. **错误处理**
   - 添加异常流程
   - 提供友好的错误提示

3. **回复格式**
   - 使用结构化回复
   - 适当使用换行和分隔符

**案例**：
```
优化前：
"根据查询结果高新区用电量最高是850MW其次是天府新区820MW..."

优化后：
"📊 用电查询结果：

1. 高新区：850MW
2. 天府新区：820MW
3. 锦江区：780MW

数据来源：用电管理系统
更新时间：2024-03-01"
```

---

### 课间休息（10分钟）

---

### 课时7-8：API发布与测试（80分钟）

#### 学习目标
- 掌握API发布流程
- 获取API调用凭证
- 测试API调用

#### 课程内容

**1. 发布流程（20分钟）**

**步骤**：
1. 点击右上角"···" → "发布"
2. 进入发布页面
3. 选择"API服务"标签
4. 点击"创建链接"

**API服务信息**：
| 信息 | 说明 |
|------|------|
| Uuid | API唯一标识符 |
| AuthKey | 验证调用权限的密钥 |
| AuthSecret | 安全密钥（与AuthKey配合使用） |
| 创建时间 | API创建时间 |

**用户操作**：复制、刷新、删除

---

**2. API调用方法（30分钟）**

**请求格式**：
```
POST https://api.xxx.com/agent/{uuid}
Content-Type: application/json
Authorization: Bearer {AuthKey}

{
  "query": "用户问题",
  "context": {}
}
```

**响应格式**：
```json
{
  "code": 200,
  "data": {
    "answer": "Agent回复内容",
    "trace_id": "追踪ID"
  }
}
```

---

**3. 前端调用示例（30分钟）**

**React示例**：
```javascript
// API调用配置
const API_CONFIG = {
  baseUrl: 'https://api.xxx.com/agent',
  uuid: 'your-uuid-here',
  authKey: 'your-auth-key-here'
};

// 调用函数
const callAgent = async (question) => {
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
    
    const result = await response.json();
    return result.data.answer;
  } catch (error) {
    console.error('API调用失败:', error);
    throw error;
  }
};

// 使用示例
const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = async () => {
    const result = await callAgent(question);
    setAnswer(result);
  };
  
  return (
    <div>
      <input 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="输入问题"
      />
      <button onClick={handleSubmit}>发送</button>
      <div>{answer}</div>
    </div>
  );
};
```

---

## 晚自习：中期检查（2课时）

### 课时1：各组展示（40分钟）

**展示内容**（每组5分钟）：
- Agent功能演示
- API调用测试
- 遇到的问题

**检查标准**：
- [ ] Agent能正常运行
- [ ] 核心功能已实现
- [ ] API已发布并可调用
- [ ] 前端已能调用API

---

### 课时2：问题修复与优化（40分钟）

**任务**：
- 修复检查中发现的问题
- 根据反馈优化
- 准备明日前端开发

---

## Day 3 总结

### 今日收获

**理论知识**：
- ✅ 掌握循环、代码块、多智能体
- ✅ 理解Agent优化方法
- ✅ 熟悉API发布流程

**实践成果**：
- ✅ 完成Agent高级功能
- ✅ 发布API
- ✅ 通过中期检查

### 明日预告

**Day 4 内容**：
- 上午：React界面开发
- 下午：API集成与调试
- 晚自习：项目完善

**需要准备**：
- 确保API正常调用
- 准备前端开发环境
- 设计界面原型

---

**文档版本**：v1.0  
**编制日期**：2024年
