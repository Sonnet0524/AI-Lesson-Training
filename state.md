# AI 种子团队培训课程 - 项目状态

**最后更新**：2026年3月3日
**版本**：v1.1
**当前阶段**：培训准备阶段

---

## 一、项目概述

**项目名称**：国网四川电力人工智能种子团队 Agentic AI 培训课程

**目标**：创建完整的 5 天培训课程，包括课程内容设计、HTML 页面开发、GitHub Pages 部署

**GitHub Pages**：https://sonnet0524.github.io/AI-Lesson-Training/

---

## 二、已完成任务

### 2.1 课程内容设计

| 文档 | 路径 | 状态 |
|------|------|------|
| Day 1 课程 | `Lesson-01/Day1-AgenticAI与ReAct模式.md` | ✅ 完成 |
| Day 2 课程 | `Lesson-01/Day2-Agent开发实战.md` | ✅ 完成 |
| Day 3 课程 | `Lesson-01/Day3-Agent优化与发布.md` | ✅ 完成 |
| Day 4 课程 | `Lesson-01/Day4-前端开发.md` | ✅ 完成 |
| Day 5 课程 | `Lesson-01/Day5-项目展示与总结.md` | ✅ 完成 |
| Pre-Lesson 总览 | `Pre-Lesson/README.md` | ✅ 完成 |
| Pre-Lesson 第1次 | `Pre-Lesson/Pre-Lesson-01-灵知平台入门.md` | ✅ 完成 |
| Pre-Lesson 第2次 | `Pre-Lesson/Pre-Lesson-02-核心模块与编排.md` | ✅ 完成 |
| Pre-Lesson 第3次 | `Pre-Lesson/Pre-Lesson-03-VibeCoding环境准备.md` | ✅ 完成 |

### 2.2 HTML 交互页面

| 页面 | 路径 | 状态 |
|------|------|------|
| 课程主页 | `index.html` | ✅ 完成 |
| Day 1 详情 | `pages/day1.html` | ✅ 完成（含 ReAct 流程图） |
| Day 2 详情 | `pages/day2.html` | ✅ 完成（含编排模式流程图） |
| Day 3 详情 | `pages/day3.html` | ✅ 完成（含多智能体流程图） |
| Day 4 详情 | `pages/day4.html` | ✅ 完成（含 Vibe Coding 工作流） |
| Day 5 详情 | `pages/day5.html` | ✅ 完成 |
| Pre-Lesson 主页 | `pages/prelesson.html` | ✅ 完成 |
| Pre-Lesson 第1次 | `pages/prelesson-01.html` | ✅ 完成 |
| Pre-Lesson 第2次 | `pages/prelesson-02.html` | ✅ 完成 |
| Pre-Lesson 第3次 | `pages/prelesson-03.html` | ✅ 完成 |
| 技术栈详情 | `pages/tech-stack.html` | ✅ 完成 |
| 智能问数项目 | `pages/project-smart-query.html` | ✅ 完成 |
| 智能写作项目 | `pages/project-smart-writing.html` | ✅ 完成 |
| 工单处理项目 | `pages/project-work-order.html` | ✅ 完成 |

### 2.3 项目设计文档

| 项目 | 路径 | 状态 |
|------|------|------|
| 智能问数 | `projects/智能问数-项目设计.md` | ✅ 完成 |
| 智能写作 | `projects/智能写作-项目设计.md` | ✅ 完成 |
| 工单处理 | `projects/工单处理-项目设计.md` | ✅ 完成 |

### 2.4 参考文档

| 文档 | 路径 | 状态 |
|------|------|------|
| 技术栈与关键信息 | `docs/技术栈与关键信息.md` | ✅ 完成 |
| 灵知平台完整文档 | `reference/docs/灵知平台完整文档.md` | ✅ 完成 |
| 参考图片 | `reference/images/` | ✅ 已导入（200 张） |

### 2.5 Git 提交记录

共 **20+** 次提交，最近一次：
```
a923746 更新TODO-006状态和资源文档规划
```

---

## 三、关键设计决策

### 3.1 课程结构调整

- **原设计**：Day 2 包含 Pre-Lesson 内容
- **现设计**：Pre-Lesson 独立为 3 次直播课程（每次 90 分钟）
- **Day 2**：改为 Catch up 模式，帮助学员追赶进度

### 3.2 Pre-Lesson 设计

- **第1次直播**（Day 1 前 3 天）：灵知平台入门
- **第2次直播**（Day 1 前 2 天）：核心模块与编排
- **第3次直播**（Day 1 前 1 天）：Vibe Coding 环境准备

每次：授课 60 分钟 + 交流 30 分钟

### 3.3 Day 4 技术方案

- 整个 Day 4 使用 **opencode** 工具进行 Vibe Coding 辅助开发
- Skills 和 MCP 概念用于 opencode，不是灵知平台概念

### 3.4 Day 5 时间安排

