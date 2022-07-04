---
title: 列出所有的区域
---

## 列出所有的区域

使用 `regions` 命令可以列出所有的区域，在该命令后需要加上对应的云厂商以及云服务，目前仅支持阿里云，后续会支持其他的云厂商。

列出阿里云 ECS 的可用区域

```bash
cf regions aliyun ecs
```

   <img width="800" src="/img/1656930737.png">

列出阿里云 RDS 的可用区域

```bash
cf regions aliyun rds
```

   <img width="1000" src="/img/1656930821.png">

> 列出的区域结果是没有缓存的，每次列出的区域都是调用接口查询到的实时结果。

<Vssue />