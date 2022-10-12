---
title: 列出所有服务
---

## 一键列出阿里云上的 OSS、ECS、RDS 服务

直接使用 `ls` 命令即可列出当前访问凭证下的云服务资源。

```bash
cf alibaba ls
```

如果想指定区域，可以使用 `-r` 或者 `--region` 命令

```bash
cf alibaba ls -r cn-beijing
```

在 CF 中还集成了阿里云的私有区域，不过在默认情况下是不调用的，如果想遍历阿里云的私有区域，可以使用 `-a` 命令表示遍历所有区域

```bash
cf alibaba ls -a
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年10月12日"
    }
  }
</script>
