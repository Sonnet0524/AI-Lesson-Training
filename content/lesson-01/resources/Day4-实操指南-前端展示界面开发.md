# Day4 实操指南：投资问效系统前端展示界面开发

## 课程目标

通过本实操指南，你将学会：
1. 使用Vibe Coding模式开发投资问效可视化界面
2. 实现可研报告上传与分析结果展示
3. 集成灵搭Agent API
4. 使用图表展示8项指标评分

**预计用时**：4课时（160分钟）

---

## 第一部分：界面原型设计（30分钟）

### 1.1 需求分析

**投资问效系统界面需要展示**：
1. **输入区**：可研报告上传、项目检索号查询
2. **数据区**：项目基本信息、投资数据、运行指标
3. **评分区**：8项指标的可视化评分
4. **报告区**：结构化分析报告展示
5. **历史区**：历史评估记录

### 1.2 界面布局设计

```
┌─────────────────────────────────────────────────────────────────────┐
│                      投资问效智能评估系统                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     顶部导航栏                               │   │
│  │  [Logo] 投资问效分析系统          [帮助] [历史记录] [设置]  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌───────────────────────────┬──────────────────────────────────┐  │
│  │                           │                                  │  │
│  │     左侧：输入面板         │        右侧：分析结果面板         │  │
│  │                           │                                  │  │
│  │  ┌─────────────────────┐  │  ┌─────────────────────────────┐ │  │
│  │  │   文档上传区         │  │  │      项目基本信息          │ │  │
│  │  │  [拖拽上传区域]      │  │  │  ┌─────────────────────────┐│ │  │
│  │  │  支持.docx/.pdf      │  │  │  │ 项目名称：xxx           ││ │  │
│  │  └─────────────────────┘  │  │  │ 电压等级：110kV         ││ │  │
│  │                           │  │  │ 项目类型：经济效益类     ││ │  │
│  │  ┌─────────────────────┐  │  │  │ ...                     ││ │  │
│  │  │   或直接输入检索号   │  │  │  └─────────────────────────┘│ │  │
│  │  │  [输入框]           │  │  │                             │ │  │
│  │  │  [开始分析] 按钮    │  │  └─────────────────────────────┘ │  │
│  │  └─────────────────────┘  │                                  │  │
│  │                           │  ┌─────────────────────────────┐ │  │
│  │  ┌─────────────────────┐  │  │      8项指标评分            │ │  │
│  │  │   快速操作按钮      │  │  │  ┌─────┐┌─────┐┌─────┐    │ │  │
│  │  │ [示例1] [示例2]     │  │  │  │评分1││评分2││评分3│    │ │  │
│  │  └─────────────────────┘  │  │  │ 85  ││ 72  ││ 90  │    │ │  │
│  │                           │  │  └─────┘└─────┘└─────┘    │ │  │
│  └───────────────────────────┘  │  └─────────────────────────────┘ │  │
│                                 │                                  │  │
│                                 │  ┌─────────────────────────────┐ │  │
│                                 │  │      投资问效分析报告       │ │  │
│                                 │  │  [Markdown渲染区域]        │ │  │
│                                 │  │                             │ │  │
│                                 │  │ ## 一、项目概况             │ │  │
│                                 │  │ ...                         │ │  │
│                                 │  │                             │ │  │
│                                 │  │ ## 二、指标评分            │ │  │
│                                 │  │ ...                         │ │  │
│                                 │  └─────────────────────────────┘ │  │
│                                 │                                  │  │
│                                 │  [导出报告] [重新分析] [分享]   │  │
│                                 └──────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.3 组件划分

```
power-investment-analysis/
├── src/
│   ├── components/
│   │   ├── UploadPanel/          # 左侧上传面板
│   │   │   ├── FileUploader.jsx  # 文件上传组件
│   │   │   ├── SearchInput.jsx   # 检索号输入
│   │   │   └── QuickActions.jsx  # 快速操作按钮
│   │   ├── ResultPanel/          # 右侧结果面板
│   │   │   ├── ProjectInfo.jsx   # 项目基本信息
│   │   │   ├── ScoreCards.jsx    # 8项指标评分卡
│   │   │   ├── ScoreChart.jsx    # 评分图表
│   │   │   └── ReportViewer.jsx  # 报告展示
│   │   ├── common/
│   │   │   ├── Header.jsx        # 顶部导航
│   │   │   ├── Loading.jsx       # 加载动画
│   │   │   └── ErrorBoundary.jsx # 错误边界
│   │   └── layout/
│   │       └── MainLayout.jsx    # 主布局
│   ├── services/
│   │   ├── api.js                # API调用
│   │   └── analysis.js           # 分析逻辑
│   ├── hooks/
│   │   ├── useAnalysis.js        # 分析Hook
│   │   └── useFileUpload.js      # 文件上传Hook
│   ├── utils/
│   │   ├── formatters.js         # 格式化工具
│   │   └── validators.js         # 验证工具
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 第二部分：使用Vibe Coding开发（100分钟）

