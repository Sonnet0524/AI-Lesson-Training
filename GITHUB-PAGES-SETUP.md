# 配置 GitHub Pages 指南

## 问题说明

GitHub Actions 部署失败，原因是 GitHub Pages 还没有配置使用 GitHub Actions 构建。

**错误信息**：
```
Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions
```

---

## 解决步骤

### 方法 1：通过 GitHub 网页配置（推荐）

1. **访问仓库设置**
   - 打开：https://github.com/Sonnet0524/AI-Lesson-Training/settings/pages

2. **配置构建源**
   - **Source**: 选择 `GitHub Actions`（不是 Deploy from a branch）
   
3. **保存配置**
   - 点击 `Save` 按钮

4. **重新运行 Actions**
   - 访问：https://github.com/Sonnet0524/AI-Lesson-Training/actions
   - 找到失败的 workflow run
   - 点击 `Re-run all jobs`

---

### 方法 2：使用 gh CLI（需要权限）

```bash
# 需要 repo 权限
gh auth refresh -h github.com -s repo

# 启用 GitHub Pages
gh api repos/Sonnet0524/AI-Lesson-Training/pages \
  -X PUT \
  -f source='{"branch":"main","path":"/docs/.vitepress/dist"}' \
  -f build_type=workflow
```

---

## 验证配置

配置完成后，访问以下地址验证：

- **站点地址**：https://sonnet0524.github.io/AI-Lesson-Training/
- **Actions 进度**：https://github.com/Sonnet0524/AI-Lesson-Training/actions

预计 2-3 分钟后可以访问。

---

## 常见问题

### Q1: 为什么需要手动配置？

GitHub Pages 默认使用分支部署，我们需要改为使用 GitHub Actions 以获得更多控制。

### Q2: 配置后还是失败怎么办？

检查：
1. `docs/.vitepress/dist` 目录是否存在
2. GitHub Actions 是否有写权限
3. 仓库是否启用了 Pages

### Q3: 如何查看详细日志？

```bash
gh run view --log-failed
```

---

**创建日期**：2026-03-04  
**状态**：等待配置
