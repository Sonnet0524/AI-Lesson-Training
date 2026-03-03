# Gitee 使用指南

**适用对象**：国网四川电力AI种子团队培训学员  
**最后更新**：2024年3月3日

---

## 一、Gitee简介

### 1.1 什么是Gitee？

Gitee（码云）是开源中国推出的基于Git的代码托管平台，是国内最大的代码托管平台。

**核心功能**：
- Git仓库托管
- 代码协作管理
- 问题追踪（Issue）
- 持续集成（CI/CD）
- 文档管理（Wiki）

### 1.2 为什么选择Gitee？

| 特性 | Gitee | GitHub |
|------|-------|--------|
| 访问速度 | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| 中文支持 | ✅ 原生 | ⚠️ 需插件 |
| 免费私有仓库 | ✅ 无限制 | ✅ 有限制 |
| 国内网络 | ✅ 稳定 | ⚠️ 可能不稳定 |
| 学习成本 | ✅ 低 | ⚠️ 中等 |

**培训场景优势**：
- 🚀 国内访问速度快，不依赖网络加速工具
- 🇨🇳 中文界面，降低学习成本
- 💰 免费私有仓库，适合团队协作
- 🔒 数据存储在国内，安全性更高

---

## 二、账号注册

### 2.1 注册流程

**步骤1：访问官网**
```
打开浏览器，访问：https://gitee.com
```

**步骤2：开始注册**
```
1. 点击右上角"注册"按钮
2. 填写注册信息：
   - 邮箱：使用常用邮箱（如企业邮箱）
   - 密码：设置安全密码
   - 用户名：建议使用"姓名拼音+工号"格式
   - 例如：zhangsan001
3. 点击"立即注册"
```

**步骤3：验证邮箱**
```
1. 登录邮箱
2. 找到Gitee验证邮件
3. 点击验证链接
4. 完成验证
```

**步骤4：完善信息**
```
登录后完善个人信息：
- 姓名
- 所属企业/组织
- 技术方向
```

### 2.2 账号安全

**设置两步验证（推荐）**：
```
1. 点击头像 -> 设置 -> 安全设置 -> 两步验证
2. 选择验证方式（手机/邮箱）
3. 按提示完成设置
```

**修改密码**：
```
设置 -> 安全设置 -> 修改密码
```

---

## 三、Git安装与配置

### 3.1 安装Git

**Windows系统**：

**方式1：官网下载**
```
步骤1：访问 https://git-scm.com/download/win
步骤2：下载安装包
步骤3：运行安装程序
步骤4：使用默认配置，一路Next
步骤5：完成安装
```

**方式2：使用Chocolatey**
```powershell
# 如已安装Chocolatey
choco install git
```

**macOS系统**：

**方式1：Xcode Command Line Tools**
```bash
xcode-select --install
```

**方式2：Homebrew**
```bash
brew install git
```

**Linux系统**：

**Ubuntu/Debian**：
```bash
sudo apt-get update
sudo apt-get install git
```

**CentOS/RHEL**：
```bash
sudo yum install git
```

### 3.2 验证安装

```bash
git --version
# 预期输出：git version 2.x.x
```

### 3.3 配置Git

**配置用户信息**：
```bash
# 配置用户名（与Gitee用户名一致）
git config --global user.name "张三"

# 配置邮箱（与注册邮箱一致）
git config --global user.email "zhangsan@example.com"

# 查看配置
git config --global --list
```

**配置说明**：
```
--global：全局配置，适用于所有仓库
user.name：提交代码时显示的姓名
user.email：提交代码时显示的邮箱
```

---

## 四、SSH密钥配置

### 4.1 生成SSH密钥

**步骤1：生成密钥**
```bash
# 生成SSH密钥
ssh-keygen -t rsa -C "你的邮箱@example.com"

# 提示输入文件位置，直接回车使用默认位置
# 提示输入密码，直接回车不设置密码（培训场景）
# 再次确认密码，直接回车
```

**步骤2：查看公钥**
```bash
# 查看公钥
cat ~/.ssh/id_rsa.pub

# 或使用Windows命令
type %USERPROFILE%\.ssh\id_rsa.pub
```

**输出示例**：
```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD... zhangsan@example.com
```

### 4.2 添加SSH公钥到Gitee

**步骤1：复制公钥**
```
复制上一步输出的完整公钥内容
（从 ssh-rsa 开始到邮箱结束）
```

**步骤2：添加到Gitee**
```
1. 登录Gitee
2. 点击右上角头像 -> 设置
3. 左侧菜单 -> SSH公钥
4. 点击"添加公钥"
5. 粘贴公钥内容
6. 点击"确定"
```

