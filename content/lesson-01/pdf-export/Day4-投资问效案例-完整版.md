# Day 4：投资问效案例 - Vibe Coding前端开发

> **编写日期**: 2026年3月23日  
> **版本**: v2.0  
> **适用课程**: 国网四川电力AI种子团队培训 - Day4  

---

## 📋 本日学习目标

完成本日学习后，你将能够：
- ✅ 使用Vibe Coding模式开发前端界面
- ✅ 实现可研报告上传与分析结果展示
- ✅ 集成灵搭Agent API
- ✅ 使用图表可视化8项指标评分
- ✅ 完成端到端联调测试

**预计用时**: 8课时（含实操）

---

## 第一部分：整体设计思路

### 1.1 前端架构设计

<!-- 
【设计说明】
前端采用现代React技术栈，设计原则：
1. 组件化 - 每个功能独立组件
2. 响应式 - 适配PC和移动端
3. 可视化 - 图表展示数据
4. 易用性 - 友好的用户交互
-->

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        前端架构设计                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   【技术栈选择】                                                         │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  UI框架: React 18 + Ant Design 5                               │   │
│   │  构建工具: Vite 4                                               │   │
│   │  图表库: @ant-design/charts                                     │   │
│   │  HTTP客户端: axios                                              │   │
│   │  状态管理: React Hooks (useState/useContext)                    │   │
│   │  样式: CSS Modules + Ant Design样式                             │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   【组件架构】                                                           │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      App (根组件)                               │   │
│   │                         │                                       │   │
│   │           ┌─────────────┼─────────────┐                        │   │
│   │           ▼             ▼             ▼                        │   │
│   │    ┌──────────┐  ┌──────────┐  ┌──────────┐                   │   │
│   │    │Header    │  │UploadPanel│  │ResultPanel│                  │   │
│   │    │(导航栏)  │  │(上传面板) │  │(结果面板) │                  │   │
│   │    └──────────┘  └────┬─────┘  └────┬─────┘                   │   │
│   │                       │             │                          │   │
│   │                  ┌────┴────┐   ┌────┴────┐                     │   │
│   │                  ▼         ▼   ▼         ▼                     │   │
│   │            ┌────────┐ ┌────────┐ ┌────────┐                   │   │
│   │            │File    │ │Search  │ │Project │ │ScoreCards│      │   │
│   │            │Uploader│ │Input   │ │Info    │ │(8项评分) │      │   │
│   │            └────────┘ └────────┘ └────────┘ └────────┘        │   │
│   │                                        │                       │   │
│   │                                   ┌────┴────┐                  │   │
│   │                                   ▼         ▼                  │   │
│   │                            ┌────────┐ ┌────────┐              │   │
│   │                            │Score   │ │Report  │              │   │
│   │                            │Radar   │ │Viewer  │              │   │
│   │                            │(雷达图)│ │(报告)  │              │   │
│   │                            └────────┘ └────────┘              │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   【数据流设计】                                                         │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                                                                │   │
│   │   用户操作                                                        │   │
│   │      │                                                          │   │
│   │      ▼                                                          │   │
│   │   [UploadPanel] ──→ [App State] ──→ [ResultPanel]               │   │
│   │      │                │                │                        │   │
│   │      │                │                ▼                        │   │
│   │      │                │         [API调用]                        │   │
│   │      │                │                │                        │   │
│   │      │                │                ▼                        │   │
│   │      │                │         [Agent处理]                      │   │
│   │      │                │                │                        │   │
│   │      │                ▼                ▼                        │   │
│   │      └──────────→ [数据更新] ←───────┘                        │   │
│   │                         │                                       │   │
│   │                         ▼                                       │   │
│   │                    [重新渲染]                                    │   │
│   │                                                                │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 界面布局设计

