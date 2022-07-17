---
title: 列出弹性计算服务
---

## 列出弹性计算服务

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

::: warning 注意

* 为了提高程序运行速度，当获取一次结果后，获取的结果会缓存下来，缓存目录为 `~/.cf/cache`
* 如果不想使用缓存数据，可以在执行命令的时候加上 `--flushCache` 参数

:::

如果想在腾讯云下执行这些命令，只需要使用 `cf tencent` 跟上对应的命令即可。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月18日"
    }
  }
</script>