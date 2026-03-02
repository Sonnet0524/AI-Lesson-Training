# Pre-Lesson 第3次直播：Vibe Coding环境准备

## 基本信息

**时间**：Day 1 前1天

**总时长**：90分钟（授课60分钟 + 交流30分钟）

**学习目标**：
- 完成Node.js安装
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
| opencode | 最新版 | AI编程助手 |
| VS Code | 最新版 | 代码编辑器（推荐） |
| Git | 最新版 | 版本控制（可选） |

**安装顺序**：
```
步骤1：安装 Node.js
步骤2：安装 VS Code
步骤3：安装 Git（可选）
步骤4：安装 opencode
步骤5：验证环境
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

### Part 3：opencode安装与配置（20分钟）

#### 1. 下载安装（8分钟）

**安装方式**：

**方式1：官网下载**
```
步骤1：访问 opencode 官网（地址待补充）
步骤2：下载对应系统版本
步骤3：运行安装程序
```

**方式2：命令行安装**
```bash
# macOS/Linux
curl -fsSL https://opencode.ai/install.sh | sh

# Windows (PowerShell)
irm https://opencode.ai/install.ps1 | iex
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
