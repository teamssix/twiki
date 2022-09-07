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

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>

