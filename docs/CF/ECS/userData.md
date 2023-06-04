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

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>