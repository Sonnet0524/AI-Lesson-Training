---
description: Frontend Team - Day1课程HTML页面开发
  负责开发精美的交互式HTML教学页面
  包含动画效果、流程图可视化、响应式设计
type: subagent
---

# Frontend Team - HTML页面开发

## 🎯 任务目标

开发 **Day 1下午课程** 的精美交互式HTML页面：

**交付物**:
- `index.html` - 主页面，包含完整课程内容展示
- `css/style.css` - 样式文件，精美视觉设计
- `js/interactive.js` - 交互脚本，动画和交互效果

---

## 🎨 设计要求

### 视觉风格
- **主题**: 科技感、专业、现代
- **配色**: 深色背景 + 亮色强调 (建议: 深蓝/紫色系)
- **字体**: 清晰易读，层次分明
- **布局**: 响应式设计，支持PC/平板/手机

### 交互要求
1. **导航**:
   - 固定顶部导航栏
   - 平滑滚动到各课时
   - 当前章节高亮

2. **动画效果**:
   - 页面加载动画
   - 滚动触发动画 (fade-in, slide-up)
   - 卡片悬停效果
   - 流程图逐步显示动画

3. **流程图可视化**:
   - RPAR循环图 (SVG/CSS动画)
   - 工具演进阶梯图
   - 架构层次图
   - 支持交互: 点击展开详情

4. **交互组件**:
   - 可展开/收起的内容块
   - Tab切换展示不同范式
   - 代码块高亮
   - 复制按钮

### 页面结构
```html
<!-- 导航栏 -->
<nav>...</nav>

<!-- Hero区域: 课程标题 -->
<section id="hero">...</section>

<!-- 课时1: Agent本质与RPAR -->
<section id="hour1">
  <!-- RPAR循环动画 -->
  <!-- 对比表格 -->
  <!-- 内容卡片 -->
</section>

<!-- 课时2: RPAR实例与Acting -->
<section id="hour2">
  <!-- 范式对比Tab -->
  <!-- Acting四象限 -->
  <!-- 白板示意图 -->
</section>

<!-- 课时3: 工具演进 -->
<section id="hour3">
  <!-- 演进阶梯动画 -->
  <!-- 架构图 -->
  <!-- 封装层次 -->
</section>

<!-- 总结 -->
<section id="summary">...</section>

<!-- 页脚 -->
<footer>...</footer>
```

---

## 🛠️ 技术要求

### 技术栈
- **HTML5**: 语义化标签
- **CSS3**: Flexbox/Grid布局, 动画, 渐变
- **JavaScript**: ES6+, 原生JS (不依赖大型框架)
- **可选**: 
  - GSAP (动画库)
  - Prism.js (代码高亮)
  - Intersection Observer API (滚动动画)

### 性能要求
- 首屏加载 < 3秒
- 动画流畅 60fps
- 响应式适配

---

## 📁 输出位置

```
html/day1-pm/
├── index.html
├── css/
│   └── style.css
└── js/
    └── interactive.js
```

---

## ✅ 验收标准

- [ ] 3个课时的完整展示
- [ ] 至少5种动画效果
- [ ] RPAR循环可视化 (带动画)
- [ ] 工具演进图可视化
- [ ] 响应式布局 (PC/平板/手机)
- [ ] 导航和交互功能完整
- [ ] 代码规范，注释清晰
- [ ] 提交Git并生成报告

---

## 🚀 工作流程

1. 读取本文件理解任务
2. 创建HTML/CSS/JS文件
3. 开发页面结构和样式
4. 添加交互和动画
5. 测试响应式
6. 自我检查
7. 写入报告: `reports/frontend-team-report.md`
8. 提交Git

---

## 📚 内容参考

Content Team将在 `docs/day1-pm/` 产出内容文档，可作为参考：
- content-outline.md
- hour1-content.md
- hour2-content.md
- hour3-content.md

---

**委托**: PM Agent  
**截止日期**: 尽快完成  
**质量标准**: 可直接用于课堂投影展示
