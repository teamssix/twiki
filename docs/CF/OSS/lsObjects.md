---
title: 列出存储桶里的对象
---

## 列出存储桶里的对象

使用以下命令，可以列出存储桶中的对象

```bash
cf alibaba oss obj ls
```

如果想指定获取对象的数量，可以使用 `-n` 或者 `--number` 参数

```bash
cf alibaba oss obj ls -n 100
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月23日"
    }
  }
</script>