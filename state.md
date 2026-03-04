# AI 种子团队培训课程 - 项目状态

**最后更新**：2026年3月4日
**版本**：v1.2
**当前阶段**：培训准备阶段

---

## 一、项目概述

**项目名称**：国网四川电力人工智能种子团队 Agentic AI 培训课程

**目标**：创建完整的 5 天培训课程，包括课程内容设计、站点开发、GitHub Pages 部署

**当前阶段**：VitePress 站点重构（2026-03-05 启动）

**GitHub Pages**：https://sonnet0524.github.io/AI-Lesson-Training/

**迁移计划**：`VITEPRESS-MIGRATION-PLAN.md`

**重构目标**：
- 使用 VitePress 替代纯 HTML，提升可维护性
- 添加全文搜索功能
- 支持 Mermaid 流程图
- 自动同步 content/ 到 docs/
- 重构灵知平台使用指南

**重构计划**：见 `VITEPRESS-MIGRATION-PLAN.md`

**重构目标**：
- 使用 VitePress 替代纯 HTML，提升可维护性
- 添加全文搜索功能
- 支持 Mermaid 流程图
- 自动同步 content/ 到 docs/
- 保留原有内容结构，优化访问体验

**当前阶段**：VitePress 站点重构（第 1 阶段）
**重构目标**：将纯 HTML 站点迁移至 VitePress，提升可维护性并添加搜索功能
**重构计划**：见 `VITEPRESS-MIGRATION-PLAN.md`（20天，2026-03-05 至 2026-03-24）

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

### 5.0 VitePress 站点重构（新增项目）

**时间**：2026-03-05 至 2026-03-24（20天）  
**状态**：🚀 已启动  
**详细计划**：`VITEPRESS-MIGRATION-PLAN.md`

- [ ] **阶段 1**：基础架构搭建（03-05 至 03-06）
  - [ ] 初始化 VitePress 项目
  - [ ] 创建目录结构
  - [ ] 编写同步脚本
  - [ ] 配置 GitHub Actions

- [ ] **阶段 2**：内容迁移（03-07 至 03-09）
  - [ ] 迁移课程文档到 content/
  - [ ] 添加 Frontmatter
  - [ ] 测试同步功能

- [ ] **阶段 3**：平台指南重构（03-10 至 03-14）
  - [ ] 迁移 reference/ 到 platform-docs/
  - [ ] 拆分平台指南为 17+ 文档
  - [ ] 添加 Mermaid 流程图

- [ ] **阶段 4**：样式定制（03-15 至 03-17）
  - [ ] 配置紫色渐变主题
  - [ ] 配置导航和搜索
  - [ ] 移动端优化

- [ ] **阶段 5**：测试部署（03-18 至 03-20）
  - [ ] 全面测试
  - [ ] 部署到 GitHub Pages
  - [ ] 删除旧 HTML 文件

- [ ] **阶段 6**：文档完善（03-21 至 03-22）
  - [ ] 编写 CONTENT-GUIDE.md
  - [ ] 更新项目文档

- [ ] **阶段 7**：缓冲期（03-23 至 03-24）
  - [ ] 最终检查
  - [ ] 培训前部署

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

- [ ] TODO-009：Day 2-3实操手册（依赖TODO-003）
- [x] TODO-010：ReAct设计思路文档 v2.1（✅ 已完成 2026-03-04）
- [x] TODO-011：协作指导文档（✅ 已完成 2026-03-03）
- [x] TODO-012：灵知平台账号批量创建（✅ 已完成 2026-03-03）
- [x] TODO-013：OpenCode/Trae账号准备（❌ 已取消，不需要）
- [x] TODO-017：Gitee使用指南（✅ 已完成 2026-03-03）

### 5.3 低优先级（P2 - 扩展方向）

- [ ] TODO-014：React项目模板（可选）
- [ ] TODO-015：培训PPT制作（可选）
- [x] TODO-016：学员手册（✅ 已完成 2026-03-03，Markdown + PDF + HTML）
- [ ] 添加更多项目案例
- [ ] 录制课程视频
- [ ] 移动端页面适配优化

**详细任务信息**：参见 `Lesson-01/TODO/TODO-P0-高优先级.md`

---

## 六、文件目录结构

### 当前结构（迁移中）

