---
title: "OpenCode安装指南"
description: "OpenCode安装和配置详细指南"
outline: deep
lastUpdated: 2026-03-04
---

# OpenCode 安装指南

**文档版本**：v1.0  
**更新日期**：2024年3月3日  
**适用平台**：Windows、macOS、Linux

---

## 一、OpenCode简介

### 1.1 什么是OpenCode？

OpenCode是一个**开源的AI编程助手**，通过自然语言描述需求，AI自动生成代码，帮助开发者提高编程效率。

**核心特性**：
- ✅ 开源免费（GitHub 100K+ Stars）
- ✅ 支持多种AI模型（Claude、GPT、Gemini、Qwen等）
- ✅ 多端支持（终端、桌面应用、IDE扩展）
- ✅ 隐私友好（不存储代码数据）
- ✅ 支持多种编程语言

**官网**：https://opencode.ai  
**GitHub**：https://github.com/anomalyco/opencode

### 1.2 适用场景

- React前端开发
- 代码生成与重构
- 调试和问题修复
- 代码审查和优化

---

## 二、安装要求

### 2.1 系统要求

| 操作系统 | 最低版本 | 推荐版本 |
|---------|----------|----------|
| Windows | Windows 10 | Windows 10/11 |
| macOS | macOS 10.15 (Catalina) | macOS 12+ |
| Linux | Ubuntu 18.04+ | Ubuntu 20.04+ |

### 2.2 硬件要求

- **内存**：8GB以上（推荐16GB）
- **硬盘**：至少2GB可用空间
- **网络**：稳定的互联网连接

### 2.3 依赖项

- Node.js 18+ （用于React开发）
- Git（可选，用于版本控制）

---

## 三、安装步骤

### 3.1 Windows安装

#### 方式1：使用PowerShell安装（推荐）

```powershell
# 打开PowerShell（以管理员身份运行）
# 执行安装命令
irm https://opencode.ai/install.ps1 | iex
```

**安装过程**：
1. 自动下载安装包
2. 自动安装到系统
3. 自动配置环境变量
4. 安装完成提示

#### 方式2：手动下载安装

1. 访问官网：https://opencode.ai
2. 点击"Download for Windows"
3. 下载安装包（.exe或.msi）
4. 双击运行安装程序
5. 按提示完成安装

#### 方式3：使用包管理器

```powershell
# 使用Scoop安装
scoop install opencode

# 或使用Chocolatey安装
choco install opencode
```

### 3.2 macOS安装

#### 方式1：使用终端安装（推荐）

```bash
# 打开终端
# 执行安装命令
curl -fsSL https://opencode.ai/install.sh | bash
```

#### 方式2：使用Homebrew安装

```bash
# 安装Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 使用Homebrew安装OpenCode
brew install opencode
```

#### 方式3：手动下载安装

1. 访问官网：https://opencode.ai
2. 点击"Download for macOS"
3. 下载.dmg文件
4. 打开.dmg，拖动到Applications文件夹

### 3.3 Linux安装

#### 方式1：使用终端安装（推荐）

```bash
# 打开终端
# 执行安装命令
curl -fsSL https://opencode.ai/install.sh | bash
```

#### 方式2：使用包管理器

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install opencode

