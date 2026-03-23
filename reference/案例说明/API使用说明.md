# 投资问效API接口使用说明

## 概述

投资问效API提供项目信息的查询服务，包含3个核心接口，覆盖项目基本信息、投资数据和运行指标共25个字段。

| 信息 | 说明 |
|------|------|
| 基础URL | `http://127.0.0.1:5000` |
| 数据格式 | JSON |
| 编码 | UTF-8 |
| 记录总数 | 115条 |

---

## 快速开始

### 启动服务

```bash
cd api
pip install flask
python app.py
```

启动成功后访问 http://127.0.0.1:5000 查看API列表。

---

## 接口列表

### 1. 项目基本信息

获取项目的基础属性信息。

**请求**

```
GET /api/project/basic
```

**参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| retrieval_no | string | 是 | 检索号 |

**返回字段**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 查询号 | string | 查询标识 |
| 检索号 | string | 唯一标识 |
| 项目名称 | string | 项目全称 |
| 所在区县 | string | 地理位置 |
| 电压等级 | integer | 电压等级(kV) |
| 调度命名 | string | 调度名称 |
| 项目类型 | string | 如：经济效益类 |
| 项目解决问题 | string | 建设目的 |
| 实际开工日期 | string | 开工时间(ISO格式) |
| 实际投产日期 | string | 投产时间(ISO格式) |

**请求示例**

```bash
curl "http://127.0.0.1:5000/api/project/basic?retrieval_no=798-K131538-A01"
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "查询号": "798-K131538-A01成都成华丛树110kV输变电工程",
    "检索号": "798-K131538-A01",
    "项目名称": "成都成华丛树110kV输变电工程",
    "所在区县": "成都市成华",
    "电压等级": 110,
    "调度命名": "丛树站",
    "项目类型": "经济效益类",
    "项目解决问题": "满足新增负荷需求（含解决重过载）",
    "实际开工日期": "2020-11-01T00:00:00",
    "实际投产日期": "2022-12-01T00:00:00"
  }
}
```

---

### 2. 项目投资数据

获取项目的概算和结算投资金额。

**请求**

```
GET /api/project/investment
```

**参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| retrieval_no | string | 是 | 检索号 |

**返回字段**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 检索号 | string | 唯一标识 |
| 初设概算项目总投资（万元） | number | 概算金额 |
| 结算批复项目动态投资（万元） | number | 结算金额 |

**请求示例**

```bash
curl "http://127.0.0.1:5000/api/project/investment?retrieval_no=798-K131538-A01"
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "检索号": "798-K131538-A01",
    "初设概算项目总投资（万元）": 6196,
    "结算批复项目动态投资（万元）": 6309.045312
  }
}
```

---

### 3. 项目运行指标

获取项目投运后的各项运行指标数据。

**请求**

```
GET /api/project/operation
```

**参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| retrieval_no | string | 是 | 检索号 |

**返回字段**

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 检索号 | string | 唯一标识 |
| 投运后第1年的容载比实际值 | number | 容载比指标 |
| 投运后第2年的容载比实际值 | number | 容载比指标 |
| 投运后第3年的容载比实际值 | number | 容载比指标 |
| 投运前一年本项目同电压等级所在地市N-1通过率 | number | N-1通过率 |
| 投运当年年项目电压等级所在地市N-1通过率 | number | N-1通过率 |
| 项目投运次年关联设备负载率 | string | 各设备负载率明细 |
| 投运后1年（新增设备）实际负荷值(万千瓦) | number | 实际负荷 |
| 投运后1年最大负载率 | number | 最大负载率 |
| 投运后2年最大负载率 | number | 最大负载率 |
| 投运后3年最大负载率 | number | 最大负载率 |
| 投运后1年平均负载率 | number | 平均负载率 |
| 投运后2年平均负载率 | number | 平均负载率 |
| 投运后3年平均负载率 | number | 平均负载率 |

**请求示例**

```bash
curl "http://127.0.0.1:5000/api/project/operation?retrieval_no=798-K131538-A01"
```

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "检索号": "798-K131538-A01",
    "投运后第1年的容载比实际值": null,
    "投运后第2年的容载比实际值": null,
    "投运后第3年的容载比实际值": null,
    "投运前一年本项目同电压等级所在地市N-1通过率": null,
    "投运当年年项目电压等级所在地市N-1通过率": null,
    "项目投运次年关联设备负载率": "1#丛树19.92%\n2#丛树20.09%\n1#范家坡58.71%",
    "投运后1年（新增设备）实际负荷值(万千瓦)": 18.07,
    "投运后1年最大负载率": 1.434126,
    "投运后2年最大负载率": null,
    "投运后3年最大负载率": null,
    "投运后1年平均负载率": 0.0337,
    "投运后2年平均负载率": 0.1075,
    "投运后3年平均负载率": null
  }
}
```

---

### 4. 检索号列表（辅助接口）

获取所有可用的检索号列表。

**请求**

```
GET /api/project/list
```

**参数**

无

**响应示例**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 115,
    "检索号列表": ["798-K131538-A01", "798-K151479-A01", "..."],
    "提示": "使用检索号调用其他接口获取详细信息"
  }
}
```

---

## 错误响应

### 参数缺失 (400)

```json
{
  "code": 400,
  "message": "缺少参数: 检索号 或 retrieval_no",
  "data": null
}
```

### 记录不存在 (404)

```json
{
  "code": 404,
  "message": "未找到检索号对应的记录",
  "data": null
}
```

---

## 代码调用示例

### Python

```python
import requests

base_url = "http://127.0.0.1:5000"
retrieval_no = "798-K131538-A01"

# 获取基本信息
resp = requests.get(f"{base_url}/api/project/basic", params={"retrieval_no": retrieval_no})
print(resp.json())

# 获取投资数据
resp = requests.get(f"{base_url}/api/project/investment", params={"retrieval_no": retrieval_no})
print(resp.json())

# 获取运行指标
resp = requests.get(f"{base_url}/api/project/operation", params={"retrieval_no": retrieval_no})
print(resp.json())
```

### JavaScript

```javascript
const baseUrl = "http://127.0.0.1:5000";
const retrievalNo = "798-K131538-A01";

// 获取基本信息
fetch(`${baseUrl}/api/project/basic?retrieval_no=${retrievalNo}`)
  .then(res => res.json())
  .then(data => console.log(data));

// 获取投资数据
fetch(`${baseUrl}/api/project/investment?retrieval_no=${retrievalNo}`)
  .then(res => res.json())
  .then(data => console.log(data));

// 获取运行指标
fetch(`${baseUrl}/api/project/operation?retrieval_no=${retrievalNo}`)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 字段覆盖说明

三个核心接口共返回25个唯一字段：

| 接口 | 字段数 | 说明 |
|------|--------|------|
| /api/project/basic | 10 | 项目基本信息 |
| /api/project/investment | 2 | 投资金额(检索号除外) |
| /api/project/operation | 13 | 运行指标(检索号除外) |
| **合计** | **25** | 覆盖全部字段 |

---

## 注意事项

1. 所有接口仅支持GET请求
2. 检索号区分大小写
3. 空值字段返回`null`
4. 日期字段为ISO 8601格式
5. 服务默认监听5000端口
