# Day3 实操指南：投资问效多智能体协作与Plan-Execute-Judge循环

## 课程目标

通过本实操指南，你将学会：
1. 设计多智能体协作架构（Task Planner + Worker Agents）
2. 实现Plan-Execute-Judge循环执行模式
3. 使用循环模块处理批量任务
4. 使用代码块进行复杂评分计算

**预计用时**：4课时（160分钟）

---

## 第一部分：多智能体架构设计（40分钟）

### 1.1 架构概述

投资问效系统采用**分层协作模式**：

```
┌─────────────────────────────────────────────────────────────────────┐
│                        多智能体协作架构                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                    主智能体（协调层）                      │    │
│   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│   │  │ Task Planner│  │  结果整合   │  │ 报告生成    │      │    │
│   │  │  任务规划   │  │   Agent     │  │   Agent     │      │    │
│   │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘      │    │
│   └─────────┼────────────────┼────────────────┼──────────────┘    │
│             │                │                │                    │
│             ▼                ▼                ▼                    │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                   子智能体（执行层）                       │    │
│   │                                                          │    │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│   │  │ 文档解析 │ │ 数据收集 │ │ 指标评分 │ │ 差异分析 │   │    │
│   │  │  Agent   │ │  Agent   │ │  Agent   │ │  Agent   │   │    │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│   │                                                          │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────┐    │
│   │                    工具层（API/函数）                      │    │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │    │
│   │  │  业务API │ │  知识库  │ │  代码块  │ │  文件解析 │   │    │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │    │
│   └──────────────────────────────────────────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 各智能体职责定义

#### **Task Planner Agent（任务规划器）**

**核心功能**：
- 解析用户输入（可研报告/查询请求）
- 分析任务依赖关系
- 生成结构化Action List

**输入**：
- 用户上传的可研报告文本
- 或项目检索号

**输出**：Action List（JSON格式）

```json
{
  "plan_id": "plan_001",
  "total_steps": 7,
  "actions": [
    {
      "step": 1,
      "flag": "REPORT_ANALYSIS",
      "description": "分析可研报告，提取关键字段",
      "depends_on": [],
      "input": {"report_text": "{{raw_report}}"},
      "expected_output": ["retrieval_no", "project_name", "forecast_load"]
    },
    {
      "step": 2,
      "flag": "GET_PROJECT_BASIC",
      "description": "获取项目基本信息",
      "depends_on": ["REPORT_ANALYSIS"],
      "input": {"retrieval_no": "{{step1.retrieval_no}}"},
      "expected_output": ["voltage_level", "project_type", "dates"]
    },
    {
      "step": 3,
      "flag": "GET_PROJECT_INVESTMENT",
      "description": "获取项目投资数据",
      "depends_on": ["REPORT_ANALYSIS"],
      "input": {"retrieval_no": "{{step1.retrieval_no}}"},
      "expected_output": ["estimated_cost", "actual_cost"]
    },
    {
      "step": 4,
      "flag": "GET_PROJECT_OPERATION",
      "description": "获取项目运行指标",
      "depends_on": ["REPORT_ANALYSIS"],
      "input": {"retrieval_no": "{{step1.retrieval_no}}"},
      "expected_output": ["load_data", "n1_rate", "device_load"]
    },
    {
      "step": 5,
      "flag": "SCORE_CALCULATION",
      "description": "计算8项指标评分",
      "depends_on": ["GET_PROJECT_BASIC", "GET_PROJECT_INVESTMENT", "GET_PROJECT_OPERATION"],
      "input": {
        "basic": "{{step2.output}}",
        "investment": "{{step3.output}}",
        "operation": "{{step4.output}}",
        "forecast": "{{step1.forecast_load}}"
      },
      "expected_output": ["scores", "total_score", "evaluations"]
    },
    {
      "step": 6,
      "flag": "GENERATE_REPORT",
      "description": "生成投资问效分析报告",
      "depends_on": ["SCORE_CALCULATION"],
      "input": {
        "all_data": "{{steps_1_5_outputs}}",
        "scores": "{{step5.scores}}"
      },
      "expected_output": ["report_markdown"]
    }
  ]
}
```

**灵搭配置**：
```
模块: 智能对话
系统提示词: |
  你是投资问效系统的任务规划助手。
  
  任务：
  1. 分析用户输入（可研报告文本或项目检索号）
  2. 确定需要执行的分析步骤
  3. 生成结构化的Action List
  
  可用工具（flag取值）：
  - REPORT_ANALYSIS: 分析可研报告
  - GET_PROJECT_BASIC: 获取项目基本信息
  - GET_PROJECT_INVESTMENT: 获取投资数据
  - GET_PROJECT_OPERATION: 获取运行指标
  - SCORE_CALCULATION: 计算8项指标评分
  - GENERATE_REPORT: 生成分析报告
  
  输出要求：
  仅输出JSON格式的Action List，不要其他内容。
  每个action包含：step, flag, description, depends_on, input, expected_output
