---
title: 列出所有的区域
---

## 列出阿里云上的所有的区域

使用 `regions` 命令可以列出所有的区域，在该命令后需要加上对应的云厂商以及云服务，目前仅支持阿里云，后续会支持其他的云厂商。

列出阿里云 ECS 的可用区域

```bash
cf alibaba regions ecs
```

在 CF 中还集成了阿里云的 ECS 私有区域，不过在默认情况下是不调用的，如果想列出阿里云的私有区域，可以使用 `-a` 命令列出所有区域

```bash
cf alibaba regions ecs -a
```

列出阿里云 RDS 的可用区域

```bash
cf alibaba regions rds
```

### 列出腾讯云上的所有的区域

列出腾讯云 CVM 的可用区域

```bash
cf tencent regions cvm
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年10月12日"
    }
  }
</script>