<!-- 
【布局说明】
采用经典的左右两栏布局：
- 左侧：操作区（上传、输入）
- 右侧：展示区（结果、报告）
- 顶部：导航栏
-->

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo] 投资问效智能评估系统                    [历史记录] [帮助] [设置] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌────────────────────────────┬──────────────────────────────────────┐ │
│  │                            │                                      │ │
│  │    左侧：操作面板 (30%)     │        右侧：展示面板 (70%)         │ │
│  │                            │                                      │ │
│  │  ┌──────────────────────┐  │  ┌────────────────────────────────┐ │ │
│  │  │ 📤 上传可研报告       │  │  │ 📋 项目基本信息               │ │ │
│  │  │                      │  │  │ ┌────────────────────────────┐ │ │ │
│  │  │ [拖拽上传区域]        │  │  │ │ 项目名称：xxx工程          │ │ │ │
│  │  │ 支持 .docx / .pdf    │  │  │ │ 电压等级：110kV            │ │ │ │
│  │  │                      │  │  │ │ 项目类型：经济效益类       │ │ │ │
│  │  └──────────────────────┘  │  │ │ ...                        │ │ │ │
│  │                            │  │  │ └────────────────────────────┘ │ │ │
│  │  ┌──────────────────────┐  │  │                                  │ │ │
│  │  │ 🔍 快速查询          │  │  │  ┌────────────────────────────┐ │ │ │
│  │  │                      │  │  │  │ 📊 8项指标评分              │ │ │
│  │  │ [检索号输入框]       │  │  │  │ ┌────┐┌────┐┌────┐┌────┐ │ │ │ │
│  │  │ 798-K131538-A01      │  │  │  │ │85  ││72  ││60  ││90  │ │ │ │ │
│  │  │                      │  │  │  │ │分  ││分  ││分  ││分  │ │ │ │ │
│  │  │ [开始分析] 按钮      │  │  │  │ └────┘└────┘└────┘└────┘ │ │ │ │
│  │  │                      │  │  │  │                           │ │ │ │
│  │  │ 快速示例：           │  │  │  │ [雷达图可视化展示]        │ │ │ │
│  │  │ [示例1] [示例2]      │  │  │  │                           │ │ │ │
│  │  └──────────────────────┘  │  │  └────────────────────────────┘ │ │ │
│  │                            │  │                                  │ │ │
│  │                            │  │  ┌────────────────────────────┐ │ │ │
│  │                            │  │  │ 📄 投资问效分析报告         │ │ │ │
│  │                            │  │  │                            │ │ │ │
│  │                            │  │  │ ## 一、项目概况            │ │ │ │
│  │                            │  │  │ ...                        │ │ │ │
│  │                            │  │  │                            │ │ │ │
│  │                            │  │  │ ## 二、指标评分            │ │ │ │
│  │                            │  │  │ ...                        │ │ │ │
│  │                            │  │  │                            │ │ │ │
│  │                            │  │  │ ## 三、综合评价            │ │ │ │
│  │                            │  │  │ ...                        │ │ │ │
│  │                            │  │  │                            │ │ │ │
│  │                            │  │  └────────────────────────────┘ │ │ │
│  │                            │  │                                  │ │ │
│  │                            │  │  [导出PDF] [分享] [重新分析]   │ │ │
│  │                            │  │                                  │ │ │
│  └────────────────────────────┴──────────────────────────────────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

【响应式适配】
桌面端 (>768px): 左右两栏布局
移动端 (<=768px): 上下堆叠布局
  • 上传面板在上
  • 结果面板在下
  • 评分卡片2列显示
```

---

## 第二部分：Vibe Coding开发实战

### 2.1 项目初始化（与AI对话）

<!-- 
【Vibe Coding技巧】
使用自然语言描述需求，让AI生成代码。
关键是：描述要具体、逐步迭代。
-->

**对话示例**:

```
【用户】帮我创建一个React项目，项目名叫"power-investment-analysis"，
       使用Vite + React 18 + Ant Design。
       
       这是一个国网四川电力的投资问效分析系统前端，需要：
       1. 左侧上传面板（文件上传、检索号输入、快速示例）
       2. 右侧结果面板（项目信息、8项指标评分雷达图、分析报告）
       3. 使用Ant Design的组件和样式
       4. 支持Markdown渲染报告内容

