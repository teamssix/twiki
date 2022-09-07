---
title: 查看帮助信息
---

## 使用 help 命令查看帮助信息

在 CF 中，可以使用 help 命令查看其他命令的帮助信息。

例如查看阿里云 ECS 命令的帮助信息。

```bash
cf help alibaba ecs
```

> 使用 `cf alibaba ecs help` 也是一样的效果

查看`alibaba ecs exec` 命令的帮助信息

```bash
cf help alibaba ecs exec
```

## 使用 `-h` 参数查看帮助信息

在 CF 的任何命令后面，使用 `-h` 或者 `--help` 也可以查看帮助信息。

例如查看阿里云 `ecs` 命令的帮助信息。

```bash
cf alibaba ecs -h
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>