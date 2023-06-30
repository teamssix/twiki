---
title: 添加白名单
---

## 在阿里云上为 RDS 添加白名单

使用以下命令为数据库添加白名单，`-w` 参数指定 CIDR 地址或者单个 IP 地址。

```bash
cf alibaba rds whiteList -w <ip>
```

### 查看添加过的 RDS 白名单信息

加上 ls 列出之前添加过的白名单信息。

```bash
cf alibaba rds whiteList ls
```

### 删除之前添加过的白名单信息

加上 del 删除之前添加过的白名单信息。

```bash
cf alibaba rds whiteList del
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>
