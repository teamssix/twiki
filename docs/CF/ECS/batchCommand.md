---
title: 一键执行三要素
---

## 在阿里云上一键执行三要素

使用 `-b` 命令一键执行三要素命令，快速证明权限获取，方便 HVV

```bash
cf alibaba ecs exec -b
```

指定单个实例获取三要素

```bash
cf alibaba ecs exec -b -i i-abcdefghijklmn
```

## 在腾讯云上一键执行三要素

### 云服务器

```bash
cf tencent cvm exec -b
```

### 轻量应用服务器

```bash
cf tencent lh exec -b
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>