```
AI-Lesson/
├── 📘 docs/                          # VitePress 站点（学员访问）⭐新增
│   ├── .vitepress/
│   ├── index.md
│   ├── pre-lesson/
│   ├── lesson-01/
│   ├── projects/
│   ├── platform-guide/               # 灵知平台使用指南
│   └── resources/
│
├── 📁 content/                       # 课程内容源文件（保留原名）⭐新增
│   ├── pre-lesson/
│   ├── lesson-01/
│   │   ├── Day1~Day5 课程 Markdown
│   │   ├── TODO/                     # 内部管理
│   │   └── resources/                # 培训资源
│   └── projects/
│
├── 📁 platform-docs/                 # 灵知平台原始文档 ⭐新增
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                       # 同步和构建脚本 ⭐新增
│   ├── sync-content.js
│   └── filename-mapping.json
│
├── 📄 index.html                     # 旧课程主页（待删除）
├── 📄 AGENT.md
├── 📄 state.md                       # 本文件
├── 📄 catch-up.md
├── 📄 README.md
├── 📄 VITEPRESS-MIGRATION-PLAN.md    # VitePress迁移计划 ⭐新增
├── 📄 CONTENT-GUIDE.md               # 内容编写规范 ⭐新增
│
├── 📦 package.json                   # Node.js依赖 ⭐新增
├── 🚀 .github/workflows/deploy.yml   # 自动部署 ⭐新增
│
└── 📁 archive/                       # 归档目录（旧文件）⭐新增
    ├── pages/                        # 旧 HTML 页面
    └── reference/                    # 旧 reference 目录
```

### 迁移说明
- **新站点**：VitePress 站点位于 `docs/`，支持搜索和 Mermaid
- **源文件**：课程设计文档保留在 `content/`，保持原有文件名
- **自动同步**：通过 `scripts/sync-content.js` 自动同步到 `docs/`
- **旧文件**：迁移完成后移至 `archive/`，确认无误后删除
AI-Lesson/
├── docs/                           # VitePress 站点（学员访问）⭐重构目标
│   ├── .vitepress/                 # VitePress 配置
│   ├── index.md                    # 课程首页
│   ├── pre-lesson/                 # 预授课
│   ├── lesson-01/                  # 主课程
│   ├── projects/                   # 项目设计
│   ├── platform-guide/             # 灵知平台指南 ⭐新增
│   └── resources/                  # 资源中心
│
├── content/                        # 课程内容源文件（保留原名）
│   ├── pre-lesson/
│   ├── lesson-01/
│   └── projects/
│
├── platform-docs/                  # 灵知平台原始文档 ⭐新增
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── scripts/                        # 同步和构建脚本 ⭐新增
├── .github/workflows/              # GitHub Actions 部署 ⭐新增
├── VITEPRESS-MIGRATION-PLAN.md     # VitePress 迁移计划 ⭐新增
├── AGENT.md                        # AI 助手工作指南
├── state.md                        # 项目状态文档（本文件）
├── catch-up.md                     # 快速恢复指南
└── README.md                       # 项目说明
```

### 6.2 旧结构（迁移中）

```
AI-Lesson-Training/
├── index.html                      # 课程主页（将被 docs/index.md 替代）
├── pages/                          # HTML 页面（将被 VitePress 替代）
│   ├── day1.html - day5.html
│   ├── prelesson.html
│   └── ...
├── Pre-Lesson/                     # 预授课（将迁移到 content/）
├── Lesson-01/                      # 主课程（将迁移到 content/）
├── projects/                       # 项目设计（将迁移到 content/）
├── reference/                      # 参考资料（将迁移到 platform-docs/）
└── docs/                           # 技术栈文档（将整合到 docs/resources/）
```

### 6.3 迁移说明

**正在进行**：VitePress 站点重构  
**目标**：提升可维护性，添加搜索和流程图  
**详细计划**：见 `VITEPRESS-MIGRATION-PLAN.md`  
**预计完成**：2026-03-24
AI-Lesson/
├── 📘 docs/                          # VitePress 站点（学员访问）
│   ├── .vitepress/                   # VitePress 配置
│   ├── index.md                      # 课程首页
│   ├── pre-lesson/                   # 预授课（3次直播）
│   ├── lesson-01/                    # 主课程（5天）
│   ├── projects/                     # 项目设计
│   ├── platform-guide/               # 灵知平台使用指南
│   └── resources/                    # 资源中心
│
├── 📁 content/                       # 课程内容源文件
│   ├── pre-lesson/                   # 从 Pre-Lesson/ 迁移
│   ├── lesson-01/                    # 从 Lesson-01/ 迁移
│   └── projects/                     # 从 projects/ 迁移
│
├── 📁 platform-docs/                 # 灵知平台原始文档
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                       # 同步和构建脚本
├── 📦 package.json                   # Node.js 依赖
├── 🚀 .github/workflows/deploy.yml   # GitHub Actions 部署
├── 📋 VITEPRESS-MIGRATION-PLAN.md    # 迁移实施计划
└── 📖 CONTENT-GUIDE.md               # 内容编写规范
```