# Arch Linux
yay -S opencode
```

---

## 四、首次配置

### 4.1 启动OpenCode

**终端方式**：
```bash
# 在终端中输入
opencode
```

**桌面应用方式**：
- Windows：双击桌面图标或开始菜单中的OpenCode
- macOS：在Applications中双击OpenCode
- Linux：在应用菜单中找到OpenCode

### 4.2 登录配置

OpenCode支持多种登录方式：

#### 方式1：使用GitHub账号（推荐）

```bash
# 启动后选择"Login with GitHub"
# 浏览器会自动打开GitHub授权页面
# 授权后自动完成登录
```

**优势**：
- 可使用GitHub Copilot额度
- 免费，无需额外付费

#### 方式2：使用OpenAI账号

```bash
# 选择"Login with OpenAI"
# 使用ChatGPT Plus/Pro账号登录
```

**优势**：
- 可使用ChatGPT Plus/Pro额度
- 模型质量高

#### 方式3：使用API Key

```bash
# 选择"Use API Key"
# 输入模型提供商的API Key
```

**支持的API Key**：
- OpenAI API Key
- Anthropic API Key（Claude）
- Google API Key（Gemini）
- 阿里云API Key（Qwen）
- 其他兼容OpenAI格式的API Key

### 4.3 模型选择

OpenCode支持75+种LLM提供商，推荐以下模型：

#### 国内用户推荐

| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| **Qwen-Turbo** | 阿里云 | 速度快、成本低 | 日常开发 |
| **Qwen-Plus** | 阿里云 | 平衡性能和成本 | 代码生成 |
| **Qwen-Max** | 阿里云 | 性能最强 | 复杂任务 |
| **DeepSeek** | DeepSeek | 性价比高 | 代码生成 |

#### 国际用户推荐

| 模型 | 提供商 | 特点 | 适用场景 |
|------|--------|------|----------|
| **Claude 3.5 Sonnet** | Anthropic | 代码能力强 | 复杂开发 |
| **GPT-4o** | OpenAI | 综合能力强 | 通用场景 |
| **Gemini Pro** | Google | 多模态能力 | 通用场景 |

### 4.4 配置API Key（使用Qwen为例）

```bash
# 1. 访问阿里云百炼平台
https://bailian.console.aliyun.com/

# 2. 开通服务并获取API Key
# 控制台 -> API-KEY管理 -> 创建新的API-KEY

# 3. 在OpenCode中配置
# 设置 -> 模型配置 -> 选择"Qwen"
# 粘贴API Key -> 保存
```

---

## 五、基本使用

### 5.1 创建React项目

在OpenCode中输入：

```
帮我创建一个React项目，使用Vite，项目名叫power-chat-app。
这是一个电力系统智能助手的前端，需要聊天界面。
```

OpenCode会自动：
1. 执行`npm create vite@latest power-chat-app -- --template react`
2. 创建项目结构
3. 安装依赖
4. 提供运行指令

### 5.2 生成组件代码

```
创建一个聊天消息组件ChatMessage，props包括：
- content: 消息内容
- isUser: 是否是用户消息
- timestamp: 时间戳

用户消息靠右显示，蓝色背景；
AI消息靠左显示，灰色背景。
```

### 5.3 调用API

```
帮我封装一个调用灵知平台Agent API的函数，
API地址是 https://api.example.com/agent/{id}，
需要传入query参数，返回AI的回复。
```

---

## 六、常见问题FAQ

### Q1：安装时提示"权限不足"？

**Windows**：
```powershell
# 以管理员身份运行PowerShell
# 右键点击PowerShell -> "以管理员身份运行"
```

**macOS/Linux**：
```bash
# 使用sudo
sudo curl -fsSL https://opencode.ai/install.sh | bash
```

### Q2：国内访问opencode.ai很慢？

**解决方案**：
1. 使用网络加速工具
2. 或使用镜像源（如果有）
3. 或手动下载安装包

### Q3：OpenCode是否需要付费？

**答案**：OpenCode本身是免费的，但使用的AI模型可能需要付费。

**免费方案**：
- 使用GitHub Copilot（GitHub学生包免费）
- 使用开源模型（如Qwen免费额度）

**付费方案**：
- ChatGPT Plus/Pro订阅
- API Key按使用量付费

### Q4：如何使用Qwen模型？

**步骤**：
1. 访问阿里云百炼平台
2. 开通服务并获取API Key
3. 在OpenCode设置中配置API Key
4. 选择Qwen模型

**免费额度**：
- 新用户有免费试用额度
- 具体额度请查看阿里云官网

### Q5：OpenCode支持哪些编程语言？

**支持的主流语言**：
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- 以及更多...

### Q6：如何更新OpenCode？

**Windows**：
```powershell
# 自动更新
opencode update

# 或重新安装
irm https://opencode.ai/install.ps1 | iex
```

**macOS/Linux**：
```bash
# 自动更新
opencode update