【AI】好的，我来帮你创建项目...

【AI执行】
1. 初始化项目
   npm create vite@latest power-investment-analysis -- --template react
   cd power-investment-analysis
   npm install

2. 安装依赖
   npm install antd @ant-design/charts
   npm install react-markdown axios
   npm install lodash moment

3. 创建项目结构
   mkdir -p src/components/UploadPanel
   mkdir -p src/components/ResultPanel
   mkdir -p src/components/common
   mkdir -p src/services
   mkdir -p src/hooks
   mkdir -p src/utils

4. 生成基础代码...
   [生成App.jsx, main.jsx, App.css等文件]

【AI输出】
项目已创建，运行以下命令启动：
  cd power-investment-analysis
  npm run dev
```

**生成的项目结构**:

```
power-investment-analysis/
├── src/
│   ├── components/
│   │   ├── UploadPanel/
│   │   │   ├── UploadPanel.jsx       # 上传面板主组件
│   │   │   ├── FileUploader.jsx      # 文件上传组件
│   │   │   ├── SearchInput.jsx       # 检索号输入组件
│   │   │   ├── QuickActions.jsx      # 快速示例按钮
│   │   │   └── UploadPanel.css       # 样式文件
│   │   ├── ResultPanel/
│   │   │   ├── ResultPanel.jsx       # 结果面板主组件
│   │   │   ├── ProjectInfo.jsx       # 项目信息展示
│   │   │   ├── ScoreCards.jsx        # 8项评分卡片
│   │   │   ├── ScoreRadar.jsx        # 雷达图组件
│   │   │   ├── ReportViewer.jsx      # 报告渲染组件
│   │   │   └── ResultPanel.css       # 样式文件
│   │   └── common/
│   │       ├── Header.jsx            # 顶部导航栏
│   │       ├── Loading.jsx           # 加载动画
│   │       └── ErrorMessage.jsx      # 错误提示
│   ├── services/
│   │   └── api.js                    # API调用封装
│   ├── hooks/
│   │   ├── useAnalysis.js            # 分析逻辑Hook
│   │   └── useFileUpload.js          # 文件上传Hook
│   ├── utils/
│   │   ├── formatters.js             # 格式化工具
│   │   └── validators.js             # 验证工具
│   ├── App.jsx                       # 根组件
│   ├── App.css                       # 全局样式
│   └── main.jsx                      # 入口文件
├── .env                              # 环境变量
├── index.html
├── package.json
└── vite.config.js
```

### 2.2 核心组件开发

#### UploadPanel（上传面板）

<!-- 
【组件说明】
上传面板包含三个功能：
1. 文件上传（拖拽/点击）
2. 检索号直接输入
3. 快速示例按钮
-->

**对话示例**:

```
【用户】创建上传面板组件，包含：
       1. 文件上传区域：支持拖拽，虚线边框，显示"点击或拖拽文件到此处上传"
       2. 支持的文件格式：.docx, .pdf
       3. 检索号输入框：placeholder显示"输入项目检索号，如：798-K131538-A01"
       4. "开始分析"主按钮：蓝色，大号
       5. 快速示例区：3个按钮，显示示例项目名称
       
       样式要求：白色背景，圆角，阴影，整体简洁美观。

【AI】我来创建UploadPanel组件...

【AI生成代码】
```

**生成的UploadPanel.jsx**:

```jsx
// ═══════════════════════════════════════════════════════════════
// 【组件】UploadPanel - 上传面板
// 【功能】文件上传、检索号输入、快速示例
// ═══════════════════════════════════════════════════════════════

