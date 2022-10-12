---
title: 下载存储桶里的对象
---

## 下载存储桶里的对象

使用以下命令下载存储桶里的对象

```bash
cf alibaba oss obj get
```

指定存储桶

```bash
cf alibaba oss obj get -b bucketName
```

指定存储桶以及对象

```bash
cf alibaba oss obj get -b bucketName -k objectName
```

保存到指定目录

```bash
cf alibaba oss obj get -o ./result
```

在有些情况下，当前 AK 可能会没有列出 Bucket 的权限，如果你知道 Bucket 的名称，可以使用 `-b` 指定 Bucket

```bash
cf alibaba oss ls -b bucket_name
```

这时可能会碰到没有获取 Bucket 区域的情况，加上 `-r` 参数指定区域即可，例如指定 cn-hangzhou

```bash
cf alibaba oss ls -b bucket_name -r cn-hangzhou
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年10月12日"
    }
  }
</script>
