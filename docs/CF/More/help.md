---
title: 查看帮助信息
---

## 使用 `help` 命令查看帮助信息

在 CF 中，可以使用 `help` 命令查看其他命令的帮助信息。

例如查看 `ecs` 命令的帮助信息。

```bash
cf help ecs
```

> 使用 `cf ecs help` 也是一样的效果

   <img width="800" src="/img/1656649040.png">

查看 `ecs exec` 命令的帮助信息

```bash
cf help ecs exec
```

   <img width="800" src="/img/1656649250.png">

## 使用 `-h` 参数查看帮助信息

在 CF 的任何命令后面，使用 `-h` 或者 `--help` 也可以去查看帮助信息。

例如查看 `ecs` 命令的帮助信息。

```bash
cf ecs -h
```

   <img width="800" src="/img/1656649359.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月1日"
    }
  }
</script>