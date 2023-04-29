---
title: 列出当前凭证权限
---

## 一键列出阿里云的凭证权限

使用以下命令列出当前凭证权限以及可以执行的操作

```bash
cf alibaba perm
```

## 一键列出腾讯云的凭证权限

```bash
cf tencent perm
```

## 一键列出华为云的凭证权限

```bash
cf huawei perm
```

::: warning 注意

CF 列出权限的逻辑有两种方式：

1. CF 会先判断当前 AK 是否具有身份访问控制的权限，如果有则直接通过 API 接口获取当前 AK 的权限，这种方式是最准确的。
2. 如果当前 AK 不具备身份访问控制的权限，那么就通过遍历 API 接口的方式判断是否有其权限，目前 CF 只会遍历常见的几种资源权限，因此如果 CF 提示没有发现任何权限的时候并不意味着这个 AK 真的什么权限都没有。

:::

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月7日"
    }
  }
</script>