```

#### **文档解析 Agent**

**核心功能**：
- 解析可研报告文档
- 提取结构化字段
- 识别项目检索号

**配置示例**：
```
Agent名称: 文档解析助手

流程:
[用户提问] → [知识库搜索/文档解析] → [信息提取] → [Agent对话结束]

信息提取提示词: |
  从可研报告中提取以下字段：
  1. retrieval_no: 检索号
  2. project_name: 项目名称
  3. voltage_level: 电压等级（数字）
  4. project_type: 项目类型
  5. forecast_load: 预测负荷值（万千瓦）
  6. construction_goal: 建设目标描述
  7. construction_duration: 计划建设工期
  
  输出JSON格式。

Agent对话结束模块:
  展示确认弹窗: 是
  子Agent运行结束后确认: "文档解析完成，是否继续执行后续分析？"
  重新执行母Agent: "重新解析文档"
  满意，继续执行母Agent: "继续"
  不满意，重新执行子Agent: "重新解析"
```

#### **数据收集 Agent**

**核心功能**：
- 并行调用3个业务API
- 整合返回数据
- 数据校验和清洗

**配置示例**：
```
Agent名称: 数据收集助手

流程:
[用户提问] → [信息提取-获取retrieval_no] → 
  [并行HTTP调用] → [代码块-数据整合] → [Agent对话结束]

HTTP调用配置（3个并行）:
1. GET /api/project/basic?retrieval_no={{retrieval_no}}
2. GET /api/project/investment?retrieval_no={{retrieval_no}}
3. GET /api/project/operation?retrieval_no={{retrieval_no}}

代码块-数据整合:
  入参: basic_info, investment_info, operation_info
  代码: |
    function userFunction(param) {
      var basic = JSON.parse(param['basic_info']);
      var invest = JSON.parse(param['investment_info']);
      var oper = JSON.parse(param['operation_info']);
      
      return {
        project_data: {
          basic: basic.data,
          investment: invest.data,
          operation: oper.data
        },
        data_quality: {
          has_basic: !!basic.data,
          has_investment: !!invest.data,
          has_operation: !!oper.data,
          missing_fields: []
        }
      };
    }
