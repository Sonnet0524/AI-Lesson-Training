# VitePress 站点迁移实施计划

**项目**：AI种子团队培训课程站点重构  
**目标**：将现有 HTML 站点迁移至 VitePress，提升可维护性  
**时间**：20天（2026-03-05 至 2026-03-24）  
**负责人**：AI助手 + 讲师团队

---

## 📋 项目概述

### 迁移目标
- ✅ 使用 VitePress 替代纯 HTML，提升可维护性
- ✅ 添加全文搜索功能
- ✅ 支持 Mermaid 流程图
- ✅ 自动同步 content/ 到 docs/
- ✅ 保留原有内容结构，优化访问体验

### 新旧对比

| 特性 | 当前 HTML | 目标 VitePress |
|------|-----------|----------------|
| 维护方式 | 手动修改 HTML/CSS | Markdown + 自动同步 |
| 搜索功能 | ❌ 无 | ✅ 全文搜索 |
| 流程图 | CSS绘制（难维护） | Mermaid（文本描述） |
| 移动端 | 响应式 | 响应式 + 优化 |
| 部署 | GitHub Pages | GitHub Pages（自动） |

---

## 🗂️ 新文档结构

```
AI-Lesson/
│
├── 📘 docs/                          # VitePress 站点（学员访问）
│   ├── .vitepress/
│   │   ├── config.ts                 # 站点配置
│   │   └── theme/
│   │       ├── custom.css            # 紫色渐变主题
│   │       └── index.ts
│   │
│   ├── index.md                      # 课程首页
│   │
│   ├── pre-lesson/                   # 预授课（3次直播）
│   │   ├── index.md
│   │   ├── 01-platform-intro.md      # 第1次：灵知平台入门
│   │   ├── 02-core-modules.md        # 第2次：核心模块与编排
│   │   └── 03-vibe-coding.md         # 第3次：VibeCoding环境准备
│   │
│   ├── lesson-01/                    # 主课程（5天）
│   │   ├── index.md
│   │   ├── day1-ai-trends.md
│   │   ├── day2-agent-dev.md
│   │   ├── day3-agent-optimize.md
│   │   ├── day4-frontend.md
│   │   └── day5-showcase.md
│   │
│   ├── projects/                     # 项目设计
│   │   ├── index.md
│   │   ├── smart-query.md            # 智能问数
│   │   ├── smart-writing.md          # 智能写作
│   │   └── work-order.md             # 工单处理
│   │
│   ├── platform-guide/               # 灵知平台使用指南 ⭐新增
│   │   ├── index.md
│   │   ├── quick-start.md
│   │   ├── basic-config.md
│   │   ├── planning-overview.md
│   │   ├── modules/                  # 基础模块详解
│   │   │   ├── index.md
│   │   │   ├── user-question.md
│   │   │   ├── smart-dialogue.md
│   │   │   ├── knowledge-search.md
│   │   │   └── ...（共17个模块）
│   │   └── advanced/                 # 高级功能
│   │       ├── mcp.md
│   │       ├── knowledge-base.md
│   │       └── publish.md
│   │
│   └── resources/                    # 资源中心
│       ├── index.md
│       ├── tech-stack.md
│       └── env-setup/                # 环境搭建指南
│           ├── opencode.md
│           └── trae-cn.md
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
├── 📁 platform-docs/                 # 灵知平台原始文档（从 reference/ 迁移）
│   ├── 完整文档/
│   ├── pdf-originals/
│   └── images-for-ocr/
│
├── 🛠️ scripts/                       # 同步和构建脚本
│   ├── sync-content.js               # 主同步脚本
│   ├── filename-mapping.json         # 文件名映射表
│   └── add-frontmatter.js
│
├── 📦 package.json
├── 🚀 .github/workflows/deploy.yml
├── 📖 CONTENT-GUIDE.md               # 内容编写规范
└── 📋 VITEPRESS-MIGRATION-PLAN.md    # 本文件
```

---

## 📊 文件名映射表

| content/ 源文件 | docs/ 目标文件 | 标题 | 描述 |
|----------------|----------------|------|------|
| Pre-Lesson-01-灵知平台入门.md | pre-lesson/01-platform-intro.md | 第1次直播：灵知平台入门 | 灵知平台账号注册、基础操作、规划页面与模块架构 |
| Pre-Lesson-02-核心模块与编排.md | pre-lesson/02-core-modules.md | 第2次直播：核心模块与编排 | 5个核心模块详解、常见编排模式、实操练习 |
| Pre-Lesson-03-VibeCoding环境准备.md | pre-lesson/03-vibe-coding.md | 第3次直播：VibeCoding环境准备 | Node.js安装、OpenCode配置、React项目创建 |
| Day1-AgenticAI与ReAct模式.md | lesson-01/day1-ai-trends.md | Day 1：AI趋势与Agentic AI基础 | 了解近期AI技术发展趋势、深入理解ReAct模式 |
| Day2-Agent开发实战.md | lesson-01/day2-agent-dev.md | Day 2：灵知平台Agent开发实战 | 使用灵知平台搭建Agent应用核心流程 |
| Day3-Agent优化与发布.md | lesson-01/day3-agent-optimize.md | Day 3：Agent优化与发布 | Agent性能优化、高级模块使用、API发布 |
| Day4-前端开发.md | lesson-01/day4-frontend.md | Day 4：前端开发 | 使用React开发前端界面、API集成 |
| Day5-项目展示与总结.md | lesson-01/day5-showcase.md | Day 5：项目展示与总结 | 项目展示、成果评审、培训总结 |
| 智能问数-项目设计.md | projects/smart-query.md | 智能问数项目设计 | 电力数据自然语言查询系统设计方案 |
| 智能写作-项目设计.md | projects/smart-writing.md | 智能写作项目设计 | 公文报告智能生成系统设计方案 |
| 工单处理-项目设计.md | projects/work-order.md | 工单处理项目设计 | 工单智能分类与处理系统设计方案 |

