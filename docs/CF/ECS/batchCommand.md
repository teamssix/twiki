---
title: 一键执行三要素
---

## 一键执行三要素

使用 `-b` 命令一键执行三要素命令，快速证明权限获取，方便 HVV

```bash
cf alibaba ecs exec -b
```

指定单个实例获取三要素

```bash
cf alibaba ecs exec -b -i i-abcdefghijklmn
```

如果想在腾讯云下执行这些命令，只需要使用 `cf tencent` 跟上对应的命令即可。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月18日"
    }
  }
</script>