# Git协作规范

**适用对象**：国网四川电力AI种子团队培训  
**最后更新**：2024年3月3日

---

## 一、Git基础概念

### 1.1 什么是Git？

Git是一个分布式版本控制系统，用于跟踪文件的更改，支持多人协作开发。

**核心优势**：
- 📝 记录每次修改历史
- 🔄 支持多人协作
- 🔙 可以回退到任意版本
- 🌿 支持分支管理

### 1.2 Git vs Gitee

```
Git：版本控制工具（本地）
  - 跟踪文件修改
  - 管理版本历史
  - 支持分支操作

Gitee：代码托管平台（远程）
  - 托管Git仓库
  - 提供Web界面
  - 支持团队协作
  - 提供Issue、PR等功能
```

### 1.3 核心概念

**工作区（Working Directory）**：
```
工作目录中的文件
  - 实际编辑的文件
  - 未被Git跟踪或已修改
```

**暂存区（Staging Area）**：
```
准备提交的文件
  - git add 后的文件
  - 等待被提交
```

**本地仓库（Local Repository）**：
```
本地Git仓库
  - git commit 后的文件
  - 包含完整的提交历史
```

**远程仓库（Remote Repository）**：
```
Gitee上的仓库
  - git push 后的文件
  - 团队共享的代码
```

---

## 二、分支管理策略

### 2.1 分支模型

**主分支**：
```
master / main
├── 生产环境代码
├── 稳定的、可发布的版本
└── 只接受merge request，禁止直接提交
```

**开发分支**：
```
develop
├── 开发主线
├── 整合各功能分支
└── 定期合并到master
```

**功能分支**：
```
feature-[功能名]
├── 新功能开发
├── 从develop创建
└── 完成后合并回develop
```

**修复分支**：
```
bugfix-[问题描述]
├── Bug修复
├── 从develop创建
└── 修复后合并回develop
```

**热修复分支**：
```
hotfix-[紧急问题]
├── 生产环境紧急修复
├── 从master创建
└── 修复后合并到master和develop
```

### 2.2 分支命名规范

**命名格式**：
```
类型-简短描述

类型：
- feature: 新功能
- bugfix: Bug修复
- hotfix: 紧急修复
- release: 发布分支

示例：
- feature-smart-query
- feature-intelligent-writing
- bugfix-api-error
- hotfix-login-fail
- release-v1.0
```

**命名规则**：
```
✅ 使用小写字母
✅ 使用连字符分隔单词
✅ 简短且有意义
✅ 避免使用特殊字符

✅ 好的命名：
feature-smart-query
bugfix-cors-error

❌ 不好的命名：
feature_SmartQuery
bugfix/123
new-feature
```

### 2.3 分支操作流程

**创建分支**：
```bash
# 方式1：创建并切换
git checkout -b feature-smart-query

# 方式2：先创建再切换
git branch feature-smart-query
git checkout feature-smart-query

# 方式3：基于远程分支创建
git checkout -b feature-smart-query origin/develop
```

**切换分支**：
```bash
# 切换到已存在的分支
git checkout develop

# 查看所有分支
git branch -a
```

**合并分支**：
```bash
# 切换到目标分支
git checkout develop

# 合并功能分支
git merge feature-smart-query

# 推送到远程
git push origin develop
```

**删除分支**：
```bash
# 删除本地分支（已合并）
git branch -d feature-smart-query

# 强制删除本地分支（未合并）
git branch -D feature-smart-query

# 删除远程分支
git push origin --delete feature-smart-query
```

---

## 三、提交规范

### 3.1 提交信息格式

**标准格式**：
```
<类型>: <简短描述>

<详细描述>（可选）

<页脚>（可选）
```

**类型说明**：
```
feat:     新功能
fix:      Bug修复
docs:     文档更新
style:    代码格式（不影响功能）
refactor: 重构（不是新功能也不是Bug修复）
test:     测试相关
chore:    构建/工具相关
perf:     性能优化
```

### 3.2 提交信息示例

**新功能**：
```bash
git commit -m "feat: 添加智能问数Agent基础流程"

# 或带详细描述
git commit -m "feat: 添加智能问数Agent基础流程

- 实现用户提问模块
- 实现智能对话模块
- 实现知识库搜索模块
- 实现信息提取模块"
```