### 2.1 项目初始化（20分钟）

**与opencode对话**：

```
用户：帮我创建一个React项目，项目名"power-investment-analysis"，
      使用Vite + React 18 + Ant Design。
      这是国网四川电力的投资问效分析系统前端，
      需要支持文件上传、数据展示、图表可视化。

opencode：我来帮你创建项目...
```

**生成的项目结构**：
```bash
npm create vite@latest power-investment-analysis -- --template react
cd power-investment-analysis
npm install
npm install antd @ant-design/charts react-markdown
npm install axios lodash moment
npm run dev
```

### 2.2 开发主布局（20分钟）

**与opencode对话**：

```
用户：创建主布局组件，使用左右两栏布局（24栅格，左8右16）。
      左侧放上传面板，右侧放结果面板。
      顶部需要一个导航栏，包含系统标题"投资问效智能评估系统"。

opencode：我来创建主布局...
```

**预期生成的代码**（App.jsx）：
```jsx
import React from 'react';
import { Layout, Row, Col } from 'antd';
import Header from './components/common/Header';
import UploadPanel from './components/UploadPanel/UploadPanel';
import ResultPanel from './components/ResultPanel/ResultPanel';
import './App.css';

const { Content } = Layout;

function App() {
  const [analysisResult, setAnalysisResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <Layout className="app-layout">
      <Header />
      <Content className="app-content">
        <Row gutter={24} className="main-row">
          <Col span={8}>
            <UploadPanel 
              onAnalysisStart={() => setLoading(true)}
              onAnalysisComplete={(result) => {
                setAnalysisResult(result);
                setLoading(false);
              }}
            />
          </Col>
          <Col span={16}>
            <ResultPanel 
              result={analysisResult} 
              loading={loading}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
```

### 2.3 开发上传面板（20分钟）

**与opencode对话**：

```
用户：创建文件上传面板组件，包含：
      1. 拖拽上传区域（虚线边框，支持.docx/.pdf）
      2. 检索号直接输入框
      3. "开始分析"按钮（蓝色主按钮）
      4. 快速操作区：放3个示例项目按钮
      5. 上传文件列表展示
      
      样式要求：白色背景，圆角，有阴影。

opencode：我来创建上传面板组件...
```

**预期生成的UploadPanel.jsx**：
```jsx
import React, { useState } from 'react';
import { Card, Upload, Input, Button, List, Space, message } from 'antd';
import { InboxOutlined, FileTextOutlined, SearchOutlined } from '@ant-design/icons';
import './UploadPanel.css';

const { Dragger } = Upload;

const quickExamples = [
  { name: '成都丛树110kV工程', retrievalNo: '798-K131538-A01' },
  { name: '绵阳南山110kV工程', retrievalNo: '798-K151479-A01' },
  { name: '德阳天府110kV工程', retrievalNo: '798-K162345-A01' },
];

function UploadPanel({ onAnalysisStart, onAnalysisComplete }) {
  const [fileList, setFileList] = useState([]);
  const [retrievalNo, setRetrievalNo] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = (info) => {
    const { status, originFileObj } = info.file;
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      setFileList([originFileObj]);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const handleAnalyze = async () => {
    if (!fileList.length && !retrievalNo) {
      message.warning('请上传文件或输入检索号');
      return;
    }

    setAnalyzing(true);
    onAnalysisStart();

    try {
      // TODO: 调用API
      const result = await mockAnalyze(fileList[0], retrievalNo);
      onAnalysisComplete(result);
    } catch (error) {
      message.error('分析失败：' + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleQuickExample = (example) => {
    setRetrievalNo(example.retrievalNo);
    message.info(`已选择示例：${example.name}`);
  };

  return (
    <Card className="upload-panel" title="📤 上传可研报告">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* 文件上传 */}
        <Dragger
          name="file"
          multiple={false}
          accept=".docx,.pdf,.doc"
          customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)}
          onChange={handleUpload}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
          <p className="ant-upload-hint">
            支持格式：.docx, .pdf, .doc
          </p>
        </Dragger>

        {/* 文件列表 */}
        {fileList.length > 0 && (
          <List
            size="small"
            dataSource={fileList}
            renderItem={(file) => (
              <List.Item>
                <FileTextOutlined /> {file.name}
              </List.Item>
            )}
          />
        )}

        {/* 检索号输入 */}
        <Input
          placeholder="或直接输入项目检索号（如：798-K131538-A01）"
          prefix={<SearchOutlined />}
          value={retrievalNo}
          onChange={(e) => setRetrievalNo(e.target.value)}
        />

        {/* 开始分析按钮 */}
        <Button
          type="primary"
          size="large"
          block
          loading={analyzing}
          onClick={handleAnalyze}
        >
          {analyzing ? '分析中...' : '开始分析'}
        </Button>

        {/* 快速示例 */}
        <div className="quick-examples">
          <div className="quick-title">快速示例</div>
          <Space wrap>
            {quickExamples.map((example) => (
              <Button
                key={example.retrievalNo}
                size="small"
                onClick={() => handleQuickExample(example)}
              >
                {example.name}
              </Button>
            ))}
          </Space>
        </div>
      </Space>
    </Card>
  );
}

// Mock API调用
async function mockAnalyze(file, retrievalNo) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    basic: {
      projectName: '成都成华丛树110kV输变电工程',
      voltageLevel: 110,
      projectType: '经济效益类',
      location: '成都市成华区',
    },
    scores: {
      ratio: { score: 85, evaluation: '容载比合理' },
      n1: { score: 72, evaluation: 'N-1通过率改善明显' },
      loadDeviation: { score: 60, evaluation: '负荷偏差较大' },
      cost: { score: 90, evaluation: '投资控制良好' },
    },
    totalScore: 75,
    report: '## 投资问效分析报告\n\n### 一、项目概况\n...',
  };
}

export default UploadPanel;
```

