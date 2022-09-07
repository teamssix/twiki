---
title: 列出弹性计算服务
---

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

::: warning 注意

* 为了提高程序运行速度，当获取一次结果后，获取的结果会缓存下来，缓存文件为 `~/.config/cf/cache.db`
* 如果不想使用缓存数据，可以在执行命令的时候加上 `--flushCache` 参数

:::

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>