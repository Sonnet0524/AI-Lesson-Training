# 快速恢复工作指南 (Catch-Up)

**适用场景**：新会话中快速恢复课程开发工作  
**最后更新**：2026-03-04

---

## 一、项目概览

**当前阶段**：🔄 VitePress 站点重构（阶段 1 进行中）

**项目目标**：国网四川电力 AI 种子团队 5 天 Agentic AI 培训课程

**在线地址**：https://sonnet0524.github.io/AI-Lesson-Training/

**本地预览**：http://localhost:5173 （运行中）

---

## 二、VitePress 迁移进度

### ✅ 已完成（90%）

| 任务 | 状态 | 说明 |
|------|------|------|
| 目录结构重构 | ✅ 完成 | content/、docs/、platform-docs/、scripts/ |
| 内容迁移 | ✅ 完成 | 24个 Markdown 迁移到 content/ |
| 同步脚本 | ✅ 完成 | scripts/sync-content.js |
| VitePress 配置 | ✅ 完成 | 紫色主题、搜索、导航 |
| 本地测试 | ✅ 完成 | http://localhost:5173 运行中 |
| GitHub Actions | ✅ 配置 | .github/workflows/deploy.yml |
| Git 提交 | ✅ 完成 | 6次提交，265+文件 |

### ⚠️ 待解决

**问题**：GitHub Actions 构建失败  
**原因**：`day3-agent-optimize.md` 包含 `{{xxxx.index}}` 模板语法，VitePress 解析错误  
**影响**：无法部署到线上

**解决方案**：
1. 修复 `docs/lesson-01/day3-agent-optimize.md` 中的模板语法
2. 将 `{{xxxx.index}}` 改为代码块或 HTML 实体
3. 提交并推送

---

## 三、核心文件速查

### 关键文档

| 文件 | 用途 |
|------|------|
| `VITEPRESS-MIGRATION-PLAN.md` | 迁移详细计划 |
| `VITEPRESS-STAGE1-REPORT.md` | 阶段1完成报告 |
| `CONTENT-GUIDE.md` | 内容编写规范 |
| `GITHUB-PAGES-SETUP.md` | Pages配置说明 |
| `state.md` | 项目完整状态 |

### 核心命令

```bash
# 同步内容
npm run sync

# 本地预览
npm run dev

# 构建站点
npm run build

# 提交代码
git add -A && git commit -m "message" && git push
```

---

## 四、文档结构

```
AI-Lesson/
├── content/              # 源文件（讲师编辑）
│   ├── pre-lesson/      # 预授课（3次直播）
│   ├── lesson-01/       # 主课程（5天）
│   └── projects/        # 项目设计
│
├── docs/                 # VitePress 站点（自动同步）
│   ├── .vitepress/      # 配置和主题
│   ├── pre-lesson/
│   ├── lesson-01/
│   ├── projects/
│   ├── platform-guide/  # 灵知平台指南
│   └── resources/       # 资源中心
│
├── platform-docs/        # 灵知平台原始文档
├── scripts/              # 同步脚本
└── .github/workflows/    # 自动部署
```

---

## 五、立即行动项

### 🔴 紧急：修复 GitHub Actions 构建

**文件**：`docs/lesson-01/day3-agent-optimize.md`

**问题行**：
```
54: │  [元素序号]              │  {{xxxx.index}}
55: │  [元素值]                │  {{xxxx.item}}
56: │  [数组长度]              │  {{xxxx.length}}
```

**修复方法**：

**方法 1**：使用代码块
```markdown
\`\`\`
[元素序号] {{xxxx.index}}
[元素值] {{xxxx.item}}
[数组长度] {{xxxx.length}}
\`\`\`
```

**方法 2**：使用 HTML 实体（已尝试，失败）
```markdown
&#123;&#123;xxxx.index&#125;&#125;
```

**方法 3**：使用 v-pre 指令
```html
<span v-pre>{{xxxx.index}}</span>
```

**执行步骤**：
1. 修复文件：编辑 `docs/lesson-01/day3-agent-optimize.md`
2. 测试：`npm run build`（本地验证）
3. 提交：`git add -A && git commit -m "fix: 修复模板语法" && git push`
4. 验证：等待 GitHub Actions 完成（2-3分钟）
5. 访问：https://sonnet0524.github.io/AI-Lesson-Training/

---

## 六、文件名映射

| content/ 源文件 | docs/ 目标文件 |
|----------------|----------------|
| Pre-Lesson-01-灵知平台入门.md | pre-lesson/01-platform-intro.md |
| Day1-AgenticAI与ReAct模式.md | lesson-01/day1-ai-trends.md |
| Day2-Agent开发实战.md | lesson-01/day2-agent-dev.md |
| Day3-Agent优化与发布.md | lesson-01/day3-agent-optimize.md |
| Day4-前端开发.md | lesson-01/day4-frontend.md |
| Day5-项目展示与总结.md | lesson-01/day5-showcase.md |
| 智能问数-项目设计.md | projects/smart-query.md |
| 智能写作-项目设计.md | projects/smart-writing.md |
| 工单处理-项目设计.md | projects/work-order.md |

---

## 七、统计数据

```
Git 提交：6次
文件变更：265+ 个文件
代码新增：60,000+ 行
docs/: 22 个 Markdown
content/: 24 个 Markdown
platform-docs/: 206 个文件
```

---

## 八、常见问题

### Q1: 如何添加新文档？

1. 在 `content/` 目录创建 Markdown 文件
2. 更新 `scripts/filename-mapping.json`
3. 运行 `npm run sync`
4. 提交并推送

### Q2: 本地预览失败？

检查：
- Node.js 版本 >= 20
- 运行 `npm install`
- 端口 5173 未被占用

### Q3: GitHub Actions 失败？

查看日志：
```bash
gh run view --log-failed
```

常见原因：
- 模板语法冲突
- 死链接
- 配置错误

---

## 九、下一步计划

### 阶段 2：内容完善（第 3-5 天）

- [ ] 修复 GitHub Actions 构建
- [ ] 验证线上访问
- [ ] 修复所有死链接
- [ ] 测试 Mermaid 流程图
- [ ] 完善首页内容

### 阶段 3-7：后续优化

参见：`VITEPRESS-MIGRATION-PLAN.md`

---

## 十、快速参考

**本地预览**：http://localhost:5173  
**线上地址**：https://sonnet0524.github.io/AI-Lesson-Training/  
**Actions 进度**：https://github.com/Sonnet0524/AI-Lesson-Training/actions  
**仓库地址**：https://github.com/Sonnet0524/AI-Lesson-Training

---

**状态**：阶段 1 基本完成（90%），阻塞于构建错误  
**优先级**：🔴 修复 GitHub Actions 构建  
**预计时间**：修复后 2-3 分钟可访问线上站点