```

#### **指标评分 Agent**

**核心功能**：
- 执行8项指标评分
- 计算综合得分
- 生成评价结论

**评分规则代码块示例**：
```javascript
function userFunction(param) {
    var data = JSON.parse(param['project_data']);
    var forecast = parseFloat(param['forecast_load']) || 0;
    
    var scores = {};
    var totalScore = 0;
    
    // 1. 容载比评分 (15分)
    var r1 = data.operation['投运后第1年的容载比实际值'];
    var r2 = data.operation['投运后第2年的容载比实际值'];
    var r3 = data.operation['投运后第3年的容载比实际值'];
    var voltage = data.basic['电压等级'];
    
    // 根据电压等级确定容载比标准
    var stdMin = voltage >= 110 ? 1.8 : 1.9;
    var stdMax = voltage >= 110 ? 2.2 : 2.1;
    
    var validYears = 0;
    if (r1 >= stdMin && r1 <= stdMax) validYears++;
    if (r2 >= stdMin && r2 <= stdMax) validYears++;
    if (r3 >= stdMin && r3 <= stdMax) validYears++;
    
    scores.ratio = {
      score: validYears === 3 ? 15 : validYears === 2 ? 11 : validYears === 1 ? 6 : 0,
      validYears: validYears,
      evaluation: validYears >= 2 ? '容载比合理' : '容载比异常，需关注'
    };
    totalScore += scores.ratio.score;
    
    // 2. N-1通过率评分 (15分)
    var before = data.operation['投运前一年本项目同电压等级所在地市N-1通过率'];
    var after = data.operation['投运当年年项目电压等级所在地市N-1通过率'];
    var improvement = (after - before) * 100;
    
    scores.n1 = {
      score: improvement >= 10 ? 15 : improvement >= 5 ? 11 : improvement >= 0 ? 6 : 0,
      improvement: improvement.toFixed(2),
      evaluation: improvement >= 5 ? 'N-1通过率显著改善' : 'N-1通过率改善有限'
    };
    totalScore += scores.n1.score;
    
    // 3. 负荷偏差率评分 (15分)
    var actual = data.operation['投运后1年（新增设备）实际负荷值(万千瓦)'];
    var deviation = forecast > 0 ? Math.abs((forecast - actual) / forecast * 100) : 100;
    
    scores.load_deviation = {
      score: deviation <= 10 ? 15 : deviation <= 20 ? 11 : deviation <= 30 ? 6 : 0,
      forecast: forecast,
      actual: actual,
      deviation: deviation.toFixed(2),
      evaluation: deviation <= 20 ? '预测较准确' : '预测偏差较大，需改进'
    };
    totalScore += scores.load_deviation.score;
    
    // 4. 投资结余率评分 (15分)
    var estimated = data.investment['初设概算项目总投资（万元）'];
    var actual_cost = data.investment['结算批复项目动态投资（万元）'];
    var variance = estimated > 0 ? (actual_cost - estimated) / estimated * 100 : 0;
    
    scores.cost = {
      score: variance <= -5 ? 15 : variance <= 0 ? 11 : variance <= 5 ? 6 : 0,
      variance: variance.toFixed(2),
      evaluation: variance <= 0 ? '投资控制良好' : '投资超支，需关注'
    };
    totalScore += scores.cost.score;
    
    // 其他4项指标（简化示例）...
    scores.max_load = { score: 10, evaluation: '最大负载率正常' };
    scores.avg_load = { score: 10, evaluation: '平均负载率正常' };
    scores.duration = { score: 10, evaluation: '建设工期合理' };
    scores.device_load = { score: 10, evaluation: '设备负载率正常' };
    
    totalScore += 40;
    
    return {
      scores: scores,
      total_score: totalScore,
      max_score: 100,
      grade: totalScore >= 85 ? '优秀' : totalScore >= 70 ? '良好' : totalScore >= 60 ? '合格' : '不合格',
      summary: '综合评分: ' + totalScore + '/100，等级: ' + (totalScore >= 85 ? '优秀' : totalScore >= 70 ? '良好' : totalScore >= 60 ? '合格' : '不合格')
    };
}
```

---

## 第二部分：Plan-Execute-Judge循环实现（60分钟）

### 2.1 循环机制设计

```
┌────────────────────────────────────────────────────────────────┐
│                   Plan-Execute-Judge 循环                       │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────┐                                              │
│   │    Start    │                                              │
│   └──────┬──────┘                                              │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────┐     ┌─────────────────┐                      │
│   │    Plan     │────▶│ 生成Action List │                      │
│   │ Task Planner│     │  [step1,step2..]│                      │
│   └──────┬──────┘     └─────────────────┘                      │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────┐     ┌─────────────────┐                      │
│   │   Execute   │────▶│ 调用对应Agent/  │                      │
│   │ 执行当前Step│     │     工具        │                      │
│   └──────┬──────┘     └─────────────────┘                      │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────┐                                              │
│   │    Judge    │                                              │
│   │  结果校验   │                                              │
│   └──────┬──────┘                                              │
│          │                                                      │
│     ┌────┴────┐                                                │
│     │         │                                                │
│   Success   Fail                                               │
│     │         │                                                │
│     ▼         └────→ [记录错误] ──→ [重试计数]                 │
│   ┌─────────┐         │                                        │
│   │ 检查是否│◀────────┘ 重试<3次?                               │
│   │ 还有Next│─────────────────No────────▶ [生成错误报告]        │
│   │  Step   │                             [退出循环]            │
│   └────┬────┘                                                  │
│        │                                                        │
│   Yes  │  No                                                   │
│        │                                                        │
│        ▼                                                        │
│   ┌─────────┐                                                  │
│   │  移动到 │                                                  │
│   │ NextStep│─────────────────────────────────┐                │
│   └────┬────┘                                 │                │
│        │                                      │                │
│        └──────────────────────────────────────┘                │
│                      ↑                                          │
│                      └───────────────────────────────────────  │
│                                                                 │
│   ┌─────────────┐                                              │
│   │   Generate  │                                              │
│   │  生成报告   │                                              │
│   └──────┬──────┘                                              │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────┐                                              │
│   │    End      │                                              │
│   └─────────────┘                                              │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 灵搭实现方案

