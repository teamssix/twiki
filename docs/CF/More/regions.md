---
title: 列出所有的区域
---

## 列出所有的区域

使用 `regions` 命令可以列出所有的区域，在该命令后需要加上对应的云厂商，目前仅支持阿里云，后续会支持其他的云厂商。

```bash
cf regions aliyun
```

   <img width="800" src="/img/1656647704.png"><br>

> 列出的区域结果是没有缓存的，每次列出的区域都是调用接口查询到的实时结果，这里的列出区域调用的是 ecs 的相关接口。

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月1日"
    }
  }
</script>