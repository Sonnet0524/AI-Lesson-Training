# 快速恢复工作指南 (Catch-Up)

**适用场景**：新会话中快速恢复课程开发工作

---

## 一、项目概览

**当前状态**：✅ 课程开发已完成

**项目目标**：国网四川电力 AI 种子团队 5 天 Agentic AI 培训课程

**在线地址**：https://sonnet0524.github.io/AI-Lesson-Training/

---

## 二、快速开始

### 步骤 1：确认工作目录

```bash
cd /Users/sonnet/opencode/AI-Lesson-Training
```

### 步骤 2：查看项目状态

```bash
# 查看 Git 状态
git status

# 查看最近提交
git log --oneline -5

# 查看目录结构
ls -la
```

### 步骤 3：了解当前进展

阅读以下文件：
1. `state.md` - 完整项目状态
2. `AGENT.md` - AI 助手工作规范

---

## 三、核心约束（必读）

### 3.1 语言规范
- **所有输出使用中文**
- 文件命名、代码注释、Git 提交均用中文

### 3.2 技术规范
- 灵知平台 ≠ Dify（类似但不同）
- Skills/MCP 是 opencode 概念，不是灵知平台概念
- API 暴露简单，不安排专门课时

### 3.3 课程安排
- **Pre-Lesson**：3 次独立直播（每次 90 分钟）
- **Day 2**：Catch up 模式
- **Day 4**：全程使用 opencode 进行 Vibe Coding
- **Day 5**：15:00 结束，无颁奖

### 3.4 HTML 规范
- 流程图用 CSS/HTML 绘制，不用纯文本
- 代码块需要正确换行
- 使用相对路径链接

---

## 四、关键文件速查

| 需求 | 文件路径 |
|------|----------|
| 查看整体状态 | `state.md` |
| 查看工作规范 | `AGENT.md` |
| 查看课程主页 | `index.html` |
| 查看灵知平台文档 | `reference/docs/灵知平台完整文档.md` |
| 查看技术栈 | `docs/技术栈与关键信息.md` |
| 查看项目设计 | `projects/*.md` |

---

## 五、常见操作

### 5.1 修改课程内容

1. 找到对应的 Markdown 文件
2. 同时修改 HTML 页面（`pages/` 目录）
3. 测试链接有效性
4. Git commit + push

### 5.2 添加新项目设计

1. 创建 `projects/项目名-项目设计.md`
2. 创建 `pages/project-xxx.html`
3. 更新 `index.html` 添加链接
4. Git commit + push

### 5.3 修改 HTML 页面

1. 找到 `pages/` 下对应文件
2. 修改内容
3. 检查所有链接
4. Git commit + push

---

## 六、Git 提交规范

```bash
# 添加所有更改
git add -A

# 提交（使用中文描述）
git commit -m "描述本次修改内容"

# 推送
git push
```

**提交信息示例**：
- "更新 Day 3 课程内容"
- "添加新项目设计文档"
- "修复页面链接错误"

---

## 七、灵知平台速查

### 核心模块
```
用户提问 → 智能对话 → 信息分类 → 信息提取 → 知识库搜索
```

### 节点类型
- 🟡 黄色 = 布尔型
- 🔵 蓝色 = 字符串
- 🟣 紫色 = 知识库结果
- 🔴 红色 = 任意类型

### 参数建议
- 相似度阈值：0.5-0.7
- 召回数：3-10
- 聊天上下文：2-5 条
- 回复创意性：0-0.8

---

## 八、已完成的里程碑

- ✅ Day 1-5 课程 Markdown 文档
- ✅ Pre-Lesson 3 次直播文档
- ✅ 所有 HTML 交互页面
- ✅ 3 个项目设计文档
- ✅ 技术栈与关键信息文档
- ✅ 灵知平台完整参考文档
- ✅ GitHub Pages 部署
- ✅ 所有链接检查完成

---

## 九、可能的扩展方向

如需继续开发：

1. **添加新项目案例**
   - 智能客服
   - 文档审查
   - 数据分析

2. **制作配套材料**
   - 培训 PPT
   - 学员手册 PDF
   - 操作视频

3. **功能增强**
   - 移动端适配
   - 搜索功能
   - 进度追踪

---

## 十、快速参考链接

- **GitHub 仓库**：https://github.com/Sonnet0524/AI-Lesson-Training
- **在线课程**：https://sonnet0524.github.io/AI-Lesson-Training/
- **问题反馈**：提 GitHub Issue

---

**提示**：开始工作前，先阅读 `AGENT.md` 了解工作规范。
