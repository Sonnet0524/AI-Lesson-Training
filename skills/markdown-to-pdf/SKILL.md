---
name: markdown-to-pdf
description: "将Markdown培训讲稿转换为编排精美的PDF文档。支持字符图转图片、Mermaid流程图转图形、专业排版。"
trigger: on_demand
tags: markdown, pdf, training, documentation
---

# Markdown转PDF自动化工具

## 功能概述
将Day1培训讲稿从Markdown格式转换为专业排版的PDF文档。

## 处理流程
1. 解析Markdown文件
2. 提取并转换ASCII字符图为图片
3. 将Mermaid流程图转换为图形化图片
4. 应用专业排版模板生成HTML
5. 转换HTML为高质量PDF

## 输入文件
位于 docs/day1-pm/ 目录：
- content-outline.md
- hour1-content.md
- hour2-content.md
- hour3-content.md

## 输出文件
位于 skills/markdown-to-pdf/exports/ 目录：
- pdf/day1-content-outline.pdf
- pdf/day1-hour1-content.pdf
- pdf/day1-hour2-content.pdf
- pdf/day1-hour3-content.pdf

## 安装依赖

```bash
# 安装Python依赖
pip install markdown pymdown-extensions pygments pillow playwright graphviz jinja2 beautifulsoup4

# 安装Playwright浏览器
playwright install chromium
```

## 使用方法

### 方式一：一键转换（推荐）
```bash
cd skills/markdown-to-pdf
python scripts/batch-convert.py
```

### 方式二：分步执行
```bash
cd skills/markdown-to-pdf

# 步骤1：Markdown转HTML
python scripts/md-to-html.py

# 步骤2：生成图表（ASCII图和Mermaid图）
python scripts/generate-diagrams.py

# 步骤3：HTML转PDF
python scripts/html-to-pdf.py
```

### 方式三：转换单个文件
```bash
python scripts/md-to-html.py --input ../../../docs/day1-pm/hour1-content.md --output exports/html/
python scripts/generate-diagrams.py --input exports/html/hour1-content.html
python scripts/html-to-pdf.py --input exports/html/hour1-content.html --output exports/pdf/day1-hour1-content.pdf
```

## 支持的图表类型

### 1. ASCII字符图
自动检测Markdown中以```ascii或```diagram标记的代码块，转换为高质量PNG图片。

### 2. Mermaid流程图
支持以下Mermaid图表类型：
- flowchart（流程图）
- sequenceDiagram（时序图）
- gantt（甘特图）
- classDiagram（类图）
- stateDiagram（状态图）
- erDiagram（实体关系图）
- journey（用户旅程图）
- pie（饼图）

### 3. 自定义图表
使用PIL/Pillow手动绘制的图表：
- 架构图
- 对比图
- 层级图

## 设计规范

### 页面设置
- 纸张：A4 (210mm × 297mm)
- 方向：纵向
- 页边距：上下25mm，左右20mm
- 打印优化：启用

### 字体配置
- 标题字体：Source Han Sans CN Bold / Noto Sans SC Bold
- 正文字体：Source Han Serif CN Regular / Noto Sans SC Regular
- 代码字体：JetBrains Mono / Fira Code
- 备选字体：Microsoft YaHei, SimHei, sans-serif

### 配色方案
- 主色（国网绿）：#009944
- 辅色（深蓝）：#1a365d
- 强调色（橙色）：#ff6b35
- 代码背景：#f5f5f5
- 引用边框：#009944
- 表格斑马纹：#f8f9fa

### 排版规则
- 正文行高：1.8
- 代码块行高：1.6
- 段落间距：1em
- 标题层级：H1-H6，层级递减

## 错误处理

脚本包含完善的错误处理机制：
- 文件不存在时提示明确错误
- 转换失败时记录日志
- 部分失败时继续处理其他文件
- 生成详细的转换报告

## 日志输出

转换过程会在控制台输出进度信息：
```
[INFO] 开始批量转换...
[INFO] 处理: content-outline.md
[OK]   HTML生成成功: exports/html/content-outline.html
[OK]   图表生成成功: 2个图表
[OK]   PDF生成成功: exports/pdf/day1-content-outline.pdf
[INFO] 处理: hour1-content.md
...
[INFO] 转换完成! 成功: 4, 失败: 0
```

## 自定义配置

可通过修改 `scripts/config.py` 自定义：
- 输入/输出路径
- 字体设置
- 配色方案
- 页面尺寸
- 图表样式

## 注意事项

1. 确保已安装所有依赖
2. 首次运行Playwright需下载浏览器
3. 中文字体需要系统支持
4. 大文件转换可能需要较长时间
5. 建议先在测试文件上验证

## 更新日志

### v1.0.0 (2024-03-22)
- 初始版本发布
- 支持Markdown转HTML
- 支持ASCII图转PNG
- 支持Mermaid图渲染
- 支持HTML转PDF
- 支持批量转换
