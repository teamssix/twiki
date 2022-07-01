---
title: 自动更新
---

## 自动更新

使用 `upgrade` 命令可以自动更新 CF

```bash
cf upgrade
```

   <img width="1000" src="/img/1656691690.png">

CF 会自动检查是否有新版本可用，如果发现新版本，CF 就会进行提醒。

   <img width="900" src="/img/1656693203.png">

>  为保证 CF 的执行速度，每次检查时间间隔会大于 24 小时。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月1日"
    }
  }
</script>