- 08:30-09:30：项目准备
- 09:30-11:30：项目展示（12 组 × 10 分钟）
- 14:30-15:00：培训总结
- 15:00：正式结束
- **无颁奖环节**

### 3.5 HTML 页面规范

- 所有流程图使用前端 CSS/HTML 绘制，不使用纯文本
- 代码块需要正确的换行显示
- 页面标题使用中文
- 所有链接使用相对路径

---

## 四、灵知平台核心信息

### 4.1 核心模块

1. **用户提问** - 输入入口
2. **智能对话** - LLM 交互
3. **信息分类** - 文本分类
4. **信息提取** - 结构化提取
5. **知识库搜索** - RAG 检索

### 4.2 节点类型

| 颜色 | 类型 | 说明 |
|------|------|------|
| 黄色 | 布尔型 | true/false |
| 蓝色 | 字符串 | 文本 |
| 紫色 | 知识库结果 | 检索结果 |
| 红色 | 任意类型 | 灵活类型 |

### 4.3 参数建议值

- **相似度阈值**：0.5-0.7
- **召回数**：3-10
- **重排序**：谨慎使用（消耗大）
- **聊天上下文**：2-5 条
- **回复创意性**：0-0.5（高准确）/ 0.5-0.8（高创意）
- **回复字数上限**：500-2000

---

## 五、待办事项

### 5.1 高优先级（P0 - 培训前必须完成）

**业务场景类**：
- [ ] TODO-001：业务场景重新梳理（截止：Pre-Lesson前）
- [ ] TODO-002：模拟接口设计（截止：Day 1前，依赖TODO-001）
- [ ] TODO-003：模拟接口开发与部署（截止：Day 2前，依赖TODO-002）

**环境验证类**：
- [x] TODO-004：OpenCode环境验证（✅ 已完成 2026-03-03）
- [x] TODO-005：Trae-cn信息补充（✅ 已完成 2026-03-03）
- [x] TODO-006：灵知平台Qwen模型验证（✅ 已完成 2026-03-03）

**文档准备类**：
- [ ] TODO-007：知识库文档收集（截止：Pre-Lesson第2次前，等待国网四川提供）
- [x] TODO-008：Pre-Lesson课件完善（✅ 已完成 2026-03-03）

### 5.2 中优先级（P1）

- [ ] TODO-009：Day 2-3实操手册
- [ ] TODO-010：ReAct编排示例
- [ ] TODO-011：协作指导文档
- [ ] TODO-012：灵知平台账号批量创建
- [ ] TODO-013：OpenCode/Trae账号准备

### 5.3 低优先级（P2 - 扩展方向）

- [ ] TODO-014：React项目模板（可选）
- [ ] TODO-015：培训PPT制作（可选）
- [ ] TODO-016：学员手册PDF（可选）
- [ ] 添加更多项目案例
- [ ] 录制课程视频
- [ ] 移动端页面适配优化

**详细任务信息**：参见 `Lesson-01/TODO/TODO-P0-高优先级.md`

---

## 六、文件目录结构

```
AI-Lesson-Training/
├── index.html                    # 交互式课程展示主页
├── AGENT.md                      # AI 助手工作指南
├── state.md                      # 项目状态文档（本文件）
├── catch-up.md                   # 快速恢复指南
├── README.md                     # 项目说明
├── reference/
│   ├── docs/
│   │   └── 灵知平台完整文档.md   # 平台完整文档
│   └── images/                   # PDF 转换图片（200 张）
├── pages/
│   ├── day1.html - day5.html     # Day 1-5 课程详情
│   ├── prelesson.html            # Pre-Lesson 主页
│   ├── prelesson-01~03.html      # Pre-Lesson 三次直播
│   ├── tech-stack.html           # 技术栈详情
│   ├── project-smart-query.html  # 智能问数项目
│   ├── project-smart-writing.html# 智能写作项目
│   └── project-work-order.html   # 工单处理项目
├── Lesson-01/
│   ├── Day1~Day5 课程 Markdown 文档
│   └── README.md
├── Pre-Lesson/
│   ├── Pre-Lesson-01~03 Markdown 文档
│   └── README.md
├── docs/
│   └── 技术栈与关键信息.md
└── projects/
    ├── 智能问数-项目设计.md
    ├── 智能写作-项目设计.md
    └── 工单处理-项目设计.md
```

---

## 七、Git 信息

- **仓库**：https://github.com/Sonnet0524/AI-Lesson-Training
- **主分支**：main
- **提交规范**：使用中文描述
- **最后提交**：a923746（2026-03-03 15:59）
- **提交次数**：20+
- **工作目录**：D:\AI-Lesson

---

## 八、联系信息

如有问题，请查看：
- `AGENT.md` - AI 助手工作规范
- `catch-up.md` - 快速恢复工作指南
- `Lesson-01/TODO/TODO-总览.md` - 任务总览
- `Lesson-01/TODO/TODO-P0-高优先级.md` - 高优先级任务详情
