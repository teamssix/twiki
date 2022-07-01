---
title: 列出所有服务
---

## 列出所有服务

直接使用 `ls` 命令即可列出当前访问凭证下的 OSS 和 ECS 服务，未来会支持更多服务。

```bash
cf ls
```

   <img width="1000" src="/img/1656584422.png">

在列出服务时，指定区域

```bash
cf ls -r cn-beijing
```

   <img width="1000" src="/img/1656644501.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月1日"
    }
  }
</script>