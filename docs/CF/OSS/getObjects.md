---
title: 下载存储桶里的对象
---

## 下载存储桶里的对象

使用 `oss get` 命令下载存储桶里的对象，在使用的时候需要使用`-b`命令指定存储桶的名称

```bash
cf oss get -b bucketName
```

   <img width="700" src="/img/1657545778.png">

如果没有指定对象，则 CF 会进行提示，这里选择 `all` 表示下载所有对象

   <img width="800" src="/img/1657545935.png">

## 下载指定的对象

如果想下载指定的对象，除了像上面那样进行选择外，还可以直接使用 `-k`命令选择你想下载的对象

```bash
cf oss get -b bucketName -k objectKey
```

   <img width="800" src="/img/1657546071.png">

## 指定保存的目录

下载下来的对象会被默认保存在终端所在目录下，如果想保存到特定的目录下，则可以使用`-o` 命令

```
cf oss get -b bucketName -k objectName -o outputPath
```

   <img width="800" src="/img/1657546184.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月11日"
    }
  }
</script>