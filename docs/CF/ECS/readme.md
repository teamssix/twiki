---
title: 列出弹性计算服务
---

::: warning 注意

* 为了提高程序运行速度，当获取一次结果后，获取的结果会缓存下来，缓存文件为 `~/.config/cf/cache.db`
* 如果不想使用缓存数据，可以在执行命令的时候加上 `--flushCache` 参数

:::

## 列出阿里云的弹性计算服务

使用以下命令列出 ECS 弹性计算服务

```bash
cf alibaba ecs ls
```

如果想指定区域，可以使用 `-r` 或者 `--region` 参数

```bash
cf alibaba ecs ls -r cn-beijing
```

如果想指定实例，可以使用 `-i` 或者 `--instanceID` 参数

```bash
cf alibaba ecs ls -i i-abcdefghijklmn
```

如果想查看正在运行的实例，可以使用`--running` 参数

```bash
cf alibaba ecs ls --running
```

在 CF 中还集成了阿里云的私有区域，不过在默认情况下是不调用的，如果想遍历阿里云的私有区域，可以使用 `-a` 命令表示遍历所有区域

```bash
cf alibaba ecs ls -a
```

## 列出腾讯云的弹性计算服务

### 云服务器

使用以下命令列出 CVM 云服务器

```bash
cf tencent cvm ls
```

可以使用 `-r` 或者 `--region` 参数指定区域，使用 `-i` 或者 `--instanceID` 参数指定实例 ID，使用`--running` 参数查看正在运行的实例。

### 轻量应用服务器

使用以下命令列出 LightHouse 轻量应用服务器

```bash
cf tencent lh ls
```

可以使用`--running` 参数查看正在运行的实例。

## 列出 AWS 的弹性计算服务

使用以下命令列出 EC2 弹性计算服务

```bash
cf aws ec2 ls
```

如果想指定区域，可以使用 `-r` 或者 `--region` 参数

```bash
cf aws ec2 ls -r us-east-1
```

如果想指定实例，可以使用 `-i` 或者 `--instanceID` 参数

```bash
cf aws ec2 ls -i i-abcdefghijklmn
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年12月4日"
    }
  }
</script>