---
title: 一键执行三要素
---

## 一键执行三要素

使用 `-b` 命令一键执行三要素命令，快速证明权限获取，方便 HVV

```bash
cf ecs exec -b
```

   <img width="550" src="/img/1656584649.png">

指定单个实例获取三要素

```bash
cf ecs exec -b -i i-abcdefghijklmn
```

   <img width="550" src="/img/1656601334.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>