**Bug修复**：
```bash
git commit -m "fix: 修复知识库搜索返回格式错误"

# 或带详细描述
git commit -m "fix: 修复知识库搜索返回格式错误

问题描述：
- 知识库搜索结果格式不一致
- 前端无法正确解析数据

解决方案：
- 统一返回格式
- 添加格式校验"
```

**文档更新**：
```bash
git commit -m "docs: 更新API文档，添加调用示例"
```

**代码重构**：
```bash
git commit -m "refactor: 优化Agent模块连接逻辑"
```

### 3.3 提交原则

**小步提交**：
```
✅ 每个提交只做一件事
✅ 提交粒度适中
✅ 易于回滚和审查

好的做法：
- 一个功能点一个提交
- 一个Bug修复一个提交
- 一个重构一个提交

不好的做法：
- 一次提交多个功能
- 一次提交大量文件
- 提交包含无关修改
```

**提交频率**：
```
✅ 完成一个小功能就提交
✅ 修复一个Bug就提交
✅ 每天至少提交一次

建议：
- 每隔1-2小时提交一次
- 避免一次性提交大量代码
- 保持提交历史清晰
```

**原子提交**：
```
✅ 每个提交都是完整的
✅ 可以独立回滚
✅ 不破坏系统功能

示例：
- ✅ 提交"添加用户登录功能"
  包含：前端组件、后端接口、测试用例
  
- ❌ 提交"开发中"
  包含：不完整的代码，系统无法运行
```

---

## 四、Pull Request流程

### 4.1 创建Pull Request

**步骤1：创建功能分支**
```bash
# 拉取最新代码
git checkout develop
git pull origin develop

# 创建功能分支
git checkout -b feature-smart-query
```

**步骤2：开发并提交**
```bash
# 开发过程中
git add .
git commit -m "feat: 实现智能问数基础功能"

# 继续开发
git add .
git commit -m "feat: 添加知识库搜索功能"

# 完成后推送
git push origin feature-smart-query
```

**步骤3：在Gitee创建PR**
```
1. 访问Gitee仓库页面
2. 点击"Pull Request" -> "新建Pull Request"
3. 选择分支：
   - 源分支：feature-smart-query
   - 目标分支：develop
4. 填写PR信息：
   - 标题：feat: 实现智能问数功能
   - 描述：
     ## 功能说明
     - 实现自然语言查询电力数据
     - 支持知识库搜索
     - 支持数据可视化
     
     ## 测试说明
     - 已测试基本功能
     - 已测试异常情况
     
     ## 相关文档
     - API文档已更新
     - 使用说明已补充
5. 指定审查人
6. 点击"提交"
```

### 4.2 代码审查

**审查人职责**：
```
检查代码质量：
✅ 代码可读性
✅ 命名规范
✅ 注释完整性
✅ 无明显Bug

检查功能实现：
✅ 功能完整性
✅ 逻辑正确性
✅ 异常处理
✅ 边界情况

提出建议：
- 改进建议
- 潜在问题
- 优化方向
```

**审查流程**：
```
1. 查看PR描述，理解功能
2. 查看代码变更
3. 提出审查意见：
   - 评论：提出建议或问题
   - 批准：审查通过
   - 请求变更：需要修改
4. 开发者根据意见修改
5. 再次审查
6. 审查通过，合并代码
```

**审查意见示例**：
```
好的评论：
✅ "这里建议添加错误处理，避免接口异常导致崩溃"
✅ "变量命名建议更具体，如：userName 而不是 name"
✅ "这段逻辑很好，简洁清晰"

不好的评论：
❌ "这里有问题"
❌ "改一下"
❌ "不对"
```

### 4.3 合并代码

**合并前检查**：
```
□ 代码审查已通过
□ 无冲突
□ 测试通过
□ 文档已更新
```

**合并方式**：
```
方式1：Squash合并（推荐）
- 将多个提交压缩为一个
- 保持提交历史整洁
- 适合功能分支

方式2：普通合并
- 保留所有提交
- 保持提交历史完整
- 适合长期分支

方式3：Rebase合并
- 线性提交历史
- 无合并提交
- 需要谨慎使用
```