### 2.4 开发结果展示面板（20分钟）

**与opencode对话**：

```
用户：创建结果展示面板，包含：
      1. 项目基本信息卡片（项目名称、电压等级、项目类型、所在区县）
      2. 8项指标评分卡（使用进度条或分数圆环展示）
      3. 综合评分（大字体显示）
      4. 分析报告区域（支持Markdown渲染）
      5. 导出报告按钮
      
      当loading为true时显示骨架屏，result为null时显示空状态提示。

opencode：我来创建结果展示面板...
```

**预期生成的ResultPanel.jsx**：
```jsx
import React from 'react';
import { Card, Row, Col, Statistic, Progress, Skeleton, Empty, Button } from 'antd';
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import './ResultPanel.css';

const scoreItems = [
  { key: 'ratio', label: '容载比', weight: 15 },
  { key: 'n1', label: 'N-1通过率', weight: 15 },
  { key: 'deviceLoad', label: '设备负载率', weight: 10 },
  { key: 'loadDeviation', label: '负荷偏差率', weight: 15 },
  { key: 'maxLoad', label: '最大负载率', weight: 10 },
  { key: 'avgLoad', label: '平均负载率', weight: 10 },
  { key: 'cost', label: '投资结余率', weight: 15 },
  { key: 'duration', label: '建设时长', weight: 10 },
];

function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <Card className="result-panel">
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="result-panel">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请上传可研报告或输入检索号开始分析"
        />
      </Card>
    );
  }

  return (
    <div className="result-panel">
      {/* 项目基本信息 */}
      <Card title="📋 项目基本信息" className="info-card">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="项目名称" value={result.basic.projectName} />
          </Col>
          <Col span={6}>
            <Statistic title="电压等级" value={`${result.basic.voltageLevel}kV`} />
          </Col>
          <Col span={6}>
            <Statistic title="项目类型" value={result.basic.projectType} />
          </Col>
          <Col span={6}>
            <Statistic title="所在区县" value={result.basic.location} />
          </Col>
        </Row>
      </Card>

      {/* 8项指标评分 */}
      <Card title="📊 8项指标评分" className="score-card">
        <Row gutter={[16, 16]}>
          {scoreItems.map((item) => {
            const scoreData = result.scores[item.key];
            const score = scoreData?.score || 0;
            const maxScore = item.weight;
            const percentage = (score / maxScore) * 100;

            return (
              <Col span={6} key={item.key}>
                <div className="score-item">
                  <div className="score-header">
                    <span className="score-label">{item.label}</span>
                    <span className="score-value">{score}/{maxScore}</span>
                  </div>
                  <Progress
                    percent={percentage}
                    size="small"
                    strokeColor={getScoreColor(percentage)}
                    showInfo={false}
                  />
                  <div className="score-evaluation">{scoreData?.evaluation || '-'}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>

      {/* 综合评分 */}
      <Card className="total-score-card">
        <Row align="middle" justify="space-between">
          <Col>
            <Statistic
              title="综合评分"
              value={result.totalScore}
              suffix="/100"
              valueStyle={{ fontSize: 48, color: getTotalScoreColor(result.totalScore) }}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<DownloadOutlined />} size="large">
              导出报告
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 分析报告 */}
      <Card title="📄 投资问效分析报告" className="report-card">
        <div className="markdown-content">
          <ReactMarkdown>{result.report}</ReactMarkdown>
        </div>
      </Card>
    </div>
  );
}

function getScoreColor(percentage) {
  if (percentage >= 80) return '#52c41a';
  if (percentage >= 60) return '#faad14';
  return '#f5222d';
}

function getTotalScoreColor(score) {
  if (score >= 85) return '#52c41a';
  if (score >= 70) return '#1890ff';
  if (score >= 60) return '#faad14';
  return '#f5222d';
}

export default ResultPanel;
```

