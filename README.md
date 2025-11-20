## 代码说明

### 1. 架构说明

### 2. 接口说明

- url注入点提交接口：POST

```json
/tt-api/api/basic
{
	"url": "xxx.abc.com",
	"injectionType": 1,
	"injectionPath": "/path1/path2?id=11"
}
```

- 获取url列表信息[get],后端接口：/tt-api/api/collection/urlget 响应数据格式

```json
{
  "code": 200,
  "data": {
    "url": "xxx",
    "injectionType": "xxx",
    "injectionPath": "xxx"
  }
}
```
