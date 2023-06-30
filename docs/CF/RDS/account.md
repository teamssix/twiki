---
title: 创建账号
---

## 在阿里云上一键创建数据库账号

使用以下命令为 RDS 添加账号。

```bash
cf alibaba rds account
```

默认会创建 crossfire 用户，且赋予所有权限，也可以使用 -u 指定其他用户名。

### 查看已经创建的账号

加上 ls 查看已经创建的账号。

```bash
cf alibaba rds account ls
```

### 删除所创建的账号

加上 del 删除已经创建的账号。

```bash
cf alibaba rds account del
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>
