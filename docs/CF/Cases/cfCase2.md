---
title: 记录一次平平无奇的云上攻防过程
---
<center><h1>记录一次平平无奇的云上攻防过程</h1></center>

---

## 0x00 前言

之前有次在做攻防演练的时候，通过反编译小程序找到了目标云服务的 Access Key，最终通过这个 AK 拿下了目标上千万条敏感信息以及几十台云服务主机的 root 权限，整个过程平平无奇，这里简单记录下。

**阅前须知：**

- 文中数据的值都是虚构的内容，非真实场景里的数据。
- 文中使用的 CF 工具版本为 v0.4.0，如果读者有在使用 CF，为避免版本不同导致命令不一致的情况，请以 CF 使用手册里的命令为准，CF 使用手册地址：[wiki.teamssix.com/cf](https://wiki.teamssix.com/cf)

## 0x01 发现访问凭证并利用

首先找到目标的微信小程序，反编译小程序找到了硬编码在源码里的 Access Key，将 Access Key 配置到 CF 云环境利用框架里，CF 项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

```bash
cf config
```

<img width="800" src="/img/1663079548.png">

尝试列出一下当前访问凭证的资源，因为输出内容较多，这里仅展示了一部分，再次提醒一下，本文图片中数据的值都是虚构内容，非真实场景里的数据。

```bash
cf alibaba ls
```

<img width="1000" src="/img/1663079661.png">

最终通过 CF 列出这个 AK 里有 2 个存储桶以及 30 多台云服务主机，不过里面有一台是关机的。

## 0x02 存储桶的利用

先来看这两个存储桶，在第一个存储桶 teamssix-api-example 里有 500 多 M 的数据，在存储桶体积比较少的情况下，可以直接使用 `cf alibaba oss obj get`命令下载存储桶里的所有对象，但这里存储桶体积比较大，还是用 OSS Browser 大概预览下吧。

用 OSS Browser 打开第一个存储桶，翻了一遍，没有发现太多敏感的信息，然后继续打开第二个存储桶，发现在第二个存储桶里存储了大量的身份证信息。

<img width="800" src="/img/1663081994.png">

在 OSS Browser 里没办法看到这些文件的总数，好在 CF 的输出结果里可以看到存储桶的文件总数。

从 CF 的输出结果来看这个存储桶总共有 345 w 条数据，从 OSS Browser 列出的结果来看，估计这三百多万条的数据应该都是身份证照片之类的信息了。

## 0x03 ECS 的利用

刚才通过 CF 发现了 30 多台云服务主机，这里先看看 CF 能对云主机执行哪些操作。

```bash
cf alibaba ecs exec -h
```

<img width="800" src="/img/1663083448.png">

在写报告的时候需要有服务器权限证明的截图，这里可以直接使用 CF 一键执行三要素，方便写报告。

```bash
cf alibaba ecs exec -b
```

<img width="800" src="/img/1663083450.png">

<img width="800" src="/img/1663083688.png">

接下来打算翻翻实例，看看能不能发现什么有用的信息，后来在一个实例的命令历史记录里发现了 MySQL 数据库的明文密码。

```bash
cf alibaba ecs exec -i i-abcdefghijklmn33 -c "cat ~/.bash_history | grep mysql"
```

<img width="900" src="/img/1663084848.png">

连接到数据库后，开始翻数据库，翻着翻着，在一张表里发现好东西，这张表存储了目标一千多万条敏感数据。

再后来，在其他的实例中还发现了一些容器，包括 ES 、Redis 数据库的容器，不过里面数据量没有太多。

## 0x04 总结建议

到这里，通过这个 AK 已经拿到了目标一千多万条数据库敏感信息、三百多万条身份证照片信息以及三十多台服务器 root 权限。

报告交上去后，给的分数也很可观，不过这里因为不通靶标，所以只能搞点数据分和权限分了。

总的来说，整个过程没有太大的波澜，这里主要是利用了两处目标的风险点：

1. 云服务的 Access Key 直接硬编码到了小程序里
1. Access Key 权限没有做好控制

解决起来也很简单：

1. 小程序里不要硬编码 Access Key，建议可以用临时密钥啥的
1. 这里的 Access Key 应该是只需要 OSS 的权限，ECS 的权限就不应该再赋予给这个 AK 了

最后，如果师傅感觉 CF 这个工具还不错，记得给个 Star 呀 ~ ，CF 项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年9月14日"
    }
  }
</script>
