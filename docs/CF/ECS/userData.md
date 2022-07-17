---
title: 一键获得用户数据
---

## 一键获得用户数据

使用 `-u` 命令一键获得用户数据

```bash
cf alibaba ecs exec -u
```

> 由于用户数据是在元数据里的，所以存在因元数据处于加固模式而导致用户数据无法获取的可能性，因此当 CF 检测到目标元数据处于加固模式时，会自动获取访问元数据的 Token，从而利用该 Token 获得用户数据，简单理解的话，就是 CF 会自动绕过目标的元数据加固模式。

指定单个实例获取用户数据

```bash
cf alibaba ecs exec -u -i i-abcdefghijklmn
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