#### 方案A：使用循环模块（推荐用于批量处理）

```
[Task Planner生成Action List] ──→ [代码块: 解析Action List]
                                          │
                                          ▼
                                   [循环模块]
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
                    ▼                     ▼                     ▼
              [分支1:文档]         [分支2:API调用]        [分支3:评分]
              [解析Agent]           [数据收集Agent]       [评分Agent]
                    │                     │                     │
                    └─────────────────────┼─────────────────────┘
                                          │
                                          ▼
                                   [循环单元终点]
                                          │
                                          ▼
                                   [结果汇总]
```

**循环模块配置**：
```
节点名称: 执行Action列表
信息输入: action_list (数组类型)

循环单元内部:
  当前Action: {{loop_id.item}}
  当前索引: {{loop_id.index}}
  
  分支逻辑（信息分类）:
    - flag == "REPORT_ANALYSIS" → 调用文档解析Agent
    - flag == "GET_PROJECT_BASIC" → 调用HTTP模块
    - flag == "SCORE_CALCULATION" → 调用评分Agent
    - ...

循环单元终点: 连接到最后一个模块的"运行结束"
```

#### 方案B：使用条件分支+记忆变量（推荐用于复杂依赖）

```
[开始] ──→ [代码块: 初始化状态]
              │
              ▼
        [智能对话: Task Planner生成Plan]
              │
              ▼
        [代码块: 存储Plan到记忆变量]
              │
              ▼
        [智能对话: 执行Step 1]
              │
              ▼
        [代码块: 存储Step 1结果]
              │
              ▼
        [判断: Step 1成功?]
              │
         Yes │ No
              │     ┌─→ [重试Step 1] ──→ [重试计数+1]
              ▼     │
        [智能对话: 执行Step 2]
              │
              ▼
        [代码块: 存储Step 2结果]
              │
              ▼
        [判断: 还有后续Step?]
              │
         Yes │ No
              │
              └────▶ [生成最终报告]
```

