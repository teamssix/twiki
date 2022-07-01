---
title: CF 云环境利用框架
---
<center><h1>CF 云环境利用框架</h1></center>

---

<p align="center">
<img width="500" src="/img/cf.png"><br>
<a href="https://github.com/teamssix/cf/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/teamssix/cf" /></a>
<a href="https://github.com/teamssix/cf/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/teamssix/cf" /></a>
<a href="https://github.com/teamssix/cf/releases"><img alt="GitHub issues" src="https://img.shields.io/github/release/teamssix/cf" /></a>
<a href="https://twitter.com/intent/tweet/?text=CF%2C%20an%20amazing%20cloud%20exploitation%20framework%0Ahttps%3A%2F%2Fgithub.com%2Fteamssix%2Fcf%0A%23cloud%20%23security%20%23cloudsecurity%20%23cybersecurtiy"><img alt="tweet" src="https://img.shields.io/twitter/url?url=https://github.com/teamssix/cf" /></a>
<a href="https://twitter.com/teamssix"><img alt="Twitter" src="https://img.shields.io/twitter/url/https/twitter.com/teamssix.svg?style=social&label=Follow%20the%20author" /></a>
<a href="https://github.com/teamssix"><img alt="Github" src="https://img.shields.io/github/followers/TeamsSix?style=social" /></a>
</p>

---

CF 是一个云环境利用框架，主要用来方便红队人员在获得云服务的访问凭证即 Access Key 的后续工作，CF 项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases)

> 目前 CF 仅支持阿里云，后续会不断更新对其他云的支持。

目前 CF 可以实现以下功能：

* 已实现
  * 列出对象存储（包括存储桶大小和文件数量信息）
  * 列出实例
  * 一键获得实例上的临时访问凭证
  * 一键为所有实例执行三要素，方便 HVV
  * 一键为实例反弹 Shell
  * 支持阿里云
  * ……

* 预计短期内实现
  * 列出云数据库
  * 云上痕迹清除
  * 一键接管控制台
  * 一键查看当前访问凭证所拥有的权限
  * ……

* 预计长期内实现
  * 自动检测当前运行环境是不是实例，如果是则一键扫描本地实例的凭证信息
  * 一键将获取到的临时凭证添加到工具中
  * 支持腾讯云等其他云厂商
  * ……


## 简单上手

   <img width="1000" src="/img/1656583858.png">

配置 CF

```bash
cf configure
```

   <img width="1000" src="/img/1656583779.png">

一键列出当前访问凭证的云服务资源，当前仅支持 OSS 和 ECS 资源。

```bash
cf ls
```

   <img width="1000" src="/img/1656584422.png">

查看 CF 为实例执行命令的操作的帮助信息

```bash
cf ecs exec -h
```

   <img width="1000" src="/img/1656584478.png">

一键为所有实例执行三要素，方便 HVV

```
cf ecs exec -b
```

   <img width="550" src="/img/1656584649.png">

一键获取实例中的临时访问凭证数据

```bash
cf ecs exec -m
```

   <img width="1000" src="/img/1656584778.png">

如果感觉还不错的话，师傅记得给个 Star 呀 ~

## 注意事项

* 本工具仅用于合法合规用途，严禁用于违法违规用途。
* 本工具中所涉及的风险点均属于租户责任，与云厂商无关。

## 云安全交流群

在[关于文库](/About/#云安全交流群)中，有`云安全交流群`的添加方式，在这里可以一起交流 CF 的使用和问题的反馈。

<div align=center><img src="https://api.star-history.com/svg?repos=teamssix/cf&type=Timeline" div align=center/></div>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>