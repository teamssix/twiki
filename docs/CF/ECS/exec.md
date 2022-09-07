---
title: 在实例上执行命令
---

## 在阿里云上执行命令

### 执行单行命令

在执行命令前，如果未指定具体的实例，则 CF 会提醒是否是选择全部实例还是某个实例。

使用 `-c` 参数执行单个命令

```bash
cf alibaba ecs exec -c whoami
```

指定某个实例执行命令

```bash
cf alibaba ecs exec -c whoami -i i-abcdefghijklmn
```

::: warning 注意

在 CF 中 Windows 系统默认会以 bat 脚本执行命令，如果想执行 PowerShell 下的命令，可以使用 `-s ps` 或者 `--scriptType ps` 参数。

::: 

执行 PowerShell 下的命令

```bash
cf alibaba ecs exec -c \$PSVersionTable -i i-abcdefghijklmn -s ps
```

CF 执行命令默认等待时间为 60 秒，如果命令需要较长的执行时间，可以使用 -t 命令指定最大等待时间。

```bash
cf alibaba ecs exec -c whoami -t 120
```

### 执行多行命令

使用 `-f` 参数执行文本文件里的命令，一行一个命令

```bash
cf alibaba ecs exec -f teamssix.txt
```

## 在腾讯云上执行命令

### 云服务器

执行单行命令

```bash
cf tencent cvm exec -c whoami
```

执行多行命令

```bash
cf tencent cvm exec -f teamssix.txt
```

### 轻量应用服务器

执行单行命令

```bash
cf tencent lh exec -c whoami
```

执行多行命令

```bash
cf tencent lh exec -f teamssix.txt
```

::: warning 注意


* 在阿里云下执行命令，目标租户可能会收到阿里云的云盾告警消息，所以此操作需谨慎。
* CF 获取命令结果的等待时间默认是 60 秒，如果命令执行需要较长的时间，则可以通过 `-t` 或者 `--timeOut` 参数指定最长的等待时间，避免因命令执行过久，超过 60 秒以至于 CF 自动退出的情况。

::: 

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>