**记忆变量使用技巧**：
```javascript
// 代码块: 初始化状态
function userFunction(param) {
    return {
        current_step: 0,
        total_steps: 7,
        results: {},
        retry_count: {},
        status: 'running'
    };
}

// 代码块: 更新状态
function userFunction(param) {
    var state = JSON.parse(param['current_state']);
    var step_result = JSON.parse(param['step_result']);
    var step_name = param['step_name'];
    
    state.results[step_name] = step_result;
    state.current_step += 1;
    
    return {
        updated_state: JSON.stringify(state),
        next_step: state.current_step < state.total_steps ? 
                   state.current_step + 1 : 'complete'
    };
}
```

### 2.3 执行Judge逻辑

**结果校验模块配置**：
```
节点名称: 校验执行结果
入参: 
  - result (字符串)
  - step_name (字符串)
  - expected_fields (字符串，逗号分隔)

代码:
function userFunction(param) {
    var result = JSON.parse(param['result']);
    var fields = param['expected_fields'].split(',');
    var stepName = param['step_name'];
    
    var missing = [];
    var errors = [];
    
    // 检查必需字段
    for (var i = 0; i < fields.length; i++) {
        var field = fields[i].trim();
        if (!result[field] && result[field] !== 0) {
            missing.push(field);
        }
    }
    
    // 检查数据有效性
    if (result.error) {
        errors.push(result.error);
    }
    
    var isValid = missing.length === 0 && errors.length === 0;
    
    return {
        is_valid: isValid,
        missing_fields: missing.join(','),
        errors: errors.join(';'),
        can_retry: !isValid && (param['retry_count'] || 0) < 3,
        message: isValid ? '执行成功' : 
                 '执行失败: 缺少字段(' + missing.join(',') + ') ' + 
                 '错误: ' + errors.join(';')
    };
}

出参:
  - is_valid (布尔型)
  - can_retry (布尔型)
  - message (字符串)
```

---

## 第三部分：循环模块高级应用（40分钟）

### 3.1 批量项目评估

**场景**：一次性评估多个项目

```
[用户上传Excel文件] ──→ [代码块: 解析Excel]
                               │
                               ▼
                        [提取项目列表]
                               │
                               ▼
                        [循环模块: 遍历项目]
                               │
                    ┌──────────┼──────────┐
                    │          │          │
                    ▼          ▼          ▼
              [项目1评估] [项目2评估] [项目3评估]
               (子Agent)  (子Agent)  (子Agent)
                    │          │          │
                    └──────────┼──────────┘
                               │
                               ▼
                        [循环单元终点]
                               │
                               ▼
                        [代码块: 汇总所有结果]
                               │
                               ▼
                        [智能对话: 生成批量评估报告]
```

**循环模块配置**：
```
节点名称: 批量项目评估
信息输入: project_list (数组，每项包含retrieval_no)

循环单元内部流程:
  1. 信息提取: 获取当前项目 {{loop.item.retrieval_no}}
  2. HTTP调用: 获取项目数据（3个API）
  3. 代码块: 数据整合
  4. 智能对话: 单项目评估
  5. 代码块: 存储评估结果到数组
  
循环变量引用:
  - 当前项目: {{batch_loop.item}}
  - 当前索引: {{batch_loop.index}}
  - 总数: {{batch_loop.length}}
  - 进度: "评估进度: {{batch_loop.index + 1}} / {{batch_loop.length}}"

循环单元终点: 连接步骤5的"运行结束"
```

**进度提示实现**：
```javascript
// 代码块: 更新进度
function userFunction(param) {
    var current = parseInt(param['current_index']) + 1;
    var total = parseInt(param['total_count']);
    var results = JSON.parse(param['accumulated_results'] || '[]');
    var currentResult = JSON.parse(param['current_result']);
    
    results.push(currentResult);
    
    var progress = (current / total * 100).toFixed(1);
    
    return {
        progress_message: `已完成 ${current}/${total} 个项目评估 (${progress}%)`,
        all_results: JSON.stringify(results),
        is_complete: current >= total
    };
}
```

### 3.2 嵌套循环（复杂依赖处理）

