---
title: 配置与管理凭证
---

## 配置凭证

CF 支持两种配置访问凭证的方法，一种是利用永久的访问凭证去配置，一种是利用临时的访问凭证去配置。

### 配置凭证

```bash
cf config
```

在配置凭证的时候 `Access Key ID` 和 `Access Key Secret` 参数是必填的，只有当配置临时访问凭证时，才需要填 `STS Token` 参数。

> 配置文件被会存储在 `~/.config/cf/cache.db` 中

### 删除凭证

```bash
cf config del 
```

### 查看凭证

```bash
cf config ls
```

使用 ls 命令列出配置的时候，如果配置内容过长，这时输出内容会进行部分省略展示，如果想列出凭证的全部内容，可以使用 `-a` 或者`--all`命令。

```
cf config ls -a
```

### 修改配置

```bash
cf config mf
```

### 切换配置

```bash
cf config sw
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>