### 2.5 集成灵搭Agent API（20分钟）

**与opencode对话**：

```
用户：创建API服务文件，连接灵搭平台Agent。
      API基础地址：https://api.xxx.com/agent
      需要传递Authorization Header（Bearer token）。
      请求格式：POST JSON，包含query和context。
      支持两种调用方式：1）上传文件内容 2）直接传检索号

opencode：我来创建API服务...
```

**预期生成的services/api.js**：
```javascript
// API配置
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.xxx.com/agent',
  uuid: import.meta.env.VITE_AGENT_UUID || 'your-uuid-here',
  authKey: import.meta.env.VITE_AUTH_KEY || 'your-auth-key',
};

/**
 * 调用投资问效Agent
 * @param {string} query - 用户查询（可研报告文本或检索号）
 * @param {Object} context - 上下文信息
 * @returns {Promise<Object>} 分析结果
 */
export async function callInvestmentAgent(query, context = {}) {
  const response = await fetch(`${API_CONFIG.baseUrl}/${API_CONFIG.uuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.authKey}`,
    },
    body: JSON.stringify({
      query,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result.code !== 200) {
    throw new Error(result.message || 'Agent返回错误');
  }

  // 解析Agent返回的报告
  return parseAgentResponse(result.data.answer);
}

/**
 * 上传文件并分析
 * @param {File} file - 上传的文件
 * @returns {Promise<Object>} 分析结果
 */
export async function analyzeReportFile(file) {
  // 读取文件内容
  const text = await readFileContent(file);
  
  // 调用Agent
  return callInvestmentAgent(text, {
    action: 'analyze_report',
    fileName: file.name,
    fileType: file.type,
  });
}

/**
 * 通过检索号查询
 * @param {string} retrievalNo - 项目检索号
 * @returns {Promise<Object>} 分析结果
 */
export async function analyzeByRetrievalNo(retrievalNo) {
  return callInvestmentAgent(retrievalNo, {
    action: 'query_by_retrieval_no',
    retrievalNo,
  });
}

/**
 * 读取文件内容
 * @param {File} file - 文件对象
 * @returns {Promise<string>} 文件内容
 */
async function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

/**
 * 解析Agent返回的响应
 * @param {string} answer - Agent返回的文本
 * @returns {Object} 结构化数据
 */
function parseAgentResponse(answer) {
  try {
    // 尝试从Markdown中提取JSON数据
    const jsonMatch = answer.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // 如果没有JSON代码块，返回原始文本
    return {
      report: answer,
      raw: true,
    };
  } catch (error) {
    // 解析失败，返回原始文本
    return {
      report: answer,
      parseError: error.message,
    };
  }
}
```

**环境变量配置**（.env）：
```
VITE_API_BASE_URL=https://api.xxx.com/agent
VITE_AGENT_UUID=your-agent-uuid
VITE_AUTH_KEY=your-auth-key
```

---

## 第三部分：样式美化与优化（20分钟）

### 3.1 CSS样式优化

**与opencode对话**：

```
用户：添加CSS样式，要求：
      1. 整体使用浅灰色背景（#f0f2f5）
      2. 卡片使用白色背景，圆角8px，阴影效果
      3. 左侧上传面板固定宽度，右侧自适应
      4. 评分卡片hover时有轻微放大效果
      5. 分析报告区域使用等宽字体，代码块有背景色
      6. 响应式布局：移动端时左右面板上下堆叠

opencode：我来添加样式...
```

