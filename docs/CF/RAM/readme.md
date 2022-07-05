---
title: 一键接管控制台
---

## 一键接管控制台

使用以下命令接管控制台

```bash
cf console
```

> 接管控制台需要当前访问凭证至少拥有 `AliyunRAMFullAccess` 权限。

<img width="800" src="/img/1657032090.png">

打开浏览器，访问控制台登录地址，输入用户名

<img width="1000" src="/img/1657033009.png">

输入密码，点击登录

<img width="1000" src="/img/1657033036.png">

此时就可以看到我们接管下来的控制台了

<img width="1000" src="/img/1657033179.png">

查看当前 teamssix 用户所拥有的权限，可以看到是 `AdministratorAccess` 即管理所有阿里云资源的权限

<img width="1000" src="/img/1657033332.png">

由于接管控制台的原理是创建一个具有管理员权限的子用户，因此当不想接管、想删除这个子用户的时候，可以使用取消接管控制台的命令。

取消接管控制台

```bash
cf console cancel
```

<Vssue />