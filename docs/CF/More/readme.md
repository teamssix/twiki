---
title: 列出所有服务
---

## 列出所有服务

直接使用 `ls` 命令即可列出当前访问凭证下的云服务资源。

```bash
cf ls
```

   <img width="1000" src="/img/1656867011.png">

如果想指定区域，可以使用 `-r` 或者 `--region` 命令

```bash
cf ls -r cn-beijing
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月5日"
    }
  }
</script>