### 旧结构（保留参考）

```
AI-Lesson-Training/
├── index.html                    # 交互式课程展示主页
├── pages/                        # HTML 页面（将删除）
├── Lesson-01/                    # 课程文档（将迁移到 content/）
├── Pre-Lesson/                   # 预授课文档（将迁移到 content/）
├── projects/                     # 项目设计（将迁移到 content/）
├── reference/                    # 参考文档（将迁移到 platform-docs/）
└── docs/                         # 技术文档（将整合到 docs/resources/）
```
AI-Lesson/
├── 📘 docs/                          # VitePress 站点（学员访问）
│   ├── .vitepress/                   # VitePress 配置
│   ├── index.md                      # 课程首页
│   ├── pre-lesson/                   # 预授课（3次直播）
│   ├── lesson-01/                    # 主课程（5天）
│   ├── projects/                     # 项目设计
│   ├── platform-guide/               # 灵知平台使用指南
│   └── resources/                    # 资源中心
│
├── 📁 content/                       # 课程内容源文件（保留原名）
│   ├── pre-lesson/
│   ├── lesson-01/
│   │   ├── Day1-AgenticAI与ReAct模式.md
│   │   ├── ...（保持原有文件名）
│   │   ├── TODO/                     # 不同步到 docs
│   │   └── resources/                # 不同步到 docs
│   └── projects/
│
├── 📁 platform-docs/                 # 灵知平台原始文档
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                       # 同步和构建脚本
│   ├── sync-content.js
│   └── filename-mapping.json
│
├── 📦 package.json
├── 🚀 .github/workflows/deploy.yml   # 自动部署
├── 📖 CONTENT-GUIDE.md               # 内容编写规范
├── 📋 VITEPRESS-MIGRATION-PLAN.md    # 迁移实施计划
├── 📋 catch-up.md                    # 快速恢复指南
├── 📋 state.md                       # 项目状态（本文件）
└── 📋 AGENT.md                       # AI 助手工作指南
```

### 旧结构（迁移中）

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
├── pages/                        # 【将被删除】HTML 页面
├── Lesson-01/                    # 【将迁移到 content/】
├── Pre-Lesson/                   # 【将迁移到 content/】
├── docs/                         # 【将整合到 docs/resources/】
└── projects/                     # 【将迁移到 content/】
```

**迁移状态**：正在进行中，详见 `VITEPRESS-MIGRATION-PLAN.md`
AI-Lesson/
├── 📘 docs/                          # VitePress 站点（学员访问）⭐新增
│   ├── .vitepress/
│   │   ├── config.ts                 # 站点配置
│   │   └── theme/
│   │       ├── custom.css            # 紫色渐变主题
│   │       └── index.ts
│   ├── index.md                      # 课程首页
│   ├── pre-lesson/                   # 预授课（3次直播）
│   ├── lesson-01/                    # 主课程（5天）
│   ├── projects/                     # 项目设计
│   ├── platform-guide/               # 灵知平台使用指南 ⭐新增
│   └── resources/                    # 资源中心
│
├── 📁 content/                       # 课程内容源文件（保留原名）⭐新增
│   ├── pre-lesson/
│   ├── lesson-01/                    # 包含 TODO/ 和 resources/（不同步）
│   └── projects/
│
├── 📁 platform-docs/                 # 灵知平台原始文档 ⭐新增
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                       # 同步和构建脚本 ⭐新增
│   ├── sync-content.js
│   └── filename-mapping.json
│
├── 📦 package.json
├── 🚀 .github/workflows/deploy.yml
├── 📖 CONTENT-GUIDE.md               # 内容编写规范 ⭐新增
├── 📋 VITEPRESS-MIGRATION-PLAN.md    # 迁移实施计划 ⭐新增
├── 📋 catch-up.md                    # 快速恢复指南
├── 📋 state.md                       # 项目状态文档（本文件）
└── 📋 README.md                      # 项目说明
```

### 旧结构（将被清理）

```
AI-Lesson-Training/（旧）
├── index.html                    # 将被 VitePress 替代
├── pages/                        # HTML页面，将被删除
│   ├── day1.html - day5.html
│   ├── prelesson.html
│   └── ...
├── reference/                    # 将迁移到 platform-docs/
├── Lesson-01/                    # 将迁移到 content/lesson-01/
├── Pre-Lesson/                   # 将迁移到 content/pre-lesson/
├── projects/                     # 将迁移到 content/projects/
└── docs/                         # 将整合到 docs/resources/
```

**迁移状态**：进行中（第 1/7 阶段）  
**详细计划**：见 `VITEPRESS-MIGRATION-PLAN.md`
AI-Lesson-Training/
├── index.html                    # 交互式课程展示主页
├── AGENT.md                      # AI 助手工作指南
├── state.md                      # 项目状态文档（本文件）
├── catch-up.md                   # 快速恢复指南
├── README.md                     # 项目说明
├── VITEPRESS-MIGRATION-PLAN.md   # VitePress 迁移计划 ⭐新增
├── reference/
│   ├── docs/
│   │   └── 灵知平台完整文档.md   # 平台完整文档
│   └── images/                   # PDF 转换图片（200 张）
├── pages/                        # ⚠️ 将被 VitePress 替代
│   ├── day1.html - day5.html     # Day 1-5 课程详情
│   ├── prelesson.html            # Pre-Lesson 主页
│   └── ...
├── Lesson-01/
│   ├── Day1~Day5 课程 Markdown 文档
│   └── README.md
├── Pre-Lesson/
│   ├── Pre-Lesson-01~03 Markdown 文档
│   └── README.md
├── docs/                         # 将改为 VitePress 站点
│   └── 技术栈与关键信息.md
└── projects/
    ├── 智能问数-项目设计.md
    ├── 智能写作-项目设计.md
    └── 工单处理-项目设计.md
```

