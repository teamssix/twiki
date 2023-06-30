---
title: 一键接管控制台
---

## 在阿里云上一键接管控制台

使用以下命令接管控制台

```bash
cf alibaba console
```

接管控制台的时候默认会创建一个名称为 crossfire 的用户，如果想改成其他用户名可以使用 `-u` 参数


```bash
cf alibaba console -u teamssix
```

> 接管控制台需要当前访问凭证至少拥有 `AliyunRAMFullAccess` 权限。

打开浏览器，访问控制台登录地址，输入用户名

<img width="900" src="/img/1657286463.png">

输入密码，点击登录

<img width="900" src="/img/1657286535.png">

此时就可以看到我们接管下来的控制台了

<img width="900" src="/img/1657286643.png">

查看当前 crossfire 用户所拥有的权限，可以看到是 `AdministratorAccess` 即管理所有阿里云资源的权限

<img width="900" src="/img/1657286780.png">

由于接管控制台的原理是创建一个具有管理员权限的子用户，因此当不想接管、想删除这个子用户的时候，可以使用取消接管控制台的命令。

### 取消接管控制台

```bash
cf alibaba console cancel
```

### 查看接管控制台的信息

```bash
cf alibaba console ls
```

### 接管控制台时创建 AK

在接管阿里云平台时，如果加上 -a 参数，CF 除了会自动创建用于登录控制台的子账号外，还会自动创建这个子账号的访问凭证。

```bash
cf alibaba console -a
```

## 在腾讯云上一键接管控制台

```bash
cf tencent console
```

接管控制台的时候默认会创建一个名称为 crossfire 的用户，如果想改成其他用户名可以使用 `-u` 参数

```bash
cf tencent console -u teamssix
```

### 取消接管控制台

```bash
cf tencent console cancel
```

### 查看接管控制台的信息

```bash
cf tencent console ls
```

## 在华为云上一键接管控制台

```bash
cf huawei console
```

接管控制台的时候默认会创建一个名称为 crossfire 的用户，如果想改成其他用户名可以使用 `-u` 参数

```bash
cf huawei console -u teamssix
```

### 取消接管控制台

```bash
cf huawei console cancel
```

### 查看接管控制台的信息

```bash
cf huawei console ls
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>