**合并后操作**：
```bash
# 切换到目标分支
git checkout develop

# 拉取最新代码
git pull origin develop

# 删除本地功能分支
git branch -d feature-smart-query

# 删除远程功能分支
git push origin --delete feature-smart-query
```

---

## 五、冲突解决

### 5.1 冲突产生原因

**常见场景**：
```
场景1：多人修改同一文件的同一位置
场景2：一人修改文件，另一人删除文件
场景3：文件重命名或移动
场景4：分支历史不一致
```

### 5.2 预防冲突

**及时同步**：
```bash
# 开发前拉取最新代码
git pull origin develop

# 定期同步（每隔几小时）
git fetch origin
git merge origin/develop
```

**小步提交**：
```
✅ 每个提交聚焦单一功能
✅ 避免大范围修改
✅ 及时推送代码
```

**及时沟通**：
```
✅ 修改公共文件前通知组员
✅ 避免同时修改同一文件
✅ 使用Pull Request审查代码
```

### 5.3 解决冲突流程

**步骤1：拉取最新代码**
```bash
git pull origin develop
```

**步骤2：Git提示冲突**
```
Auto-merging src/App.js
CONFLICT (content): Merge conflict in src/App.js
Automatic merge failed; fix conflicts and then commit the result.
```

**步骤3：查看冲突文件**
```bash
# 查看冲突文件列表
git status

# 打开冲突文件
# 会看到冲突标记
```

**冲突标记说明**：
```
<<<<<<< HEAD
你的修改
=======
他人的修改
>>>>>>> branch-name
```

**步骤4：手动解决冲突**
```javascript
// 冲突代码示例
function smartQuery(question) {
<<<<<<< HEAD
  console.log('查询问题:', question);
  return fetch('/api/query', { question });
=======
  console.log('智能问数:', question);
  return fetch('/api/smart-query', { question });
>>>>>>> feature-smart-query
}

// 解决后的代码（选择合适的版本或合并）
function smartQuery(question) {
  console.log('智能问数:', question);
  return fetch('/api/smart-query', { question });
}
```

**步骤5：标记冲突已解决**
```bash
# 添加解决冲突后的文件
git add src/App.js

# 提交合并结果
git commit -m "chore: 解决合并冲突"

# 推送代码
git push origin feature-smart-query
```

### 5.4 常见冲突解决

**场景1：同一位置不同修改**
```
解决方法：
1. 查看两种修改内容
2. 判断哪个更合理，或合并两者
3. 删除冲突标记
4. 测试代码正确性
```

**场景2：一人修改，一人删除**
```
解决方法：
1. 确认是否还需要该文件
2. 如果需要，保留修改
3. 如果不需要，删除文件
4. 与组员沟通确认
```

**场景3：文件重命名冲突**
```
解决方法：
1. 确认最终文件名
2. 统一命名
3. 更新所有引用
4. 提交解决方案
```

---

## 六、最佳实践

### 6.1 日常协作流程

**开始工作**：
```bash
# 1. 拉取最新代码
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature-xxx

# 3. 开始开发
# 编写代码...
```

**开发过程**：
```bash
# 4. 定期提交
git add .
git commit -m "feat: 实现某功能"

# 5. 推送到远程
git push origin feature-xxx

# 6. 继续开发
# 编写更多代码...

# 7. 如果develop有更新，同步到功能分支
git fetch origin
git merge origin/develop
# 或使用rebase
git rebase origin/develop
```

**完成工作**：
```bash
# 8. 最后一次提交
git add .
git commit -m "feat: 完成某功能"

# 9. 推送
git push origin feature-xxx

# 10. 在Gitee创建Pull Request

# 11. 等待审查通过

# 12. 合并后删除分支
git checkout develop
git pull origin develop
git branch -d feature-xxx
```

### 6.2 紧急修复流程

**生产环境Bug**：
```bash
# 1. 从master创建热修复分支
git checkout master
git pull origin master
git checkout -b hotfix-xxx

# 2. 修复Bug
git add .
git commit -m "fix: 修复生产环境Bug"

# 3. 合并到master
git checkout master
git merge hotfix-xxx
git push origin master

# 4. 合并到develop
git checkout develop
git merge hotfix-xxx
git push origin develop

# 5. 删除热修复分支
git branch -d hotfix-xxx
```

### 6.3 常用命令速查

