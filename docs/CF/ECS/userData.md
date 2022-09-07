---
title: 一键获得用户数据
---

## 在阿里云上一键获得用户数据

使用 `-u` 命令一键获得用户数据

```bash
cf alibaba ecs exec -u
```

指定单个实例获取用户数据

```bash
cf alibaba ecs exec -u -i i-abcdefghijklmn
```

## 在腾讯云上一键获得用户数据

### 云服务器

```bash
cf tencent cvm exec -u
```

### 轻量应用服务器

```bash
cf tencent lh exec -u
```

> 由于临时访问凭证是在元数据里的，所以存在因元数据处于加固模式而导致临时访问凭证无法获取的可能性，因此当 CF 检测到目标元数据处于加固模式时，会自动获取访问元数据的 Token，从而利用该 Token 获得临时访问凭证，简单理解的话，就是 CF 会自动绕过目标的元数据加固模式。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>