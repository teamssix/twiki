---
title: 获取 Windows 实例权限
---
<center><h1>获取无法直接执行命令的 Windows 实例权限</h1></center>

---

## 前言

在平时进行云上攻防的时候，偶尔会碰到虽然有 ECS 实例管理权限但无法在实例上执行命令的情况。

一般可能是因为实例没有安装云助手或者云厂商本身就不支持直接下发执行命令等原因，在遇到这种情况时，对于 Windows 实例我们依然有办法获取到实例的权限。

思路也很简单，就是通过为目标实例打快照 —> 创建磁盘 —> 创建实例 —> 挂载磁盘 —> 利用 SAM 等文件获取密码或哈希 —> 使用密码或哈希远程登录获取权限。

下面将以华为云为例，来演示下这个步骤。

## 演示

先看下当前场景，我们在接管控制台后，账号下有一台 Windows 实例，现在我们需要获取它的权限。

<img width="1000" src="/img/1683955264.png">

根据刚才的思路，为这台实例的系统盘创建一个快照

<img width="1000" src="/img/1683955272.png">

通过这个快照创建磁盘

<img width="1000" src="/img/1683955279.png">

接着创建一个实例，在创建实例的时候，要注意可用区的选择，需要选择和磁盘在一个可用区，否则会无法挂载。

<img width="1000" src="/img/1683955286.png">

将刚创建的磁盘挂载到刚创建的实例中

<img width="1000" src="/img/1683955292.png">

远程连接刚创建的实例，可以看到磁盘已经挂载上了，如果没有看到则可以在磁盘管理里找找

<img width="1000" src="/img/1683955299.png">

这时我们就可以通过 SAM、SYSTEM、SECURITY 文件获取哈希了，如果是域控可以通过 NTDS.dit 文件获取整个域的哈希。

这里以使用 impacket-examples-windows 获取哈希为例。

```bash
.\secretsdump.exe -sam SAM -security SECURITY -system SYSTEM LOCAL
```

<img width="1000" src="/img/1683955311.png">

可以看到获取到了 3 个用户的 Hash、2 个明文密码，经过尝试，第 2 个明文密码就是 cloudbase-init 用户的密码，因此这里就可以利用这个密码直接远程登录目标实例了。

<img width="1000" src="/img/1683955318.png">

登陆目标实例后，发现权限是管理员权限，至此，就已经获取到目标实例的权限了，上述我们自己创建的快照、磁盘、实例此时就可以删掉了。

## 结语

可以看到，整个的步骤还是有些繁琐的，对于上面的步骤可以结合 Terraform 等工具实现自动化，如果读者感兴趣，可以自己尝试尝试。

对于 AWS，老外也有相应的利用工具，比如 CloudCopy，直接通过脚本获取快照中的 NTLM 哈希，原理都是差不多的，我之前也写过这个工具的利用文章，详见：[wiki.teamssix.com/CloudService/EC2/ec2-shared-snapshot.html](https://wiki.teamssix.com/CloudService/EC2/ec2-shared-snapshot.html)

不同的云可能在一些地方不太一样，但思路都是差不多的，在实战中，还是要多琢磨琢磨。

看到这里，也许有的人可能会有疑惑，那如果是 Linux 怎么办呢？Linux 的话，感觉能做的不多，可能就是翻翻文件、解密 Shadow 之类的了。

最后，如果对上面的内容有什么想法或疑问，欢迎在评论区交流。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 5 月 13 日"
    }
  }
</script>