**基础操作**：
```bash
# 克隆仓库
git clone <url>

# 查看状态
git status

# 查看历史
git log

# 查看远程仓库
git remote -v
```

**分支操作**：
```bash
# 查看分支
git branch        # 本地分支
git branch -a     # 所有分支

# 创建分支
git branch <name>
git checkout -b <name>

# 切换分支
git checkout <name>

# 删除分支
git branch -d <name>

# 合并分支
git merge <name>
```

**远程操作**：
```bash
# 拉取
git pull origin <branch>

# 推送
git push origin <branch>

# 获取远程信息
git fetch origin

# 查看远程分支
git branch -r
```

**撤销操作**：
```bash
# 撤销工作区修改
git checkout -- <file>

# 撤销暂存区
git reset HEAD <file>

# 撤销最后一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最后一次提交（丢弃修改）
git reset --hard HEAD~1

# 创建反向提交
git revert <commit-hash>
```

### 6.4 问题排查

**问题1：推送被拒绝**
```bash
# 原因：远程有新提交
git push origin <branch>
# ! [rejected] <branch> -> <branch> (fetch first)

# 解决：先拉取再推送
git pull origin <branch>
git push origin <branch>
```

**问题2：合并冲突**
```bash
# 原因：文件冲突
git merge <branch>
# CONFLICT (content): Merge conflict in <file>

# 解决：手动解决冲突
# 1. 打开冲突文件
# 2. 修改代码，删除冲突标记
# 3. git add <file>
# 4. git commit
```

**问题3：提交错误**
```bash
# 修改最后一次提交信息
git commit --amend -m "新的提交信息"

# 撤销最后一次提交
git reset --soft HEAD~1

# 如果已经推送，创建反向提交
git revert <commit-hash>
```

**问题4：分支混乱**
```bash
# 查看提交历史（图形化）
git log --graph --oneline --all

# 查看某个文件的修改历史
git log --follow <file>

# 查看某次提交的详情
git show <commit-hash>
```

---

## 七、协作建议

### 7.1 代码质量

**提交前检查**：
```
□ 代码能正常运行
□ 无明显Bug
□ 符合编码规范
□ 有必要的注释
□ 无敏感信息
```

**代码审查重点**：
```
功能正确性：
- 功能是否完整
- 逻辑是否正确
- 边界情况处理

代码质量：
- 可读性
- 可维护性
- 性能考虑
- 安全性

规范性：
- 命名规范
- 注释规范
- 代码格式
```

### 7.2 团队协作

**沟通原则**：
```
✅ 修改公共代码前通知组员
✅ 遇到问题及时沟通
✅ 定期同步进度
✅ 代码审查认真负责
```

**冲突处理原则**：
```
✅ 友好沟通，理解对方意图
✅ 选择最优方案，不固执己见
✅ 必要时请讲师或组长决策
✅ 记录决策原因
```

**时间管理**：
```
✅ 及时提交代码，避免累积
✅ 及时处理Pull Request
✅ 遇到阻塞及时求助
✅ 合理安排工作时间
```

---

## 八、附录

### 8.1 Git配置建议

**基础配置**：
```bash
# 配置用户信息
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# 配置默认分支名
git config --global init.defaultBranch main

# 配置默认编辑器
git config --global core.editor "code --wait"

# 配置换行符处理（Windows）
git config --global core.autocrlf true

# 配置换行符处理（macOS/Linux）
git config --global core.autocrlf input
```

**实用配置**：
```bash
# 配置命令别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --graph --oneline --all"

# 配置颜色显示
git config --global color.ui auto

# 配置中文文件名显示
git config --global core.quotepath false
```

### 8.2 .gitignore配置

**示例文件**：
```
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# React
build/
dist/
.cache/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# 环境变量
.env
.env.local
.env.*.local

# 日志
logs/
*.log

# 临时文件
tmp/
temp/
*.tmp
```

### 8.3 相关资源

- [Gitee使用指南](../环境指南/Gitee使用指南.md)
- [协作指导手册](./协作指导手册.md)
- [Git官方文档](https://git-scm.com/doc)
- [Pro Git中文版](https://git-scm.com/book/zh/v2)

---

**文档版本**：v1.0  
**适用对象**：国网四川电力AI种子团队培训  
**最后更新**：2024年3月3日
