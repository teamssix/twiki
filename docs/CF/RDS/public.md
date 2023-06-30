---
title: 公开访问
---

## 在阿里云上创建 RDS 公开访问

使用以下命令为 RDS 启用公开访问。

```bash
cf alibaba rds public
```

### 查看已经公开的信息

加上 ls 列出配置过的公开访问信息。

```bash
cf alibaba rds public ls
```

### 取消公开共享

加上 cancel 取消公开访问。

```bash
cf alibaba rds public cancel
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>
