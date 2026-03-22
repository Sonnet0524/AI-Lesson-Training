# PDF生成最佳实践

## 字体选择

### 中文字体推荐
- **标题**: 思源黑体 (Source Han Sans CN) / 微软雅黑
- **正文**: 思源宋体 (Source Han Serif CN) / 宋体
- **代码**: JetBrains Mono / Fira Code / Consolas

### 字体回退策略
```css
font-family: 
    "Source Han Sans CN",     /* 首选 */
    "Noto Sans SC",           /* 备选1 */
    "Microsoft YaHei",        /* 备选2 */
    "SimHei",                 /* 备选3 */
    sans-serif;               /* 最终回退 */
```

## 页面设置

### A4纸张尺寸
- 宽度: 210mm
- 高度: 297mm
- 常用页边距:
  - 上下: 25mm
  - 左右: 20mm

### 打印优化
```css
@media print {
    body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
}
```

## 排版规则

### 行高
- 正文: 1.6 - 1.8
- 标题: 1.2 - 1.4
- 代码: 1.4 - 1.6

### 字号
- 正文: 10-12pt
- 一级标题: 20-24pt
- 二级标题: 14-16pt
- 三级标题: 12-14pt
- 代码: 9-10pt

### 间距
- 段落间距: 1em
- 标题上方: 1.5em
- 标题下方: 0.8em
- 列表项间距: 0.5em

## 颜色方案

### 国网配色
```css
:root {
    --primary-green: #009944;    /* 国网绿 */
    --primary-dark: #007a37;     /* 深绿 */
    --secondary-blue: #1a365d;   /* 深蓝 */
    --accent-orange: #ff6b35;    /* 强调橙 */
}
```

### 中性色
```css
:root {
    --text-primary: #1a202c;     /* 主文字 */
    --text-secondary: #4a5568;   /* 次要文字 */
    --text-muted: #718096;       /* 弱化文字 */
    --bg-light: #f7fafc;         /* 浅色背景 */
    --border-color: #e2e8f0;     /* 边框色 */
}
```

## 分页控制

### 避免孤行寡行
```css
p, li {
    orphans: 3;
    widows: 3;
}
```

### 避免元素内部分页
```css
pre, blockquote, table, img {
    page-break-inside: avoid;
    break-inside: avoid;
}
```

### 标题控制
```css
h1, h2, h3 {
    page-break-after: avoid;
    break-after: avoid;
}
```

### 章节分页
```css
.chapter {
    page-break-before: always;
    break-before: page;
}
```

## 图片处理

### 响应式图片
```css
img {
    max-width: 100%;
    height: auto;
    display: block;
}
```

### 图片居中
```css
img {
    margin: 1.5em auto;
    display: block;
}
```

### 图片说明
```html
<figure>
    <img src="image.png" alt="描述">
    <figcaption>图1: 图片说明</figcaption>
</figure>
```

## 表格优化

### 表格样式
```css
table {
    width: 100%;
    border-collapse: collapse;
    page-break-inside: avoid;
}

th {
    background: #1a365d;
    color: white;
}

tr:nth-child(even) {
    background: #f7fafc;
}
```

### 表格分页
```css
@media print {
    thead {
        display: table-header-group;
    }
    
    tr {
        page-break-inside: avoid;
    }
}
```

## 代码块样式

### 深色主题
```css
pre {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    page-break-inside: avoid;
}
```

### 代码高亮颜色
```css
.hljs-keyword { color: #c586c0; }
.hljs-string { color: #ce9178; }
.hljs-number { color: #b5cea8; }
.hljs-comment { color: #6a9955; }
.hljs-function { color: #dcdcaa; }
```

## 生成工具对比

### Playwright + Paged.js
**优点:**
- 支持现代CSS特性
- 可以执行JavaScript
- 页眉页脚控制灵活
- 字体渲染优秀

**缺点:**
- 需要安装浏览器
- 转换速度较慢
- 依赖较多

### WeasyPrint
**优点:**
- 纯Python实现
- 支持大部分CSS
- 转换速度快
- 易于集成

**缺点:**
- JavaScript支持有限
- 某些CSS特性不支持
- 字体配置复杂

### wkhtmltopdf
**优点:**
- 轻量级
- 转换速度快
- 跨平台

**缺点:**
- 基于旧版WebKit
- 现代CSS支持有限
- 维护不活跃

### Puppeteer
**优点:**
- Chrome DevTools Protocol
- 功能强大
- 社区活跃

**缺点:**
- 需要Node.js
- 安装包较大

## 性能优化

### 减少文件大小
1. 压缩图片（使用WebP格式）
2. 使用字体子集
3. 移除未使用的CSS
4. 最小化HTML

### 加快转换速度
1. 减少网络请求（使用本地资源）
2. 禁用不必要的JavaScript
3. 使用CSS代替图片
4. 分批处理大文档

## 常见问题

### 中文字体不显示
- 确保字体文件存在
- 检查字体名称拼写
- 使用字体回退栈
- 安装中文字体

### 分页异常
- 检查page-break属性
- 避免使用float
- 使用display: block
- 调整元素尺寸

### 颜色丢失
- 使用print-color-adjust
- 避免使用透明度过低的颜色
- 检查CSS变量定义

### 页眉页脚不显示
- 检查@page规则
- 确认内容区域足够
- 检查margin设置

## 质量检查清单

### 内容检查
- [ ] 所有章节完整
- [ ] 图片清晰可读
- [ ] 表格正确显示
- [ ] 代码高亮正确
- [ ] 链接可点击

### 排版检查
- [ ] 页边距一致
- [ ] 页码连续
- [ ] 标题层级正确
- [ ] 字体大小合适
- [ ] 行高舒适

### 打印检查
- [ ] 背景色打印正常
- [ ] 图片清晰
- [ ] 分页合理
- [ ] 页眉页脚正确
- [ ] 文件大小适中