**场景**：每个项目需要执行多个步骤，且步骤间有依赖

```
外层循环: 遍历项目列表
  └─→ 内层循环: 遍历Action列表
        ├─→ 检查依赖是否满足
        ├─→ 执行Action
        └─→ 校验结果
```

**实现方案**：
```
[项目循环]
    │
    ▼
[代码块: 为当前项目生成Action List]
    │
    ▼
[Action循环]
    │
    ├─→ [代码块: 检查依赖]
    │         │
    │    ┌────┴────┐
    │    │         │
    │  满足      不满足
    │    │         │
    │    ▼         └─→ [跳过，记录等待]
    │ [执行Action]
    │    │
    │    ▼
    │ [代码块: 校验结果]
    │    │
    │ ┌──┴──┐
    │ │     │
    │成功   失败
    │ │     │
    │ ▼     └─→ [重试或记录错误]
    │ [存储结果]
    │    │
    └───→ [循环单元终点]
              │
              ▼
       [代码块: 项目评估完成]
              │
              ▼
       [外层循环单元终点]
```

---

## 第四部分：API发布与集成（20分钟）

### 4.1 发布主Agent API

**发布步骤**：
1. 点击右上角"···" → "发布"
2. 选择"API服务"标签
3. 点击"创建链接"
4. 复制API信息：
   - Uuid: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - AuthKey: `your-auth-key`
   - AuthSecret: `your-auth-secret`

### 4.2 前端调用示例

```javascript
// API配置
const API_CONFIG = {
  baseUrl: 'https://api.xxx.com/agent',
  uuid: 'your-uuid-here',
  authKey: 'your-auth-key'
};

// 调用投资问效Agent
async function analyzeInvestment(reportText) {
  const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.uuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.authKey}`
    },
    body: JSON.stringify({
      query: reportText,
      context: {
        action: 'analyze_report'
      }
    })
  });
  
  const result = await response.json();
  return result.data.answer;
}

// 使用示例
const report = "成都成华丛树110kV输变电工程...";
analyzeInvestment(report).then(report => {
  console.log('评估报告:', report);
});
```

---

## 附录：完整的多智能体连接图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        多智能体协作完整流程                                  │
└─────────────────────────────────────────────────────────────────────────────┘

                            主智能体
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Task Planner Agent  │
                    │   生成Action List    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
    ┌─────────────────┐ ┌──────────────┐ ┌──────────────┐
    │  文档解析 Agent │ │ 数据收集Agent│ │ 评分计算Agent│
    │                 │ │              │ │              │
    │ ┌─────────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
    │ │ 文档解析    │ │ │ │ HTTP调用 │ │ │ │ 代码块   │ │
    │ │ 模块        │ │ │ │ ×3       │ │ │ │ 评分计算 │ │
    │ └─────────────┘ │ │ └──────────┘ │ │ └──────────┘ │
    │        │        │ │       │      │ │       │      │
    │ ┌─────────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
    │ │ 信息提取    │ │ │ │ 代码块   │ │ │ │ 结果汇总 │ │
    │ │ 模块        │ │ │ │ 数据整合 │ │ │ │          │ │
    │ └─────────────┘ │ │ └──────────┘ │ │ └──────────┘ │
    │        │        │ │       │      │ │       │      │
    │ ┌─────────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
    │ │ Agent对话   │ │ │ │ Agent对话│ │ │ │ Agent对话│ │
    │ │ 结束        │ │ │ │ 结束     │ │ │ │ 结束     │ │
    │ └─────────────┘ │ │ └──────────┘ │ │ └──────────┘ │
    └─────────────────┘ └──────────────┘ └──────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   结果整合 Agent     │
                    │   生成最终报告       │
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   主Agent输出        │
                    └──────────────────────┘
```

---

**文档版本**: v1.0  
**编写日期**: 2024年3月  
**配套课程**: Day3 Agent优化与发布