**预期生成的App.css**：
```css
/* 全局样式 */
.app-layout {
  min-height: 100vh;
  background: #f0f2f5;
}

.app-content {
  padding: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.main-row {
  min-height: calc(100vh - 112px);
}

/* 上传面板样式 */
.upload-panel {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.upload-panel .ant-upload-drag {
  border-radius: 8px;
  background: #fafafa;
}

.quick-examples {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.quick-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

/* 结果面板样式 */
.result-panel .info-card,
.result-panel .score-card,
.result-panel .total-score-card,
.result-panel .report-card {
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 评分项样式 */
.score-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.score-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.score-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.score-label {
  font-weight: 500;
}

.score-value {
  font-weight: bold;
  color: #1890ff;
}

.score-evaluation {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

/* 总评分样式 */
.total-score-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.total-score-card .ant-statistic-title {
  color: rgba(255, 255, 255, 0.8);
}

.total-score-card .ant-statistic-content {
  color: white;
}

/* 报告内容样式 */
.markdown-content {
  font-size: 14px;
  line-height: 1.8;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
}

.markdown-content code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.markdown-content pre {
  background: #f6f8fa;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid #e8e8e8;
  padding: 12px;
  text-align: left;
}

.markdown-content th {
  background: #fafafa;
  font-weight: 600;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .app-content {
    padding: 16px;
  }
  
  .main-row {
    flex-direction: column;
  }
  
  .main-row .ant-col-8,
  .main-row .ant-col-16 {
    width: 100%;
    max-width: 100%;
  }
  
  .score-item {
    margin-bottom: 16px;
  }
}
```

### 3.2 添加图表可视化

**与opencode对话**：

```
用户：在结果面板添加一个雷达图，展示8项指标的评分分布。
      使用@ant-design/charts的Radar组件。
      数据格式：[
        { item: '容载比', score: 85, fullMark: 100 },
        { item: 'N-1通过率', score: 72, fullMark: 100 },
        ...
      ]

opencode：我来添加雷达图...
```

**预期生成的ScoreRadar.jsx**：
```jsx
import React from 'react';
import { Radar } from '@ant-design/charts';

function ScoreRadar({ scores }) {
  const data = [
    { item: '容载比', score: scores.ratio?.score || 0, fullMark: 100 },
    { item: 'N-1通过率', score: scores.n1?.score || 0, fullMark: 100 },
    { item: '设备负载率', score: scores.deviceLoad?.score || 0, fullMark: 100 },
    { item: '负荷偏差率', score: scores.loadDeviation?.score || 0, fullMark: 100 },
    { item: '最大负载率', score: scores.maxLoad?.score || 0, fullMark: 100 },
    { item: '平均负载率', score: scores.avgLoad?.score || 0, fullMark: 100 },
    { item: '投资结余率', score: scores.cost?.score || 0, fullMark: 100 },
    { item: '建设时长', score: scores.duration?.score || 0, fullMark: 100 },
  ];

  const config = {
    data,
    xField: 'item',
    yField: 'score',
    meta: {
      score: {
        alias: '评分',
        min: 0,
        max: 100,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
      },
    },
    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    point: {
      size: 4,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    color: '#5B8FF9',
  };

  return (
    <div style={{ height: 300 }}>
      <Radar {...config} />
    </div>
  );
}

export default ScoreRadar;
```

---

## 第四部分：测试与部署（课后作业）

### 4.1 功能测试清单

```
□ 文件上传功能正常
□ 检索号输入功能正常
□ API调用成功返回结果
□ 项目基本信息正确显示
□ 8项指标评分正确显示
□ 雷达图正确渲染
□ 综合评分计算正确
□ Markdown报告正确渲染
□ 导出报告功能正常
□ 响应式布局适配移动端
□ 错误处理（网络错误、API错误）
```

### 4.2 部署步骤

```bash
# 1. 构建生产环境
npm run build

# 2. 测试构建结果
npm run preview

# 3. 部署到服务器
# 将dist目录上传到Nginx服务器
# 或部署到Vercel/Netlify
```

---

## 附录：完整文件清单

```
power-investment-analysis/
├── src/
│   ├── components/
│   │   ├── UploadPanel/
│   │   │   ├── UploadPanel.jsx
│   │   │   └── UploadPanel.css
│   │   ├── ResultPanel/
│   │   │   ├── ResultPanel.jsx
│   │   │   ├── ResultPanel.css
│   │   │   └── ScoreRadar.jsx
│   │   ├── common/
│   │   │   └── Header.jsx
│   │   └── layout/
│   │       └── MainLayout.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

---

**文档版本**: v1.0  
**编写日期**: 2024年3月  
**配套课程**: Day4 Vibe Coding前端开发