### 6.2 目标结构（VitePress 重构后）

```
AI-Lesson/
├── 📘 docs/                      # VitePress 站点（学员访问）
│   ├── .vitepress/               # 配置和主题
│   ├── index.md                  # 首页
│   ├── pre-lesson/               # 预授课
│   ├── lesson-01/                # 主课程
│   ├── projects/                 # 项目设计
│   ├── platform-guide/           # 灵知平台指南 ⭐新增
│   └── resources/                # 资源中心
│
├── 📁 content/                   # 课程内容源文件（保留原名）
│   ├── pre-lesson/
│   ├── lesson-01/
│   └── projects/
│
├── 📁 platform-docs/             # 灵知平台原始文档
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                   # 同步脚本
└── ...
```

### 6.3 迁移说明

**为什么要重构？**
- HTML 页面维护成本高（CSS 重复 300+ 行）
- 缺乏搜索功能
- 流程图维护困难（纯 CSS）
- Markdown 和 HTML 双版本同步困难

**VitePress 优势：**
- ✅ Markdown 驱动，维护简单
- ✅ 内置全文搜索
- ✅ 支持 Mermaid 流程图
- ✅ 自动同步 content/ → docs/
- ✅ 响应式设计，移动端友好

**详细计划**：参见 `VITEPRESS-MIGRATION-PLAN.md`

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
- `VITEPRESS-MIGRATION-PLAN.md` - VitePress 迁移实施计划 ⭐新增
- `Lesson-01/TODO/TODO-总览.md` - 任务总览
- `Lesson-01/TODO/TODO-P0-高优先级.md` - 高优先级任务详情

---

## 九、VitePress 迁移项目（2026-03-05 启动）

### 9.1 迁移目标
- 将 HTML 站点迁移至 VitePress，提升可维护性
- 添加全文搜索和 Mermaid 流程图支持
- 实现 content/ → docs/ 自动同步
- 优化移动端体验和访问速度

### 9.2 新文档结构

```
AI-Lesson/
├── docs/                    # VitePress 站点（学员访问）
│   ├── pre-lesson/          # 预授课（3次直播）
│   ├── lesson-01/           # 主课程（5天）
│   ├── projects/            # 项目设计
│   ├── platform-guide/      # 灵知平台指南 ⭐新增
│   └── resources/           # 资源中心
├── content/                 # 课程内容源文件
├── platform-docs/           # 灵知平台原始文档
├── scripts/                 # 同步脚本
└── package.json
```

### 9.3 迁移时间表
- **阶段 1**（03-05~03-06）：基础架构搭建
- **阶段 2**（03-07~03-09）：内容迁移
- **阶段 3**（03-10~03-14）：平台指南重构
- **阶段 4**（03-15~03-17）：样式定制
- **阶段 5**（03-18~03-20）：测试部署
- **阶段 6**（03-21~03-22）：文档完善
- **阶段 7**（03-23~03-24）：缓冲期

### 9.4 相关文档
- **实施计划**：`VITEPRESS-MIGRATION-PLAN.md`
- **内容规范**：`CONTENT-GUIDE.md`（待创建）
