# Pre-Lesson 第3次直播：Vibe Coding环境准备

## 基本信息

**时间**：Day 1 前1天

**总时长**：100分钟（授课70分钟 + 交流30分钟）

**学习目标**：
- 完成Node.js安装
- 完成Git与Gitee配置
- 完成opencode工具安装配置
- 能够创建和运行React项目
- 了解Vibe Coding基本概念

---

## 课程内容

### Part 1：环境准备概述（10分钟）

#### 1. 开发环境整体架构（3分钟）

```
开发环境架构：

┌─────────────────────────────────────────────────────────────┐
│                     开发环境                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Node.js   │    │  opencode   │    │   VS Code   │     │
│  │  运行环境   │    │  AI编程助手 │    │  代码编辑器 │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                    ┌───────┴───────┐                       │
│                    │   React 项目   │                       │
│                    │   前端应用     │                       │
│                    └───────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

#### 2. 工具清单与安装顺序（4分钟）

**必装工具**：

| 工具 | 版本要求 | 用途 |
|------|----------|------|
| Node.js | LTS版本（18+） | JavaScript运行环境 |
| Git | 最新版 | 版本控制 |
| opencode | 最新版 | AI编程助手 |
| VS Code | 最新版 | 代码编辑器（推荐） |

**安装顺序**：
```
步骤1：安装 Node.js
步骤2：安装 Git
步骤3：配置 Gitee
步骤4：安装 VS Code
步骤5：安装 opencode
步骤6：验证环境
```

---

#### 3. Vibe Coding简介（3分钟）

**什么是 Vibe Coding？**
```
传统编程：
程序员手动编写每一行代码

Vibe Coding：
用自然语言描述需求，AI生成代码，程序员审核调整
```

**核心优势**：
- 降低编程门槛
- 提高开发效率
- 快速原型验证
- 学习新技术更快

**Day 4 将深入学习**：
- opencode 使用技巧
- 与AI协作编写React代码
- 迭代优化流程

---

### Part 2：Node.js安装与验证（15分钟）

#### 1. 下载安装（8分钟）

**Windows系统**：
```
步骤1：访问 https://nodejs.org
步骤2：下载 LTS 版本安装包
步骤3：运行安装包，一路Next
步骤4：确认勾选 "Add to PATH"
步骤5：完成安装
```

**macOS系统**：
```
方式1：官网下载安装包
步骤1：访问 https://nodejs.org
步骤2：下载 LTS 版本 .pkg 文件
步骤3：双击安装包，按提示安装

方式2：使用Homebrew
步骤1：打开终端
步骤2：执行 brew install node
```

**讲师演示**：
- 演示Windows/macOS安装过程
- 强调注意事项

---

#### 2. 环境验证（4分钟）

**打开命令行工具**：
```
Windows：按 Win+R，输入 cmd，回车
macOS：打开"终端"应用
```

**验证命令**：
```bash
# 验证Node.js
node -v
# 预期输出：v18.x.x 或更高

# 验证npm（Node包管理器）
npm -v
# 预期输出：9.x.x 或更高
```

**常见问题**：
```
问题：命令提示"不是内部或外部命令"
解决：
1. 检查是否正确安装
2. 重启命令行窗口
3. 检查环境变量是否配置

问题：版本过低
解决：
1. 卸载旧版本
2. 重新安装最新LTS版本
```

---

#### 3. 配置npm镜像（3分钟）

**为什么要配置镜像？**
```
npm默认从国外服务器下载包，速度较慢
配置国内镜像可以大幅提升下载速度
```

**配置淘宝镜像**：
```bash
# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com

# 验证配置
npm config get registry
# 预期输出：https://registry.npmmirror.com
```

---

### Part 3：Git与Gitee配置（10分钟）

#### 1. 为什么使用Gitee？（2分钟）

**背景说明**：
```
由于网络环境限制，GitHub访问不稳定
使用Gitee作为代码仓库管理平台，确保培训期间代码协作顺畅
```

**Gitee优势**：
- ✅ 国内访问稳定快速
- ✅ 免费私有仓库
- ✅ 中文界面友好
- ✅ 与Git操作完全兼容
- ✅ 支持团队协作功能

**对比**：
| 平台 | 访问速度 | 免费私有仓库 | 中文支持 | 培训推荐 |
|------|----------|--------------|----------|----------|
| **Gitee** | ⭐⭐⭐⭐⭐ | ✅ 无限制 | ✅ 原生 | ✅ **主推** |
| GitHub | ⭐⭐ | ✅ 有限制 | ⚠️ 需插件 | ⚠️ 备选 |
| GitLab | ⭐⭐⭐ | ✅ 有 | ⚠️ 部分 | ❌ 不推荐 |

---

#### 2. Git安装（3分钟）

**Windows安装**：
```
方式1：官网下载
步骤1：访问 https://git-scm.com/download/win
步骤2：下载安装包
步骤3：运行安装，使用默认配置即可

