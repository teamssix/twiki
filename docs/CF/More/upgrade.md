---
title: 自动更新
---

## 自动更新

使用 `upgrade` 命令可以自动更新 CF

```bash
cf upgrade
```

值得注意的是，CF 会先判断当前 IP 是不是大陆地址，如果是大陆地址则会采用 ghproxy.com 代理进行更新，如果是非大陆地址则会直接采用 github.com 进行更新。

>  CF 会自动检查是否有新版本可用，如果发现新版本，CF 就会进行提醒，为保证 CF 的执行速度，每次检查时间间隔会大于 24 小时。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>