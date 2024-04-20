---
title: 使用方法
---

## 查看帮助信息

使用 -h 参看帮助信息。

```yaml
> lc -h

lc (list cloud) 是一个多云攻击面资产梳理工具

Usage:
  lc [flags]

Flags:
配置:
  -c, -config string  指定配置文件路径 (default "$HOME/.config/lc/config.yaml")
  -t, -threads int    指定扫描的线程数量 (default 3)

过滤:
  -i, -id string[]        指定要使用的配置（以逗号分隔）
  -p, -provider string[]  指定要使用的云服务商（以逗号分隔）
  -ep, -exclude-private   从输出的结果中排除私有 IP

输出:
  -o, -output string  将结果输出到指定的文件中
  -s, -silent         只输出结果
  -v, -version        输出工具的版本
  -debug              输出调试日志信息
```

## 使用 LC

直接运行 `lc` 命令来列举您的云上资产。

```sh
lc
```

如果没有列举出结果，那么可能是因为本身云上没有资产，或者访问凭证的权限不足，这里我们建议为访问凭证赋予全局可读权限即可。

### 配置

使用 `-c` 指定配置文件路径，默认路径是 `$HOME/.config/lc/config.yaml`

```sh
lc -c ./config.yaml
```

使用 `-t` 指定运行线程数量，默认是 3 个线程，不建议开太大的线程，不然结果可能会有遗漏。

```sh
lc -t 2
```

### 过滤

使用 `-i` 指定要使用的配置，支持一次指定多个，以逗号分隔。

```sh
lc -i aliyun_default,tencent_cloud_default
```

使用 `-p` 指定要使用的云服务商，支持一次指定多个，以逗号分隔。

```sh
lc -p "aliyun,tencent cloud"
```

使用 `-ep` 参数排除结果中的内网 IP。

```sh
lc -ep
```

### 输出

使用 `-o` 参数将结果导出到文件中。

```sh
lc -o ./results.txt
```

使用 `-s` 参数可以只展示结果，而不展示程序提示信息，便于使用管道符结合其他工具使用。

```sh
lc -s
```

使用 `-v` 参数查看工具版本信息。

```sh
lc -v
```

使用 `-debug` 参数可以查看详细输出日志。

```sh
lc -debug
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 4 月 20 日"
    }
  }
</script>