方式2：使用Chocolatey（如已安装）
choco install git
```

**macOS安装**：
```bash
# 方式1：使用Xcode Command Line Tools
xcode-select --install

# 方式2：使用Homebrew
brew install git
```

**Linux安装**：
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

**验证安装**：
```bash
git --version
# 预期输出：git version 2.x.x
```

---

#### 3. Gitee注册与配置（5分钟）

**注册Gitee账号**：
```
步骤1：访问 https://gitee.com
步骤2：点击"注册"
步骤3：填写邮箱、密码、用户名
步骤4：验证邮箱
步骤5：完成注册
```

**配置Git用户信息**：
```bash
# 配置用户名（建议与Gitee用户名一致）
git config --global user.name "你的名字"

# 配置邮箱（使用注册邮箱）
git config --global user.email "你的邮箱"

# 查看配置
git config --global --list
```

**配置SSH密钥（推荐）**：
```bash
# 生成SSH密钥
ssh-keygen -t rsa -C "你的邮箱"
# 一路回车使用默认配置

# 查看公钥
cat ~/.ssh/id_rsa.pub
# 复制输出的内容

# 添加到Gitee
# 1. 登录Gitee
# 2. 点击头像 -> 设置 -> SSH公钥
# 3. 粘贴公钥内容
# 4. 点击确定

# 验证SSH连接
ssh -T git@gitee.com
# 预期输出：Hi 用户名! You've successfully authenticated...
```

**HTTPS方式（备选）**：
```
如果SSH配置遇到问题，可以使用HTTPS方式：
- 克隆仓库时使用HTTPS地址
- 每次推送需要输入用户名密码
- 或配置Git凭据缓存：
  git config --global credential.helper store
```

---

#### 4. Gitee基本使用（可选扩展）

**创建仓库**：
```
步骤1：登录Gitee
步骤2：点击右上角"+" -> "新建仓库"
步骤3：填写仓库名称（如：ai-training-project）
步骤4：选择"私有"或"公开"
步骤5：点击"创建"
```

**克隆仓库**：
```bash
# SSH方式（推荐）
git clone git@gitee.com:用户名/仓库名.git

# HTTPS方式
git clone https://gitee.com/用户名/仓库名.git
```

**提交代码**：
```bash
# 进入项目目录
cd 仓库名

# 添加文件到暂存区
git add .

# 提交更改
git commit -m "提交说明"

# 推送到远程仓库
git push origin master
```

**拉取更新**：
```bash
# 拉取远程更新
git pull origin master
```

**详细使用指南**：
- [Gitee使用指南](../Lesson-01/resources/环境指南/Gitee使用指南.md)

---

**讲师演示**：
- 演示Gitee注册流程
- 演示SSH配置
- 演示仓库创建和克隆

**学员练习**：
```
□ 完成Gitee账号注册
□ 配置Git用户信息
□ 配置SSH密钥（可选）
□ 创建一个测试仓库
□ 克隆到本地
```

---

### Part 4：Vibe Coding工具安装与配置（20分钟）

#### 1. 工具选择：OpenCode vs Trae（3分钟）

**两种工具对比**：

| 工具 | 特点 | 适用场景 | 推荐指数 |
|------|------|----------|----------|
| **OpenCode** | 开源、功能全面、支持多种模型 | 网络环境良好、对代码质量要求高 | ⭐⭐⭐⭐⭐ |
| **Trae-cn** | 国内访问稳定、中文优化、上手简单 | 网络环境受限、希望简单快速上手 | ⭐⭐⭐⭐ |

**选择建议**：
```
✅ 如果能稳定访问国际网站 → 推荐 OpenCode
✅ 如果网络访问不稳定 → 推荐 Trae-cn
✅ 不确定 → 两种都准备，根据实际情况选择
```

**本次培训推荐**：OpenCode（主要）+ Trae-cn（备选）

**详细对比文档**：[工具对比分析](../Lesson-01/resources/环境指南/工具对比.md)

---

#### 2. OpenCode 安装（10分钟）

**官网**：https://opencode.ai  
**GitHub**：https://github.com/anomalyco/opencode

**Windows安装**：

**方式1：PowerShell安装（推荐）**
```powershell
# 以管理员身份运行PowerShell
# 执行安装命令
irm https://opencode.ai/install.ps1 | iex
```

**方式2：手动下载安装**
```
步骤1：访问 https://opencode.ai
步骤2：点击"Download for Windows"
步骤3：下载安装包（.exe或.msi）
步骤4：双击运行安装程序
步骤5：按提示完成安装
```

**macOS安装**：

**方式1：终端安装（推荐）**
```bash
# 打开终端，执行安装命令
curl -fsSL https://opencode.ai/install.sh | bash
```

**方式2：Homebrew安装**
```bash
# 使用Homebrew安装
brew install opencode
```

**方式3：手动下载安装**
```
步骤1：访问 https://opencode.ai
步骤2：点击"Download for macOS"
步骤3：下载.dmg文件
步骤4：打开.dmg，拖动到Applications文件夹
```

**Linux安装**：

```bash
# 使用curl安装
curl -fsSL https://opencode.ai/install.sh | bash

