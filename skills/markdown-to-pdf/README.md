# Markdown to PDF 转换技能

将Markdown培训讲稿转换为编排精美的PDF文档。

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
playwright install chromium
```

### 2. 一键转换

```bash
python scripts/batch-convert.py
```

### 3. 查看输出

转换后的文件位于：
- **HTML**: `exports/html/`
- **PDF**: `exports/pdf/`
- **图表**: `exports/html/diagrams/`

## 目录结构

```
markdown-to-pdf/
├── SKILL.md                      # 技能定义文档
├── requirements.txt              # Python依赖
├── scripts/                      # 转换脚本
│   ├── __init__.py
│   ├── batch-convert.py         # 一键批量转换
│   ├── md-to-html.py            # Markdown转HTML
│   ├── ascii-to-image.py        # ASCII图转图片
│   ├── generate-diagrams.py     # Mermaid图生成
│   └── html-to-pdf.py           # HTML转PDF
├── templates/                    # 模板文件
│   ├── base-template.html       # HTML基础模板
│   └── css/
│       └── print.css            # 打印样式
├── references/                   # 参考文档
│   ├── markdown-syntax.md       # Markdown语法参考
│   └── pdf-best-practices.md    # PDF最佳实践
└── exports/                      # 输出目录
    ├── html/                     # HTML输出
    ├── pdf/                      # PDF输出
    └── html/diagrams/            # 图表图片
```

## 使用方式

### 方式一：批量转换（推荐）
```bash
cd skills/markdown-to-pdf
python scripts/batch-convert.py
```

### 方式二：分步执行
```bash
cd skills/markdown-to-pdf

# 步骤1：Markdown转HTML
python scripts/md-to-html.py --all

# 步骤2：生成ASCII图
python scripts/ascii-to-image.py --all

# 步骤3：生成Mermaid图
python scripts/generate-diagrams.py --all

# 步骤4：HTML转PDF
python scripts/html-to-pdf.py --all
```

### 方式三：转换单个文件
```bash
python scripts/md-to-html.py --input ../../../docs/day1-pm/hour1-content.md
```

## 功能特性

### 支持的Markdown语法
- ✅ 标准Markdown语法
- ✅ 表格（斑马纹样式）
- ✅ 代码块（语法高亮）
- ✅ 引用块（左侧边框样式）
- ✅ 列表（自定义bullet样式）
- ✅ 标题（层级分明，带锚点）

### 图表转换
- ✅ ASCII字符图 → PNG图片
- ✅ Mermaid流程图 → 图形化图片
- ✅ Mermaid时序图 → 图形化图片
- ✅ Mermaid甘特图 → 图形化图片

### 排版特性
- ✅ 专业封面设计（国网风格）
- ✅ 自动生成目录
- ✅ 页眉页脚
- ✅ 页码
- ✅ A4纸张优化
- ✅ 打印优化

## 设计规范

### 配色方案
- **主色（国网绿）**: #009944
- **辅色（深蓝）**: #1a365d
- **强调色（橙色）**: #ff6b35

### 字体配置
- **标题**: Source Han Sans CN / Microsoft YaHei
- **正文**: Source Han Serif CN / SimSun
- **代码**: JetBrains Mono / Fira Code

### 页面设置
- **纸张**: A4 (210mm × 297mm)
- **方向**: 纵向
- **页边距**: 上下25mm，左右20mm

## 输入文件

位于 `../../../docs/day1-pm/`:
- `content-outline.md`
- `hour1-content.md`
- `hour2-content.md`
- `hour3-content.md`

## 输出文件

位于 `exports/pdf/`:
- `day1-content-outline.pdf`
- `day1-hour1-content.pdf`
- `day1-hour2-content.pdf`
- `day1-hour3-content.pdf`

## 故障排除

### 依赖问题
```bash
# 如果playwright安装失败
pip install --upgrade pip
pip install playwright
playwright install chromium
```

### 字体问题
确保系统已安装中文字体:
- macOS: 系统自带
- Linux: `sudo apt-get install fonts-noto-cjk`
- Windows: 系统自带

### 权限问题
```bash
chmod +x scripts/*.py
```

## 更新日志

### v1.0.0 (2024-03-22)
- ✨ 初始版本发布
- ✨ 支持完整Markdown转换流程
- ✨ 支持ASCII图和Mermaid图
- ✨ 专业PDF排版

## 许可证

内部培训使用