---

## 🚀 实施阶段

### 阶段 1：基础架构搭建（第 1-2 天）
**日期**：2026-03-05 至 2026-03-06

#### 任务清单
- [ ] 1.1 初始化 VitePress 项目
  - [ ] 安装 Node.js 依赖
  - [ ] 运行 `npx vitepress init`
  - [ ] 选择默认主题，配置中文

- [ ] 1.2 创建目录结构
  - [ ] 创建 docs/.vitepress/ 目录
  - [ ] 创建 content/ 目录（迁移现有文件）
  - [ ] 创建 scripts/ 目录

- [ ] 1.3 编写同步脚本
  - [ ] 创建 filename-mapping.json
  - [ ] 实现 sync-content.js
  - [ ] 测试同步功能

- [ ] 1.4 配置 GitHub Actions
  - [ ] 创建 .github/workflows/deploy.yml
  - [ ] 配置自动部署流程

**产出物**：
- 可运行的 VitePress 基础站点
- 内容同步脚本
- 自动部署配置

---

### 阶段 2：内容迁移（第 3-5 天）
**日期**：2026-03-07 至 2026-03-09

#### 任务清单
- [ ] 2.1 迁移课程文档
  - [ ] 将 Pre-Lesson/ → content/pre-lesson/
  - [ ] 将 Lesson-01/*.md → content/lesson-01/
  - [ ] 将 projects/ → content/projects/

- [ ] 2.2 添加 Frontmatter
  - [ ] 为所有 Markdown 文件添加 YAML frontmatter
  - [ ] 配置标题、描述、导航
  - [ ] 添加编辑日期

- [ ] 2.3 测试同步
  - [ ] 运行 `npm run sync`
  - [ ] 验证 docs/ 目录内容
  - [ ] 本地预览 `npm run dev`

- [ ] 2.4 验证链接
  - [ ] 检查所有内部链接
  - [ ] 修复链接错误

**产出物**：
- content/ 目录包含所有源文件
- docs/ 目录自动同步内容
- 所有文档包含 frontmatter

---

### 阶段 3：平台指南重构（第 6-10 天）
**日期**：2026-03-10 至 2026-03-14

#### 任务清单
- [ ] 3.1 迁移参考文档
  - [ ] 创建 platform-docs/ 目录
  - [ ] 迁移 reference/docs/ 内容
  - [ ] 整理 PDF 和图片资源

- [ ] 3.2 拆分平台指南
  - [ ] 基于 `灵知平台完整文档.md` 拆分
  - [ ] 创建 17 个基础模块文档
  - [ ] 创建高级功能文档

- [ ] 3.3 添加流程图
  - [ ] 安装 Mermaid 插件
  - [ ] 将 CSS 流程图转换为 Mermaid 语法
  - [ ] 验证流程图渲染

- [ ] 3.4 优化资源中心
  - [ ] 整理环境指南
  - [ ] 创建技术栈速查表
  - [ ] 添加快速参考卡片

**产出物**：
- 完整的平台指南（17个模块 + 高级功能）
- Mermaid 流程图
- 重构后的资源中心

---

### 阶段 4：样式定制（第 11-13 天）
**日期**：2026-03-15 至 2026-03-17

#### 任务清单
- [ ] 4.1 配置紫色渐变主题
  - [ ] 创建 custom.css
  - [ ] 配置主色调（#667eea ~ #764ba2）
  - [ ] 配置卡片、按钮样式

- [ ] 4.2 配置导航和侧边栏
  - [ ] 配置顶部导航
  - [ ] 配置侧边栏结构
  - [ ] 添加搜索功能

- [ ] 4.3 移动端优化
  - [ ] 测试移动端显示
  - [ ] 优化触摸体验
  - [ ] 调整字体大小

- [ ] 4.4 代码块样式
  - [ ] 配置代码高亮主题
  - [ ] 添加复制按钮
  - [ ] 优化代码块显示

**产出物**：
- 紫色渐变主题
- 完整的导航和侧边栏
- 移动端适配

---

### 阶段 5：测试部署（第 14-16 天）
**日期**：2026-03-18 至 2026-03-20

#### 任务清单
- [ ] 5.1 全面测试
  - [ ] 测试所有页面访问
  - [ ] 验证所有链接
  - [ ] 测试搜索功能
  - [ ] 测试流程图渲染

- [ ] 5.2 首次部署
  - [ ] 提交代码到 GitHub
  - [ ] 触发 GitHub Actions 部署
  - [ ] 验证 GitHub Pages 访问

- [ ] 5.3 删除旧文件
  - [ ] 删除 pages/ 目录（HTML 文件）
  - [ ] 删除重复的样式代码
  - [ ] 更新 README.md

- [ ] 5.4 验证生产环境
  - [ ] 线上访问测试
  - [ ] 性能测试
  - [ ] 跨浏览器测试

**产出物**：
- 成功部署的 VitePress 站点
- 清理后的代码库
- 线上可访问的课程网站

---

### 阶段 6：文档完善（第 17-18 天）
**日期**：2026-03-21 至 2026-03-22

#### 任务清单
- [ ] 6.1 编写内容规范
  - [ ] 创建 CONTENT-GUIDE.md
  - [ ] 编写 Markdown 规范
  - [ ] 编写同步规则说明

- [ ] 6.2 更新项目文档
  - [ ] 更新 README.md
  - [ ] 更新 catch-up.md
  - [ ] 更新 state.md

- [ ] 6.3 编写使用说明
  - [ ] 如何编辑内容
  - [ ] 如何同步到站点
  - [ ] 如何本地预览

**产出物**：
- CONTENT-GUIDE.md
- 更新的项目文档
- 完整的使用说明

---

### 阶段 7：缓冲期（第 19-20 天）
**日期**：2026-03-23 至 2026-03-24

#### 任务清单
- [ ] 7.1 内容微调
  - [ ] 根据反馈调整内容
  - [ ] 修复小问题

- [ ] 7.2 培训前检查
  - [ ] 确认所有链接有效
  - [ ] 确认搜索功能正常
  - [ ] 备份重要文件

- [ ] 7.3 最终部署
  - [ ] 最后一次部署
  - [ ] 验证线上版本
  - [ ] 通知相关人员

**产出物**：
- 最终版课程站点
- 项目总结文档

---

## 📅 详细时间表

| 阶段 | 开始日期 | 结束日期 | 天数 | 关键里程碑 |
|------|----------|----------|------|-----------|
| 1. 基础架构 | 03-05 | 03-06 | 2 | VitePress 初始化完成 |
| 2. 内容迁移 | 03-07 | 03-09 | 3 | 所有内容迁移完成 |
| 3. 平台指南 | 03-10 | 03-14 | 5 | 平台指南重构完成 |
| 4. 样式定制 | 03-15 | 03-17 | 3 | 紫色主题配置完成 |
| 5. 测试部署 | 03-18 | 03-20 | 3 | 站点成功上线 |
| 6. 文档完善 | 03-21 | 03-22 | 2 | 文档编写完成 |
| 7. 缓冲期 | 03-23 | 03-24 | 2 | 最终检查完成 |
| **合计** | | | **20天** | |

---

## 🔧 技术栈

### 核心依赖
```json
{
  "devDependencies": {
    "vitepress": "^1.0.0",
    "mermaid": "^10.0.0"
  },
  "scripts": {
    "sync": "node scripts/sync-content.js",
    "dev": "npm run sync && vitepress dev docs",
    "build": "npm run sync && vitepress build docs",
    "preview": "vitepress preview docs"
  }
}
```

### 主题配置
- **主色调**：紫色渐变 (#667eea ~ #764ba2)
- **代码主题**：github-dark
- **字体**：系统默认字体栈

---

## ⚠️ 风险管理

### 风险 1：同步脚本问题
**可能性**：中  
**影响**：高  
**应对措施**：
- 充分测试同步脚本
- 保留备份机制
- 准备手动同步方案

### 风险 2：流程图转换问题
**可能性**：高  
**影响**：中  
**应对措施**：
- 先转换简单的流程图
- 复杂流程图保留截图备用
- 分批次转换验证

### 风险 3：部署失败
**可能性**：低  
**影响**：高  
**应对措施**：
- 本地充分测试构建
- 保留旧站点备份
- 准备回滚方案

### 风险 4：时间不足
**可能性**：中  
**影响**：中  
**应对措施**：
- 设置检查点，及时调整
- 优先保证核心功能
- 可选功能延后处理

---

## ✅ 检查点

### 检查点 1（第 5 天）
- [ ] 所有内容已迁移到 content/
- [ ] 同步脚本正常工作
- [ ] 本地预览正常

### 检查点 2（第 10 天）
- [ ] 平台指南重构完成
- [ ] Mermaid 流程图正常渲染
- [ ] 资源中心整理完成

### 检查点 3（第 16 天）
- [ ] 站点成功部署到 GitHub Pages
- [ ] 所有功能正常
- [ ] 旧文件已清理

---

## 📞 联系方式

**技术支持**：AI助手  
**内容审核**：讲师团队  
**紧急联系**：项目群

---

**创建日期**：2026-03-05  
**最后更新**：2026-03-05  
**版本**：v1.0