import React, { useState, useCallback } from 'react';
import { Card, Upload, Input, Button, Space, message } from 'antd';
import { InboxOutlined, SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import './UploadPanel.css';

const { Dragger } = Upload;

// 【配置】快速示例项目
const QUICK_EXAMPLES = [
  { name: '成都丛树110kV工程', retrievalNo: '798-K131538-A01' },
  { name: '绵阳南山110kV工程', retrievalNo: '798-K151479-A01' },
  { name: '德阳天府110kV工程', retrievalNo: '798-K162345-A01' }
];

// 【组件】UploadPanel
const UploadPanel = ({ onAnalyze, loading }) => {
  // 【状态】文件列表
  const [fileList, setFileList] = useState([]);
  
  // 【状态】检索号
  const [retrievalNo, setRetrievalNo] = useState('');

  /**
   * 【处理】文件上传状态变化
   * @param {Object} info - 上传信息
   */
  const handleUploadChange = (info) => {
    const { status, originFileObj } = info.file;
    
    if (status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      setFileList([originFileObj]);
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  /**
   * 【处理】开始分析
   */
  const handleAnalyze = useCallback(() => {
    // 【验证】至少选择一种输入方式
    if (!fileList.length && !retrievalNo.trim()) {
      message.warning('请上传文件或输入检索号');
      return;
    }

    // 【调用】父组件的分析函数
    onAnalyze({
      file: fileList[0],
      retrievalNo: retrievalNo.trim()
    });
  }, [fileList, retrievalNo, onAnalyze]);

  /**
   * 【处理】选择快速示例
   * @param {Object} example - 示例项目
   */
  const handleQuickExample = (example) => {
    setRetrievalNo(example.retrievalNo);
    message.info(`已选择：${example.name}`);
  };

  return (
    <Card 
      className="upload-panel" 
      title="📤 上传可研报告"
      bordered={false}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        
        {/* 【区域1】文件上传 */}
        <Dragger
          name="file"
          multiple={false}
          accept=".docx,.pdf,.doc"
          customRequest={({ onSuccess }) => setTimeout(onSuccess, 0)}
          onChange={handleUploadChange}
          showUploadList={false}
          disabled={loading}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            点击或拖拽文件到此处上传
          </p>
          <p className="ant-upload-hint">
            支持格式：Word (.docx, .doc)、PDF (.pdf)
          </p>
        </Dragger>

        {/* 【显示】已上传文件 */}
        {fileList.length > 0 && (
          <div className="file-preview">
            <FileTextOutlined /> {fileList[0].name}
          </div>
        )}

        {/* 【区域2】检索号输入 */}
        <Input
          placeholder="输入项目检索号，如：798-K131538-A01"
          prefix={<SearchOutlined />}
          value={retrievalNo}
          onChange={(e) => setRetrievalNo(e.target.value)}
          disabled={loading}
          size="large"
        />

        {/* 【区域3】开始分析按钮 */}
        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          onClick={handleAnalyze}
        >
          {loading ? '分析中...' : '开始分析'}
        </Button>

        {/* 【区域4】快速示例 */}
        <div className="quick-examples">
          <div className="quick-title">快速示例</div>
          <Space wrap>
            {QUICK_EXAMPLES.map((example) => (
              <Button
                key={example.retrievalNo}
                size="small"
                type="dashed"
                onClick={() => handleQuickExample(example)}
                disabled={loading}
              >
                {example.name}
              </Button>
            ))}
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default UploadPanel;
```

**生成的UploadPanel.css**:

```css
/* ═══════════════════════════════════════════════════════════════
   【样式】UploadPanel - 上传面板样式
   ═══════════════════════════════════════════════════════════════ */

.upload-panel {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #fff;
}

/* 【拖拽区域】上传样式 */
.upload-panel .ant-upload-drag {
  border-radius: 8px;
  background: #fafafa;
  border: 2px dashed #d9d9d9;
  transition: all 0.3s ease;
}

.upload-panel .ant-upload-drag:hover {
  border-color: #1890ff;
  background: #e6f7ff;
}

.upload-panel .ant-upload-drag-icon {
  margin-bottom: 16px;
}

.upload-panel .ant-upload-drag-icon .anticon {
  font-size: 48px;
  color: #1890ff;
}

.upload-panel .ant-upload-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.upload-panel .ant-upload-hint {
  font-size: 12px;
  color: #999;
}

/* 【文件预览】 */
.file-preview {
  padding: 12px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  color: #52c41a;
}

.file-preview .anticon {
  margin-right: 8px;
}

/* 【快速示例】区域 */
.quick-examples {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.quick-title {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}
```

#### ResultPanel（结果面板）

**生成的ResultPanel.jsx**:

```jsx
// ═══════════════════════════════════════════════════════════════
// 【组件】ResultPanel - 结果面板
// 【功能】展示项目信息、评分、报告
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { Card, Row, Col, Statistic, Skeleton, Empty, Button, Space } from 'antd';
import { DownloadOutlined, ShareAltOutlined, ReloadOutlined } from '@ant-design/icons';
import ProjectInfo from './ProjectInfo';
import ScoreCards from './ScoreCards';
import ScoreRadar from './ScoreRadar';
import ReportViewer from './ReportViewer';
import './ResultPanel.css';

// 【配置】8项指标配置
const SCORE_ITEMS = [
  { key: 'ratio', label: '容载比', weight: 15, color: '#1890ff' },
  { key: 'n1', label: 'N-1通过率', weight: 15, color: '#52c41a' },
  { key: 'deviceLoad', label: '设备负载率', weight: 10, color: '#faad14' },
  { key: 'loadDeviation', label: '负荷偏差率', weight: 15, color: '#f5222d' },
  { key: 'maxLoad', label: '最大负载率', weight: 10, color: '#722ed1' },
  { key: 'avgLoad', label: '平均负载率', weight: 10, color: '#13c2c2' },
  { key: 'cost', label: '投资结余率', weight: 15, color: '#eb2f96' },
  { key: 'duration', label: '建设时长', weight: 10, color: '#fa8c16' }
];

// 【组件】ResultPanel
const ResultPanel = ({ result, loading, onReanalyze }) => {
  
  // 【状态1】加载中
  if (loading) {
    return (
      <Card className="result-panel" bordered={false}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Card>
    );
  }

  // 【状态2】无数据
  if (!result) {
    return (
      <Card className="result-panel" bordered={false}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span>
              请上传可研报告或输入检索号
              <br />
              开始投资问效分析
            </span>
          }
        />
      </Card>
    );
  }

  // 【状态3】展示结果
  return (
    <div className="result-panel">
      
      {/* 【卡片1】项目基本信息 */}
      <Card 
        title="📋 项目基本信息" 
        className="result-card"
        bordered={false}
      >
        <ProjectInfo data={result.basic} />
      </Card>

      {/* 【卡片2】8项指标评分 */}
      <Card 
        title="📊 8项指标评分" 
        className="result-card"
        bordered={false}
      >
        <Row gutter={16}>
          <Col span={8}>
            {/* 左侧：评分卡片 */}
            <ScoreCards 
              scores={result.scores} 
              items={SCORE_ITEMS}
            />
          </Col>
          <Col span={16}>
            {/* 右侧：雷达图 */}
            <ScoreRadar 
              scores={result.scores} 
              items={SCORE_ITEMS}
            />
          </Col>
        </Row>
      </Card>

      {/* 【卡片3】综合评分 */}
      <Card className="total-score-card" bordered={false}>
        <Row align="middle" justify="space-between">
          <Col>
            <Statistic
              title="综合评分"
              value={result.totalScore}
              suffix="/100"
              valueStyle={{ 
                fontSize: 48, 
                color: getScoreColor(result.totalScore),
                fontWeight: 'bold'
              }}
            />
            <div className="grade-label" style={{ color: getScoreColor(result.totalScore) }}>
              {getGradeLabel(result.totalScore)}
            </div>
          </Col>
          <Col>
            <Space>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                导出报告
              </Button>
              <Button icon={<ShareAltOutlined />} size="large">
                分享
              </Button>
              <Button icon={<ReloadOutlined />} size="large" onClick={onReanalyze}>
                重新分析
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 【卡片4】分析报告 */}
      <Card 
        title="📄 投资问效分析报告" 
        className="result-card"
        bordered={false}
      >
        <ReportViewer report={result.report} />
      </Card>
    </div>
  );
};

/**
 * 【工具】根据分数获取颜色
 * @param {number} score - 分数
 * @returns {string} - 颜色代码
 */
function getScoreColor(score) {
  if (score >= 85) return '#52c41a';  // 优秀 - 绿色
  if (score >= 70) return '#1890ff';  // 良好 - 蓝色
  if (score >= 60) return '#faad14';  // 合格 - 黄色
  return '#f5222d';                   // 不合格 - 红色
}

/**
 * 【工具】根据分数获取等级标签
 * @param {number} score - 分数
 * @returns {string} - 等级标签
 */
function getGradeLabel(score) {
  if (score >= 85) return '优秀';
  if (score >= 70) return '良好';
  if (score >= 60) return '合格';
  return '不合格';
}

export default ResultPanel;
```

#### ScoreRadar（雷达图）

**生成的ScoreRadar.jsx**:

```jsx
// ═══════════════════════════════════════════════════════════════
// 【组件】ScoreRadar - 评分雷达图
// 【功能】可视化展示8项指标评分
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { Radar } from '@ant-design/charts';

// 【组件】ScoreRadar
const ScoreRadar = ({ scores, items }) => {
  
  // 【数据转换】转换为图表需要的格式
  const data = items.map(item => {
    const scoreData = scores[item.key];
    const score = scoreData?.score || 0;
    // 【计算】满分标准化为100分制
    const normalizedScore = (score / item.weight * 100).toFixed(0);
    
    return {
      item: item.label,
      score: parseInt(normalizedScore),
      fullMark: 100,
      originalScore: score,
      weight: item.weight
    };
  });

  // 【配置】雷达图配置
  const config = {
    data,
    xField: 'item',
    yField: 'score',
    
    // 【元数据】配置
    meta: {
      score: {
        alias: '评分',
        min: 0,
        max: 100,
      },
    },
    
    // 【坐标轴】配置
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
    
    // 【区域】填充样式
    area: {
      style: {
        fillOpacity: 0.3,
      },
    },
    
    // 【点】样式
    point: {
      size: 4,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#1890ff',
        lineWidth: 2,
      },
    },
    
    // 【颜色】
    color: '#1890ff',
    
    // 【提示框】
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.item,
          value: `${datum.originalScore}/${datum.weight}分 (满分100分制: ${datum.score}分)`
        };
      }
    },
    
    // 【标签】
    label: {
      offset: 8,
      style: {
        fontSize: 10,
      },
    },
  };

  return (
    <div style={{ height: 350 }}>
      <Radar {...config} />
    </div>
  );
};

