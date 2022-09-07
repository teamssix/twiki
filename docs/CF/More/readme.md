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

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>