### 4.3 验证SSH连接

```bash
ssh -T git@gitee.com
```

**成功输出**：
```
Hi 张三! You've successfully authenticated, but GITEE.COM does not provide shell access.
```

**失败处理**：
```
如果连接失败：
1. 检查SSH密钥是否正确添加
2. 检查网络连接
3. 尝试使用HTTPS方式
```

---

## 五、仓库管理

### 5.1 创建仓库

**步骤1：进入创建页面**
```
1. 登录Gitee
2. 点击右上角"+"号
3. 选择"新建仓库"
```

**步骤2：填写仓库信息**
```
仓库名称：ai-training-project
仓库介绍：AI种子团队培训项目
是否开源：
  - 选择"私有"（培训项目建议私有）
  
初始化仓库：
  - ☑ 使用Readme文件初始化这个仓库
  
点击"创建"
```

### 5.2 克隆仓库

**SSH方式（推荐）**：
```bash
git clone git@gitee.com:用户名/仓库名.git
```

**HTTPS方式**：
```bash
git clone https://gitee.com/用户名/仓库名.git
```

**示例**：
```bash
# 克隆仓库
git clone git@gitee.com:zhangsan/ai-training-project.git

# 进入仓库目录
cd ai-training-project
```

### 5.3 提交代码

**步骤1：添加文件**
```bash
# 添加所有更改
git add .

# 或添加特定文件
git add filename.txt
```

**步骤2：提交更改**
```bash
git commit -m "提交说明"

# 示例
git commit -m "添加项目初始化文件"
```

**步骤3：推送到远程**
```bash
git push origin master

# 或推送到main分支
git push origin main
```

**完整流程示例**：
```bash
# 1. 克隆仓库
git clone git@gitee.com:zhangsan/ai-training-project.git
cd ai-training-project

# 2. 创建新文件
echo "# My Project" > README.md

# 3. 添加文件
git add README.md

# 4. 提交更改
git commit -m "更新README文件"

# 5. 推送到远程
git push origin master
```

### 5.4 拉取更新

```bash
# 拉取并合并远程更新
git pull origin master

# 或
git pull
```

### 5.5 查看状态

```bash
# 查看工作区状态
git status

# 查看提交历史
git log

# 查看远程仓库信息
git remote -v
```

---

## 六、分支管理

### 6.1 创建分支

```bash
# 创建新分支
git branch feature-1

# 切换到新分支
git checkout feature-1

# 或一步完成
git checkout -b feature-1
```

### 6.2 合并分支

```bash
# 切换到目标分支（如master）
git checkout master

# 合并feature-1分支
git merge feature-1

# 推送合并结果
git push origin master
```

### 6.3 删除分支

```bash
# 删除本地分支
git branch -d feature-1

# 删除远程分支
git push origin --delete feature-1
```

---

## 七、团队协作

### 7.1 添加协作者

**步骤1：进入仓库设置**
```
1. 进入仓库页面
2. 点击"管理" -> "仓库成员管理"
3. 点击"添加仓库成员"
```

**步骤2：添加成员**
```
方式1：通过用户名搜索
方式2：通过邮箱邀请
方式3：通过分享链接邀请
```

**步骤3：设置权限**
```
权限级别：
- 访客：只能查看
- 报告者：可以提Issue
- 观察者：可以评论
- 开发者：可以推送代码
- 管理员：完全控制权限
```

### 7.2 Pull Request流程

**步骤1：创建分支**
```bash
# 创建特性分支
git checkout -b feature-new-function

# 进行开发...

# 提交更改
git add .
git commit -m "添加新功能"
git push origin feature-new-function
```

**步骤2：创建Pull Request**
```
1. 进入Gitee仓库页面
2. 点击"Pull Request" -> "新建Pull Request"
3. 选择源分支和目标分支
4. 填写PR标题和描述
5. 点击"提交"
```

**步骤3：代码审查**
```
1. 团队成员查看PR
2. 进行代码审查
3. 提出修改意见
4. 讨论和改进
```

**步骤4：合并代码**
```
1. 审查通过后
2. 点击"合并"按钮
3. 确认合并
4. 删除特性分支（可选）
```

### 7.3 解决冲突

**场景**：多人修改同一文件

```bash
# 拉取最新代码
git pull origin master

# 如果有冲突，Git会提示
# 打开冲突文件，查看冲突标记

# 冲突标记示例
<<<<<<< HEAD
你的修改
=======
他人的修改
>>>>>>> branch-name

# 手动解决冲突
# 保留需要的代码，删除冲突标记

# 解决后提交
git add 冲突文件
git commit -m "解决冲突"
git push origin master
```

