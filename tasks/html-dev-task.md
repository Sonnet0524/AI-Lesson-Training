# Task: Day1下午课程HTML页面开发

**委托**: PM Agent  
**执行**: Frontend Team  
**优先级**: P0 - 高  
**截止日期**: 2026-03-22

---

## 🎯 任务目标

开发 **Day 1下午课程** 的精美交互式HTML页面，用于课堂教学展示。

---

## 📁 交付物

在 **`/Users/sonnet/opencode/AI-Lesson-Training/html/day1-pm/`** 目录下创建：

```
html/day1-pm/
├── index.html              # 主页面 (完整课程展示)
├── css/
│   └── style.css          # 样式文件
└── js/
    └── interactive.js     # 交互脚本
```

---

## 🎨 设计要求

### 整体风格
- **主题**: 科技感、专业、AI/Agent主题
- **配色方案**: 
  - 深色背景: #1a1a2e 或 #0f0f1e
  - 主色: #667eea (紫色)
  - 强调色: #764ba2 (深紫)
  - 文字: #ffffff (白) / #e0e0e0 (浅灰)
- **字体**: 
  - 标题: 无衬线粗体 (system-ui, -apple-system)
  - 正文: 清晰可读的无衬线字体

### 页面结构

#### 1. 固定导航栏
- 左侧: 课程标题 "Day 1: Agentic AI 设计范式"
- 右侧: 三课时导航链接 (Hour 1/2/3)
- 效果: 滚动时显示/隐藏，当前章节高亮

#### 2. Hero区域 (首屏)
- 大标题: "Agentic AI 设计范式"
- 副标题: "从RPAR框架到工程实现"
- 课程信息: Day 1 下午 | 120分钟
- 背景: 渐变动画或粒子效果
- 向下滚动指示动画

#### 3. 课时1区域 (Agent本质与RPAR)
**id="hour1"**

包含组件:
- **章节标题**: "Hour 1: Agent本质与RPAR框架" (40分钟)
- **对比卡片组**:
  - Agent vs 传统AI (执行能力)
  - Workflow vs Agentic (自主规划)
  - 卡片悬停翻转效果
- **RPAR循环图** (重点):
  - SVG绘制的四象限循环
  - 动画: 依次点亮 Reasoning → Planning → Acting → Reflection
  - 点击每个环节展开详情
- **内容区块**:
  - 可展开/收起的知识点卡片
  - 关键金句高亮显示

#### 4. 课时2区域 (RPAR实例与Acting)
**id="hour2"**

包含组件:
- **章节标题**: "Hour 2: RPAR实例与Acting详解" (40分钟)
- **范式对比Tab**:
  - Tab 1: ReAct (R-A-R)
  - Tab 2: Plan-and-Execute (R-P-A)
  - Tab 3: 完整RPAR (R-P-A-R)
  - 切换动画: 滑动过渡
- **Acting四象限**:
  - 2x2网格展示四类Acting
  - 图标 + 标题 + 描述
  - 悬停放大效果
- **白板示意图** (CSS绘制):
  - 简化的Agent架构图
  
#### 5. 课时3区域 (工具演进)
**id="hour3"**

包含组件:
- **章节标题**: "Hour 3: 工具演进与封装" (40分钟)
- **演进阶梯动画** (重点):
  - 阶梯式布局: API → MCP → Tools → Skills → RPAR
  - 滚动触发: 每个阶梯依次升起
  - 连接线动画
- **架构层次图**:
  - 分层展示: API层 / MCP层 / Tools层 / Skills层 / RPAR层
  - 每层可点击展开详情
- **封装对比表**:
  - Tools vs Code Tools vs Skills
  - 美观的表格样式

#### 6. 总结区域
**id="summary"**

- 核心要点回顾 (3-4个 bullet points)
- RPAR循环图再次出现 (静态)
- 下节课预告

#### 7. 页脚
- 版权信息
- 回到顶部按钮

---

## 🛠️ 技术要求

### HTML结构
- 使用语义化标签 (section, nav, article等)
- 良好的class命名规范 (BEM或类似)
- 注释清晰

### CSS要求
- 使用CSS变量定义颜色主题
- Flexbox和Grid布局
- 响应式设计 (断点: 768px, 1024px)
- 动画使用CSS transitions和keyframes
- 可选: 使用CSS绘制简单图形

### JavaScript要求
- ES6+语法
- 功能模块化
- 事件处理: 滚动监听、点击交互
- 动画库 (可选): GSAP 或 原生Web Animations API
- Intersection Observer API 用于滚动触发动画

### 性能要求
- 首屏加载 < 3秒
- 动画流畅 60fps
- 支持主流浏览器 (Chrome, Firefox, Safari, Edge)

---

## 🎬 动画效果清单

必须包含以下动画:

1. **页面加载动画** (1个)
   - Hero标题淡入 + 上滑
   - 时长: 0.8s

2. **滚动触发动画** (至少3个)
   - 内容区块进入视口时 fade-in + translateY
   - 使用Intersection Observer

3. **RPAR循环动画** (重点)
   - 四个环节依次高亮 (reasoning → planning → acting → reflection)
   - 循环播放或点击触发
   - 连线动画

4. **阶梯升起动画** (1个)
   - API→MCP→Tools→Skills→RPAR 阶梯依次升起
   - 滚动触发

5. **悬停效果** (多个)
   - 卡片悬停: 轻微上浮 + 阴影加深
   - 按钮悬停: 背景色变化
   - Tab切换: 下划线滑动

6. **导航交互** (1个)
   - 平滑滚动到锚点
   - 当前章节指示器变化

---

## ✅ 验收标准

- [ ] 完整的3课时内容展示
- [ ] 至少6种动画效果实现
- [ ] RPAR循环可视化 (带动画)
- [ ] 工具演进阶梯可视化 (带动画)
- [ ] 响应式布局适配 (PC/平板/手机)
- [ ] 导航功能完整
- [ ] 代码规范，有注释
- [ ] 无控制台报错
- [ ] 文件已提交到Git

---

## 📁 输出路径

```
/Users/sonnet/opencode/AI-Lesson-Training/html/day1-pm/
├── index.html
├── css/
│   └── style.css
└── js/
    └── interactive.js
```

---

## 🚀 执行步骤

1. 创建输出目录结构
2. 编写HTML骨架和基本结构
3. 开发CSS样式 (响应式布局)
4. 添加基础交互 (导航、展开/收起)
5. 实现动画效果
6. 测试响应式
7. 优化性能
8. 提交Git
9. 生成报告到 `reports/frontend-team-report.md`

---

## 📚 内容参考

可参考 Content Team 产出的内容文档:
- `/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm/content-outline.md`
- `/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm/hour1-content.md`
- `/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm/hour2-content.md`
- `/Users/sonnet/opencode/AI-Lesson-Training/docs/day1-pm/hour3-content.md`

---

**完成后**: 写入报告到 `reports/frontend-team-report.md`，通知PM Agent验收
