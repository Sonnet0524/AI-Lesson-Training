# Skills样例问题分析报告

**分析时间**: 2026-03-22  
**分析对象**: 3个Skills样例（投资效益分析、项目进度追踪、智能工单处理）  
**参考标准**: Claude Code官方文档 (https://docs.anthropic.com/en/docs/claude-code/skills)

---

## ❌ 发现的问题

### 问题1: 缺少必需的`trigger`字段

**官方标准**: Frontmatter必须有4个字段
```yaml
---
name: skill-name
description: What it does AND when to trigger it.  # 必须包含触发条件
trigger: always | on_demand | pattern_match
tags: tag1, tag2
---
```

**当前样例**: ❌ 缺少`trigger`字段
```yaml
name: "investment_analyzer"
description: "投资效益分析专家，帮助用户分析投资项目的ROI、评估风险、生成报告"
# ❌ 缺少 trigger: on_demand
# ❌ 缺少 tags
```

**影响**: AI不知道何时自动加载该Skill

---

### 问题2: `description`不包含触发条件

**官方标准**: 
> "description: What it does AND when to trigger it."
> description必须包含**功能描述 + 触发条件**

**当前样例**: ❌ 只有功能描述，没有触发条件
```yaml
# ❌ 错误示例
description: "投资效益分析专家，帮助用户分析投资项目的ROI、评估风险、生成报告"

# ✅ 正确示例
description: "投资效益分析专家，帮助用户分析投资项目的ROI。当用户需要分析投资项目效益、计算ROI、评估投资风险时使用。"
```

---

### 问题3: `tools`字段使用不当

**官方标准**: 
- 使用`allowed-tools`在frontmatter中限制工具
- 或者不使用，让Claude自己决定
- 不是在prompt后面列出

**当前样例**: ❌ tools位置错误
```yaml
prompt: |
  你是一位...

tools:  # ❌ 这不是官方标准字段
  - query_investment_data
  - execute_code
```

**正确做法**:
```yaml
---
name: investment-analyzer
description: ...
trigger: on_demand
tags: analysis, investment
allowed-tools: Read, Grep, Bash(query_investment_data)  # ✅ 使用allowed-tools
---

你的任务...
```

---

### 问题4: `metadata`字段非标准

**官方标准**: 只有4个必需字段（name, description, trigger, tags），其他都是可选扩展

**当前样例**: ❌ 使用了非标准的metadata
```yaml
metadata:  # ❌ 这不是官方标准字段
domain: "电力投资"
scenarios:
  - "月度投资效益分析"
permissions: ["investment_manager", "auditor"]
```

**建议**: 
- 移除metadata字段
- 如需描述场景，放在description中
- 如需权限控制，通过系统层面控制，不是Skill字段

---

### 问题5: `prompt:`前缀不符合惯例

**官方标准**: 
- Frontmatter使用`---`分隔
- 正文直接写Markdown，不需要`prompt:`前缀
- 或者使用`---`后直接写内容

**当前样例**: ❌ 使用了非标准格式
```yaml
name: "investment_analyzer"
description: "..."

prompt: |  # ❌ 不需要这个前缀
  你是一位电力行业投资效益分析专家...
```

**正确做法**:
```yaml
---
name: investment-analyzer
description: "投资效益分析专家。当用户需要分析投资项目ROI时触发。"
trigger: on_demand
tags: analysis, investment
---

你是一位电力行业投资效益分析专家。你的任务是帮助用户分析投资项目的效益情况。

## 分析流程
1. ...
```

---

### 问题6: 内容过于冗长

**官方标准**: 
- SKILL.md body < 200行
- Keep it concise

**当前样例**: 
- 第一个示例约50行（可接受）
- 但可以更精简
- 详细内容应放到references/中

---

### 问题7: 缺少高级特性展示

**官方标准支持的高级特性**:
- `$ARGUMENTS` - 接收参数
- `$0`, `$1` - 访问特定参数
- `!`<command>`` - 动态内容注入
- `context: fork` - 在子agent中运行
- `disable-model-invocation: true` - 禁止自动触发
- `user-invocable: false` - 用户不可见

**当前样例**: ❌ 完全没有展示这些特性

---

## 📝 优化建议

### 优化1: 使用标准4字段Frontmatter

```yaml
---
name: investment-analyzer
description: "投资效益分析专家，帮助用户分析投资项目的ROI、评估风险、生成报告。当用户询问投资效益、ROI计算、项目评估时触发。"
trigger: on_demand
tags: investment, analysis, roi
---

你是一位电力行业投资效益分析专家...
```

### 优化2: 添加参数支持

```yaml
---
name: investment-analyzer
description: "分析投资项目ROI。使用: /investment-analyzer [项目ID列表]"
trigger: on_demand
tags: investment, analysis
---

分析投资项目 $ARGUMENTS 的效益情况：

1. 查询项目数据
2. 计算ROI
3. 生成报告

如需查看详细公式，参考：references/roi_formula.md
```

### 优化3: 使用动态内容注入

```yaml
---
name: pr-summary
description: "总结Pull Request的变更。当用户需要review PR时触发。"
trigger: on_demand
tags: git, review
---

总结以下PR变更：

PR Diff:
!`gh pr diff`

PR Comments:
!`gh pr view --comments`

请提供：
1. 变更概述
2. 关键改动点
3. 潜在风险
```

### 优化4: 限制工具访问

```yaml
---
name: safe-reader
description: "只读模式浏览代码。当用户需要查看但不修改代码时触发。"
trigger: on_demand
tags: read-only
allowed-tools: Read, Grep, Glob  # 只允许读取工具
---

帮助你浏览和理解代码...
```

### 优化5: 展示渐进式披露

```yaml
---
name: investment-analyzer
description: "投资效益分析专家。当用户需要分析投资项目时使用。"
trigger: on_demand
tags: investment
---

你是一位电力行业投资效益分析专家。

## 快速分析流程
1. 了解项目范围
2. 查询数据并计算ROI
3. 生成简要报告

## 深度分析（按需使用）
- 复杂计算脚本: `scripts/roi_calculator.py`
- 行业基准数据: `references/industry_benchmarks.md`
- 报告模板: `templates/report_template.md`
```

---

## 🎯 修正后的完整示例

### 示例1: 投资效益分析（优化版）

```yaml
---
name: investment-analyzer
description: "投资效益分析专家，计算项目ROI并生成评估报告。当用户询问'分析投资效益'、'计算ROI'、'投资项目评估'时触发。"
trigger: pattern_match
tags: investment, roi, analysis
---

你是一位电力行业投资效益分析专家。

## 分析流程
1. 了解用户要分析的项目ID或项目名称
2. 使用query_investment_data工具查询数据
3. 使用execute_code计算ROI
4. 根据ROI值给出评估等级
5. 生成包含图表的分析报告

## 评估标准
- ROI > 15%: 优秀
- ROI 8-15%: 良好
- ROI < 8%: 需关注

## 详细参考（按需加载）
- 计算公式: `references/roi_formula.md`
- 行业基准: `references/industry_benchmarks.md`
- 计算脚本: `scripts/roi_calculator.py`

## 输出要求
报告必须包含：
1. 执行摘要（关键发现）
2. 详细数据和分析
3. 可视化图表
4. 改进建议
```

### 示例2: 项目进度追踪（优化版）

```yaml
---
name: project-tracker
description: "追踪项目进度，识别延期风险。当用户询问'项目进度如何'、'检查延期风险'、'生成项目报告'时触发。"
trigger: pattern_match
tags: project, tracking, management
---

你是一位项目管理专家，负责监控项目进度和风险。

## 工作流程
1. 获取用户要监控的项目标识
2. 查询项目当前状态和里程碑完成情况
3. 评估延期风险
4. 生成进度报告和风险预警

## 风险等级
- 🟢 正常：进度在计划范围内
- 🟡 延期风险：预计延期7天内
- 🔴 已延期：延期超过7天
- 🚀 提前：进度超前

## 支持文件
- 项目状态查询: `scripts/get_project_status.py`
- 风险评估算法: `references/risk_assessment.md`
- 报告模板: `templates/progress_report.md`
```

### 示例3: 智能工单处理（优化版）

```yaml
---
name: workorder-processor
description: "智能处理故障工单，自动分类、诊断、推荐解决方案。当用户提交工单、询问'处理工单'、'故障诊断'时触发。"
trigger: on_demand
tags: workorder, diagnosis, support
---

你是一位智能工单处理专家，帮助快速诊断和解决故障。

## 处理流程
1. 读取工单内容和症状描述
2. 根据关键词自动分类故障类型
3. 查询知识库匹配相似案例
4. 推荐解决方案
5. 如果需要，升级到人工处理

## 故障分类
- 设备故障：变压器、线路、开关等
- 系统故障：监控系统、通信系统
- 用户故障：用电异常、计费问题

## 参考资源
- 故障知识库: `references/troubleshooting_guide.md`
- 解决方案库: `references/solutions/`（按需加载）
- 自动分类脚本: `scripts/classify_workorder.py`
```

---

## 📊 优化总结

| 问题 | 严重度 | 优化方案 |
|------|--------|---------|
| 缺少trigger字段 | 🔴 高 | 添加trigger: on_demand/pattern_match |
| description不完整 | 🔴 高 | 添加触发条件说明 |
| tools字段位置错误 | 🟡 中 | 改用allowed-tools或移除 |
| metadata非标准 | 🟡 中 | 移除或改为正文描述 |
| prompt:前缀 | 🟡 中 | 使用---分隔符 |
| 缺少高级特性 | 🟢 低 | 添加$ARGUMENTS、动态注入等示例 |

---

## ✅ 建议的行动

1. **立即修正**:
   - 为所有3个示例添加`trigger`字段
   - 更新`description`包含触发条件
   - 使用`---`分隔符代替`prompt:`

2. **建议优化**:
   - 移除`metadata`字段
   - 修正`tools`字段（改用`allowed-tools`或移除）
   - 添加`$ARGUMENTS`使用示例
   - 添加动态内容注入示例

3. **最佳实践补充**:
   - 展示渐进式披露（references/scripts引用）
   - 添加注释说明哪些内容是可选的

---

**报告生成**: PM Agent  
**状态**: 🔍 分析完成，等待优化指令