export default ScoreRadar;
```

### 2.3 API集成

**生成的services/api.js**:

```javascript
// ═══════════════════════════════════════════════════════════════
// 【服务】API - 后端接口调用封装
// 【功能】封装灵搭Agent API调用
// ═══════════════════════════════════════════════════════════════

import axios from 'axios';

// 【配置】API配置
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.xxx.com/agent',
  uuid: import.meta.env.VITE_AGENT_UUID || '',
  authKey: import.meta.env.VITE_AUTH_KEY || '',
  timeout: 60000  // 60秒超时
};

/**
 * 【核心函数】调用投资问效Agent
 * @param {string} query - 用户查询（文档文本或检索号）
 * @param {Object} context - 上下文信息
 * @returns {Promise<Object>} 分析结果
 */
export async function callInvestmentAgent(query, context = {}) {
  try {
    const response = await axios.post(
      `${API_CONFIG.baseUrl}/${API_CONFIG.uuid}`,
      {
        query,
        context: {
          ...context,
          timestamp: new Date().toISOString(),
          client: 'web'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.authKey}`
        },
        timeout: API_CONFIG.timeout
      }
    );

    // 【校验】响应状态
    if (response.data.code !== 200) {
      throw new Error(response.data.message || 'Agent返回错误');
    }

    // 【解析】提取报告
    return parseAgentResponse(response.data.data.answer);
    
  } catch (error) {
    console.error('API调用失败:', error);
    
    // 【错误处理】友好的错误信息
    if (error.response) {
      throw new Error(`服务器错误: ${error.response.status}`);
    } else if (error.request) {
      throw new Error('网络请求失败，请检查网络连接');
    } else {
      throw new Error(error.message || '未知错误');
    }
  }
}

/**
 * 【函数】通过检索号查询项目
 * @param {string} retrievalNo - 项目检索号
 * @returns {Promise<Object>} 分析结果
 */
export async function analyzeByRetrievalNo(retrievalNo) {
  return callInvestmentAgent(retrievalNo, {
    action: 'query_by_retrieval_no',
    retrievalNo
  });
}

/**
 * 【函数】上传文档分析
 * @param {File} file - 上传的文件
 * @returns {Promise<Object>} 分析结果
 */
export async function analyzeDocument(file) {
  // 【步骤1】读取文件内容
  const text = await readFileContent(file);
  
  // 【步骤2】调用Agent
  return callInvestmentAgent(text, {
    action: 'analyze_document',
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  });
}

/**
 * 【工具】读取文件内容
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
 * 【工具】解析Agent响应
 * @param {string} answer - Agent返回的文本
 * @returns {Object} 结构化数据
 */
function parseAgentResponse(answer) {
  try {
    // 【方式1】从Markdown代码块中提取JSON
    const jsonMatch = answer.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[1]);
      return {
        success: true,
        type: 'structured',
        data: data,
        report: answer  // 完整Markdown报告
      };
    }
    
    // 【方式2】尝试直接解析整个回答
    const directParse = JSON.parse(answer);
    return {
      success: true,
      type: 'json',
      data: directParse,
      report: answer
    };
    
  } catch (e) {
    // 【回退】返回原始文本
    return {
      success: true,
      type: 'text',
      data: null,
      report: answer,
      parseError: e.message
    };
  }
}

export default {
  callInvestmentAgent,
  analyzeByRetrievalNo,
  analyzeDocument
};
```

---

## 第三部分：测试与部署

### 3.1 测试清单

| 测试项 | 测试步骤 | 预期结果 |
|--------|---------|---------|
| 文件上传 | 选择.docx文件上传 | 文件显示在列表中 |
| 检索号输入 | 输入有效检索号 | 点击分析后显示结果 |
| API调用 | 发起分析请求 | 返回200和数据 |
| 项目信息展示 | 查看结果面板 | 正确显示项目信息 |
| 雷达图渲染 | 查看评分区域 | 8项指标雷达图正常显示 |
| Markdown渲染 | 查看报告区域 | 格式正确渲染 |
| 响应式布局 | 缩小浏览器窗口 | 布局自适应调整 |
| 错误处理 | 输入无效检索号 | 显示友好错误提示 |

### 3.2 部署步骤

```bash
# 【步骤1】构建生产环境
npm run build

# 【步骤2】测试构建结果
npm run preview

# 【步骤3】部署到服务器
# 将dist目录上传到Nginx服务器
# 配置nginx.conf

server {
    listen 80;
    server_name investment-analysis.xxx.com;
    
    location / {
        root /var/www/power-investment-analysis/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 附录：参考文件

### 📎 附件1：API接口文档
**文件**: `API使用说明.md`

### 📎 附件2：案例流程说明
**文件**: `案例智能体流程说明.pdf`

### 📎 附件3：业务汇报材料
**文件**: `35千伏及以上已投产项目投资问效智能场景汇报-0623v5.1.pdf`

### 📎 附件4：架构示意图
**文件**: `案例智能体示意图.pdf`

---

**文档信息**  
- 编写日期: 2026年3月23日
- 版本: v2.0
- 编写人: AI教学团队
- 适用对象: 国网四川电力AI种子团队