# 或使用包管理器（Ubuntu/Debian）
sudo apt-get update
sudo apt-get install opencode

# 或（Arch Linux）
yay -S opencode
```

**安装验证**：
```bash
# 检查版本
opencode --version

# 查看状态
opencode status
```

**国内访问提示**：
```
⚠️ 如果opencode.ai访问较慢：
1. 使用网络加速工具
2. 或选择Trae-cn作为替代方案
3. 详细安装指南：[OpenCode安装指南](../Lesson-01/resources/环境指南/OpenCode安装指南.md)
```

---

#### 3. OpenCode 配置（7分钟）

**首次启动**：
```bash
# 在终端中输入
opencode
```

**登录方式选择**：

**方式1：GitHub账号登录（推荐）**
```
1. 选择"Login with GitHub"
2. 浏览器自动打开授权页面
3. 点击授权
4. 自动完成登录

优势：
- 免费，无需额外付费
- 可使用GitHub Copilot额度
```

**方式2：OpenAI账号登录**
```
1. 选择"Login with OpenAI"
2. 使用ChatGPT Plus/Pro账号登录

优势：
- 可使用ChatGPT Plus/Pro额度
- 模型质量高
```

**方式3：使用API Key（灵活）**
```
1. 选择"Use API Key"
2. 输入模型提供商的API Key

支持的API Key：
- OpenAI API Key
- Anthropic API Key（Claude）
- 阿里云API Key（Qwen）
- 其他兼容OpenAI格式的API Key
```

**推荐配置（培训使用）**：

**方案A：GitHub Copilot（免费）**
```
登录方式：GitHub账号
模型：默认（Copilot模型）
费用：免费（GitHub学生包）或$10/月
适用：个人学习、小型项目
```

**方案B：Qwen模型（低成本）**
```
登录方式：API Key
API Key来源：阿里云百炼平台
            https://bailian.console.aliyun.com/
模型选择：Qwen-Plus 或 Qwen-Turbo
费用：免费额度 + 按量付费（约￥0.008/千tokens）
适用：国内用户、预算有限
```

**方案C：Claude 3.5（高质量）**
```
登录方式：API Key
API Key来源：Anthropic官网
模型选择：Claude 3.5 Sonnet
费用：按量付费（约$3/百万tokens）
适用：对代码质量要求高
```

**模型选择建议**：
```
培训推荐：
- 主推：Qwen-Plus（国内、低成本、质量好）
- 备选：GitHub Copilot（免费）
- 高质量：Claude 3.5 Sonnet（可选）
```

**配置示例**：
```bash
# 启动OpenCode
opencode

# 进入设置界面
# Settings -> Model Configuration

# 配置Qwen模型
1. 选择"Add Custom Model"
2. Provider: Alibaba Cloud
3. Model: qwen-plus
4. API Key: [你的API Key]
5. 保存配置