---

## 八、常见问题

### 8.1 SSH连接失败

**问题**：`ssh: connect to host gitee.com port 22: Connection refused`

**解决方案**：
```bash
# 方案1：检查网络连接
ping gitee.com

# 方案2：使用HTTPS代替SSH
git clone https://gitee.com/用户名/仓库名.git

# 方案3：检查防火墙设置
# 确保端口22未被阻止
```

### 8.2 推送被拒绝

**问题**：`! [rejected] master -> master (fetch first)`

**原因**：远程仓库有新的提交

**解决方案**：
```bash
# 先拉取远程更新
git pull origin master

# 再推送
git push origin master
```

### 8.3 中文文件名乱码

**解决方案**：
```bash
# 配置Git显示中文
git config --global core.quotepath false
```

### 8.4 忘记提交信息

**问题**：提交信息写错了

**解决方案**：
```bash
# 修改最后一次提交信息（未推送时）
git commit --amend -m "新的提交信息"

# 如果已经推送，需要强制推送（谨慎使用）
git push -f origin master
```

### 8.5 撤销提交

**场景1：撤销最后一次提交（保留更改）**
```bash
git reset --soft HEAD~1
```

**场景2：撤销最后一次提交（丢弃更改）**
```bash
git reset --hard HEAD~1
```

**场景3：撤销已推送的提交**
```bash
# 创建反向提交
git revert <commit-hash>
git push origin master
```

---

## 九、最佳实践

### 9.1 提交信息规范

**格式**：
```
<类型>: <简短描述>

<详细描述>（可选）

类型说明：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 重构
- test: 测试相关
- chore: 构建/工具相关
```

**示例**：
```bash
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复登录页面样式问题"
git commit -m "docs: 更新README文档"
```

### 9.2 分支命名规范

```
master/main: 主分支，生产环境代码
develop: 开发分支
feature-xxx: 特性分支
bugfix-xxx: 修复分支
release-xxx: 发布分支
```

### 9.3 日常协作流程

```
1. 每日开始工作前
   git pull origin master

2. 创建特性分支
   git checkout -b feature-new

3. 开发并提交
   git add .
   git commit -m "feat: 新功能"

4. 推送分支
   git push origin feature-new

5. 创建Pull Request
   在Gitee上创建PR

6. 代码审查和合并
   团队成员审查后合并

7. 每日结束工作前
   确保代码已提交和推送
```

---

## 十、培训期间使用建议

### 10.1 仓库组织建议

**项目仓库结构**：
```
ai-training-project/
├── README.md           # 项目说明
├── docs/               # 文档目录
│   ├── 设计文档.md
│   └── 使用说明.md
├── src/                # 源代码目录
│   ├── agent/          # Agent相关代码
│   └── frontend/       # 前端代码
├── resources/          # 资源文件
│   ├── 知识库/
│   └── 模拟数据/
└── .gitignore          # Git忽略配置
```

### 10.2 团队协作建议

**小组分工**：
```
产品经理：
- 维护项目README
- 更新需求文档
- 跟踪项目进度

Agent开发者：
- 管理Agent相关代码
- 编写配置文件
- 更新技术文档

前端开发者：
- 管理前端代码
- 维护UI组件
- 编写使用说明
```

### 10.3 常用命令速查

```bash
# 初始化仓库
git init

# 克隆仓库
git clone <url>

# 查看状态
git status

# 添加文件
git add <file>
git add .

# 提交更改
git commit -m "message"

# 推送代码
git push origin <branch>

# 拉取更新
git pull origin <branch>

# 查看日志
git log

# 创建分支
git branch <name>
git checkout -b <name>

# 合并分支
git merge <branch>

# 查看远程仓库
git remote -v

# 配置用户信息
git config --global user.name "name"
git config --global user.email "email"
```

---

## 十一、相关资源

### 11.1 官方文档

- Gitee官方文档：https://gitee.com/help
- Git官方文档：https://git-scm.com/doc
- Pro Git中文版：https://git-scm.com/book/zh/v2

### 11.2 视频教程

- Gitee官方教程：https://gitee.com/gitee_video
- Git入门教程：搜索"Git教程"（B站、慕课网等）

### 11.3 问题反馈

遇到问题时：
1. 查看本指南常见问题章节
2. 搜索Gitee官方文档
3. 在培训群里提问
4. 联系助教或讲师

---

**文档版本**：v1.0  
**适用对象**：国网四川电力AI种子团队培训  
**最后更新**：2024年3月3日
