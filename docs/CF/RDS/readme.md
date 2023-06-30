---
title: 列出云数据库
---

## 列出云数据库

使用以下命令列出阿里云 RDS 云数据库服务

```bash
cf alibaba rds ls
```

如果想指定特定属性，可以使用以下参数：

|            参数            |      用途      |
| :------------------------: | :------------: |
|    `-r` 或者 `--region`    |    指定区域    |
| `-i` 或者 `--DBInstanceID` | 指定数据库 ID  |
|    `-e` 或者 `--engine`    | 指定数据库类型 |

::: warning 注意

* 为了提高程序运行速度，当获取一次结果后，获取的结果会缓存下来，缓存目录为 `~/.config/cf/cache.db`
* 如果不想使用缓存数据，可以在执行命令的时候加上 `--flushCache` 参数

:::

在列出数据库实例时加上 -a 命令，会列出数据库实例的详细信息。

```bash
cf alibaba rds ls -a
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>