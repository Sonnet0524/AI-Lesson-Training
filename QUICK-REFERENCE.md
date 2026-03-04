# 快速参考

## 常用命令

```bash
# 同步内容
npm run sync

# 本地开发
npm run dev

# 构建站点
npm run build

# 预览构建
npm run preview
```

---

## 目录说明

| 目录 | 说明 | 编辑方式 |
|------|------|----------|
| `content/` | 课程内容源文件 | ✏️ 在这里编辑 |
| `docs/` | VitePress 站点 | 🚫 自动生成，不要编辑 |
| `docs/platform-guide/` | 平台指南 | ✏️ 手动编辑 |
| `scripts/` | 同步脚本 | 📜 工具脚本 |

---

## 更新流程

### 更新课程内容

1. 编辑 `content/` 目录下的文件
2. 运行 `npm run sync`
3. 测试 `npm run dev`
4. 提交 `git commit`

### 更新平台指南

1. 编辑 `docs/platform-guide/` 目录下的文件
2. 测试 `npm run dev`
3. 提交 `git commit`

---

## 文件命名

**课程内容**（content/）：
- ✅ `Day1-AgenticAI与ReAct模式.md`
- ✅ `智能问数-项目设计.md`

**平台指南**（docs/platform-guide/）：
- ✅ `user-question.md`
- ✅ `smart-dialogue.md`

---

## Frontmatter 模板

```markdown
---
title: "文档标题"
description: "文档描述"
prev: /previous-page
next: /next-page
lastUpdated: 2026-03-04
---
```

---

## Mermaid 注意事项

❌ **避免使用**：
```markdown
参数：{{variable}}
```

✅ **使用替代方式**：
```markdown
参数：variable
```

---

## 部署步骤

```bash
# 1. 同步内容
npm run sync

# 2. 构建
npm run build

# 3. 推送
git add .
git commit -m "docs: 更新内容"
git push

# 4. 自动部署
# GitHub Actions 自动处理
```

---

## 遇到问题？

1. 构建失败 → 检查 Markdown 语法
2. 链接 404 → 检查文件路径
3. 页面未更新 → 清除缓存重新构建
4. 流程图不显示 → 检查 Mermaid 语法

---

**详细文档**：`CONTENT-GUIDE.md`
