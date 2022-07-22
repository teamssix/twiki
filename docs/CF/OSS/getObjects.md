---
title: 下载存储桶里的对象
---

## 下载存储桶里的对象

使用 `oss get` 命令下载存储桶里的对象，在使用的时候需要使用`-b`命令指定存储桶的名称

```bash
cf alibaba oss get -b bucketName
```

如果没有指定对象，则 CF 会进行提示，这里选择 `all` 表示下载所有对象

## 下载指定的对象

如果想下载指定的对象，除了像上面那样进行选择外，还可以直接使用 `-k`命令选择你想下载的对象

```bash
cf alibaba oss get -b bucketName -k objectKey
```

## 指定保存的目录

下载下来的对象会被默认保存在终端所在目录下，如果想保存到特定的目录下，则可以使用`-o` 命令

```
cf alibaba oss get -b bucketName -k objectName -o outputPath
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月22日"
    }
  }
</script>