# 或重新安装
curl -fsSL https://opencode.ai/install.sh | bash
```

### Q7：如何卸载OpenCode？

**Windows**：
```powershell
# 使用控制面板卸载
# 或运行卸载程序
```

**macOS**：
```bash
# 删除应用
rm -rf /Applications/OpenCode.app

# 清理配置文件
rm -rf ~/.opencode
```

**Linux**：
```bash
# 卸载
sudo apt-get remove opencode
# 或
brew uninstall opencode
```

### Q8：生成的代码质量如何？

**影响因素**：
- 模型质量（推荐Claude 3.5或GPT-4o）
- 提示词质量（越具体越好）
- 任务复杂度

**建议**：
- 生成后仔细审查代码
- 进行充分的测试
- 根据需要手动调整

---

## 七、培训专用配置

### 7.1 推荐配置（培训使用）

```yaml
# 模型配置
默认模型: Qwen-Plus 或 Claude 3.5 Sonnet
备选模型: Qwen-Turbo（速度快）

# 功能配置
自动保存: 开启
代码补全: 开启
自动执行: 关闭（建议）

# 界面配置
语言: 中文
主题: 深色模式（可选）
```

### 7.2 React开发配置

```bash
# 确保已安装Node.js
node -v  # 应显示v18+

# 确认npm镜像配置（国内用户）
npm config set registry https://registry.npmmirror.com

# 创建项目常用命令
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

---

## 八、验证安装

### 8.1 快速验证清单

在终端执行以下命令，验证安装是否成功：

```bash
# 1. 检查OpenCode版本
opencode --version

# 2. 检查OpenCode状态
opencode status

# 3. 测试基本功能
opencode
# 然后输入：帮我创建一个简单的HTML页面

# 4. 检查模型连接
opencode models
```

### 8.2 成功标志

- ✅ `opencode --version` 显示版本号
- ✅ 能正常启动OpenCode
- ✅ 能与AI对话并获得回复
- ✅ 能生成简单的代码

---

## 九、故障排查

### 9.1 网络问题

**症状**：无法连接到AI模型

**解决方案**：
1. 检查网络连接
2. 检查防火墙设置
3. 尝试使用代理
4. 检查API Key是否有效

### 9.2 性能问题

**症状**：响应缓慢

**解决方案**：
1. 选择更快的模型（如Qwen-Turbo）
2. 检查网络延迟
3. 减少上下文长度
4. 关闭不必要的功能

### 9.3 生成质量问题

**症状**：生成的代码不符合预期

**解决方案**：
1. 使用更强大的模型（如Claude 3.5）
2. 提供更详细的提示词
3. 分步骤描述需求
4. 提供示例代码

---

## 十、相关资源

### 10.1 官方资源

- **官网**：https://opencode.ai
- **GitHub**：https://github.com/anomalyco/opencode
- **文档**：https://opencode.ai/docs
- **Discord社区**：https://discord.gg/opencode

### 10.2 模型资源

- **阿里云百炼**（Qwen）：https://bailian.console.aliyun.com/
- **OpenAI**（GPT）：https://platform.openai.com
- **Anthropic**（Claude）：https://www.anthropic.com

### 10.3 学习资源

- OpenCode官方文档
- React官方教程：https://react.dev
- Vite官方文档：https://vitejs.dev

---

## 十一、培训注意事项

### 11.1 Pre-Lesson准备

学员需要在**Pre-Lesson第3次直播前**完成：
- [ ] OpenCode安装
- [ ] 账号登录配置
- [ ] 模型选择和配置
- [ ] 简单功能测试

### 11.2 Day 4准备

Day 4前端开发前，需要：
- [ ] 熟悉OpenCode基本使用
- [ ] 完成React项目创建练习
- [ ] 了解Vibe Coding工作方式

### 11.3 常见培训问题

**问题1**：忘记配置API Key
**解决**：直播时会演示配置流程

**问题2**：模型响应慢
**解决**：选择Qwen-Turbo或国内模型

**问题3**：生成的代码有bug
**解决**：正常现象，需要人工审查和调试

---

**文档版本**：v1.0  
**最后更新**：2024年3月3日  
**维护人**：讲师团队
