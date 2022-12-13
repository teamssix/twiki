---
title: 列出对象存储服务
---

::: warning 注意

* 为了提高程序运行速度，当获取一次结果后，获取的结果会缓存下来，缓存文件为 `~/.config/cf/cache.db`
* 如果不想使用缓存数据，可以在执行命令的时候加上 `--flushCache` 参数

::: 

## 列出阿里云 OSS 对象存储服务

使用以下命令列出 OSS 对象存储服务

```bash
cf alibaba oss ls
```

如果想指定获取对象的数量，可以使用 `-n` 或者 `--number` 参数

```bash
cf alibaba oss ls -n 100
```

> 当 CF 使用缓存数据时，由于对象数量已经被缓存，所以此时 -n 命令是无效的。

如果想指定区域，可以使用 `-r` 或者 `--region` 参数

```bash
cf alibaba oss ls -r cn-beijing
```

在有些情况下，当前 AK 可能会没有列出 Bucket 的权限，如果你知道 Bucket 的名称，可以使用 `-b` 指定 Bucket

```bash
cf alibaba oss ls -b bucket_name
```

这时可能会碰到没有获取 Bucket 区域的情况，加上 `-r` 参数指定区域即可，例如指定 cn-hangzhou

```bash
cf alibaba oss ls -b bucket_name -r cn-hangzhou
```

## 列出 AWS S3 对象存储服务

使用以下命令列出 S3 对象存储服务

```bash
cf aws s3 ls
```

如果想指定获取对象的数量，可以使用 `-n` 或者 `--number` 参数

```bash
cf aws s3 ls -n 100
```

> 当 CF 使用缓存数据时，由于对象数量已经被缓存，所以此时 -n 命令是无效的。

如果想指定区域，可以使用 `-r` 或者 `--region` 参数

```bash
cf aws s3 ls -r us-east-1
```

## 列出华为云 OBS 对象存储服务

使用以下命令列出 OBS 对象存储服务

```bash
cf huawei obs ls
```

如果想指定获取对象的数量，可以使用 `-n` 或者 `--number` 参数

```bash
cf huawei obs ls -n 100
```

> 当 CF 使用缓存数据时，由于对象数量已经被缓存，所以此时 -n 命令是无效的。

如果想指定区域，可以使用 `-r` 或者 `--region` 参数

```bash
cf huawei obs ls -r cn-north-4
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年12月13日"
    }
  }
</script>