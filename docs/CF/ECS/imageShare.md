---
title: 镜像共享
---

## 在阿里云上一键共享镜像

通过镜像共享功能，可以将当前实例的镜像共享给其他的阿里云账号，这样当其他的阿里云账号下使用这个共享镜像创建实例的时候，就能看到目标实例中的数据了。

使用以下命令进行创建共享镜像，`-a` 参数用来指定要共享给的阿里云账号。

```bash
cf alibaba ecs imageShare -a <account_id>
```

### 查看已共享的镜像

使用以下命令，可以列出当前已共享的镜像。

```bash
cf alibaba ecs imageShare ls
```

### 取消共享镜像

使用以下命令即可取消共享镜像。

```bash
cf alibaba ecs imageShare cancel
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>