# 测试配置
# 输入：帮我创建一个简单的React组件
# 检查是否正常响应
```

---

#### 4. Trae-cn 安装（备选方案）

**适用情况**：
- OpenCode访问不稳定
- 希望更简单的上手流程
- 主要使用中文场景

**官网**：https://www.trae.ai

**安装步骤**：
```
步骤1：访问 https://www.trae.ai
步骤2：点击"Download TRAE"
步骤3：选择对应平台（Windows/macOS/Linux）
步骤4：下载并安装
```

**登录配置**：
```
支持登录方式：
- 字节跳动账号
- 手机号注册
- 第三方登录（如支持）
```

**Trae-cn特点**：
```
✅ 国内访问稳定
✅ 中文场景优化
✅ 上手简单
✅ 无需网络优化
```

**详细说明**：[Trae-cn调研报告](../Lesson-01/resources/环境指南/Trae-cn调研报告.md)

---

**安装完成检查**：
```bash
# 检查OpenCode
opencode --version

# 或检查Trae
trae --version

# 测试基本功能
# 启动工具，输入：帮我创建一个简单的HTML页面
```

**讲师演示**：
- 演示安装过程
- 演示首次启动

---

#### 2. 基本配置（7分钟）

**首次启动配置**：
```
步骤1：启动 opencode
步骤2：登录/注册账号
步骤3：选择默认编辑器（VS Code）
步骤4：配置API密钥（如有）
```

**常用设置**：
```
┌─────────────────────────────────────────────────────────────┐
│ opencode 设置                                                │
├─────────────────────────────────────────────────────────────┤
│ ☑ 自动保存文件                                              │
│ ☑ 代码自动补全                                              │
│ ☐ 自动执行命令（建议关闭）                                   │
│                                                             │
│ 默认模型：[GPT-4 / Claude / 其他]                            │
│ 语言：[中文 / English]                                       │
└─────────────────────────────────────────────────────────────┘
```

---

#### 3. 快速体验（5分钟）

**第一次对话**：
```
用户：帮我创建一个简单的HTML页面，标题是"Hello World"

opencode：
[创建 index.html 文件]
<!DOCTYPE html>
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>

页面已创建，你可以在浏览器中打开查看。
```

**讲师演示**：
- 演示与opencode对话
- 演示代码生成
- 演示文件操作

---

### Part 4：React项目创建（15分钟）

#### 1. 创建第一个React项目（10分钟）

**使用opencode创建**：
```
用户：帮我创建一个React项目，使用Vite，项目名叫my-first-app

opencode：
好的，我来帮你创建项目。

[执行命令]
npm create vite@latest my-first-app -- --template react

[输出]
✔ Project created at my-first-app

接下来请执行：
cd my-first-app
npm install
npm run dev

这样就可以启动项目了。
```

**手动创建（备选）**：
```bash
# 创建项目
npm create vite@latest my-first-app -- --template react

# 进入项目目录
cd my-first-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

---

#### 2. 运行与验证（5分钟）

**启动项目**：
```bash
npm run dev
```

**预期输出**：
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

**访问页面**：
```
打开浏览器，访问 http://localhost:5173
看到 Vite + React 页面表示成功
```

**讲师演示**：
- 演示项目创建
- 演示启动运行
- 演示页面访问

---

### 交流时间（30分钟）

**答疑内容**：
1. 环境安装问题解决
2. opencode使用问题解答
3. React项目问题解答

**环境验证清单**：
```
□ node -v 显示版本号
□ npm -v 显示版本号
□ git --version 显示版本号
□ Gitee账号注册完成
□ opencode 能正常启动
□ 能创建React项目
□ 能运行React项目
□ 浏览器能访问 localhost:5173
```

**Day 1 预习建议**：
- 复习灵知平台操作
- 熟悉opencode基本使用
- 思考项目选题方向
- 准备知识库文档

---

## 验收标准

**本次直播结束后，学员应能够**：
- [ ] Node.js安装成功
- [ ] Git安装成功
- [ ] Gitee账号注册并配置
- [ ] opencode安装并配置
- [ ] 能够创建React项目
- [ ] 能够运行React项目
- [ ] 浏览器能访问 localhost:5173

---

## 环境验证命令汇总

```bash
# Node.js 验证
node -v          # 显示Node.js版本
npm -v           # 显示npm版本

# Git 验证
git --version    # 显示Git版本

# Gitee配置
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"

# npm镜像配置
npm config set registry https://registry.npmmirror.com
npm config get registry

# React项目创建
npm create vite@latest my-first-app -- --template react
cd my-first-app
npm install
npm run dev
```

---

**课程版本**：v1.0  
**适用对象**：国网四川电力人工智能种子团队培训
