---
title: 一键获得临时访问凭证
---

## 一键获得临时访问凭证

使用 `-m` 命令一键获得临时访问凭证

```bash
cf ecs exec -m
```

   <img width="1000" src="/img/1656602938.png">

> 由于临时访问凭证是在元数据里的，所以存在因元数据处于加固模式而导致临时访问凭证无法获取的可能性，因此当 CF 检测到目标元数据处于加固模式时，会自动获取访问元数据的 Token，从而利用该 Token 获得临时访问凭证，简单理解的话，就是 CF 会自动绕过目标的元数据加固模式。

指定单个实例获取临时访问凭证

```bash
cf ecs exec -m -i i-abcdefghijklmn
```

   <img width="800" src="/img/1656603031.png">

::: tip Tips

当获得临时访问凭证后，可以将这个临时访问凭证配置到 CF 中，然后继续进行信息收集、内网横向。

:::

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>