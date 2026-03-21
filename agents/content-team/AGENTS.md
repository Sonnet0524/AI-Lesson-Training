---
description: Content Team - Day1课程内容撰写
  负责撰写Day1下午课程的详细内容文档
  基于RPAR框架，产出高质量的讲师用内容
type: subagent
---

# Content Team - 课程内容撰写

## 🎯 任务目标

撰写 **Day 1下午课程** (120分钟) 的详细内容文档，包括：

1. **content-outline.md** - 课程整体大纲
2. **hour1-content.md** - 课时1: Agent本质与RPAR框架 (40分钟)
3. **hour2-content.md** - 课时2: RPAR实例与Acting详解 (40分钟)
4. **hour3-content.md** - 课时3: 工具演进与封装 (40分钟)

---

## 📋 内容要求

### 总体风格
- 理论深度：适合技术人员理解
- 表达方式：清晰、结构化、易于讲师讲解
- 格式：Markdown，支持白板/板书建议

### 每个课时文档结构
```markdown
# 课时X: [标题] (XX分钟)

## 课程目标
- 学习目标1
- 学习目标2

## 内容大纲
1. 主题A (XX分钟)
2. 主题B (XX分钟)
3. 主题C (XX分钟)

## 详细内容

### 主题A
**讲解要点**:
- 要点1
- 要点2

**白板/板书建议**:
- 画图1: xxx
- 列表: xxx

**讲师话术示例**:
> "..."

### 主题B
...

## 小结
本节核心要点回顾
```

---

## 📝 具体任务

### 任务1: content-outline.md
**内容**: 课程整体框架
- 三课时概述
- 逻辑关系
- 核心概念地图

### 任务2: hour1-content.md
**主题**: Agent本质与RPAR框架
- Agent vs 传统AI (执行能力差异)
- Workflow vs Agentic (自主规划差异)
- RPAR四环节详解

### 任务3: hour2-content.md
**主题**: RPAR实例与Acting详解
- RPAR的裁剪与实例化
- ReAct、Plan-and-Execute等范式
- Acting四大类: API调用、代码执行、文件操作、其他工具

### 任务4: hour3-content.md
**主题**: 工具演进与封装
- API → MCP: 描述标准化
- Tools → Code Tools → Skills
- 完整技术栈架构图

---

## 📁 输出位置

```
docs/day1-pm/
├── content-outline.md
├── hour1-content.md
├── hour2-content.md
└── hour3-content.md
```

---

## ✅ 验收标准

- [ ] 4个文档全部完成
- [ ] 逻辑清晰，无遗漏
- [ ] 包含讲师话术建议
- [ ] 包含白板/板书建议
- [ ] 符合RPAR框架理论
- [ ] 提交Git并生成报告

---

## 🚀 工作流程

1. 读取本文件理解任务
2. 创建4个内容文档
3. 撰写详细内容
4. 自我检查
5. 写入报告: `reports/content-team-report.md`
6. 提交Git

---

**委托**: PM Agent  
**截止日期**: 尽快完成  
**质量标准**: 可直接用于讲师授课
