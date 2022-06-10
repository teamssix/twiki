---
title: 云服务
---
<center><h1>云服务</h1></center>

---

云服务，顾名思义就是云上的服务，简单的来说就是在云厂商（例如 AWS、阿里云）那里买的服务。

目前国内云厂商有阿里云、腾讯云、华为云、天翼云、Ucloud、金山云等等，国外有亚马逊的 AWS、Google 的 GCP、微软的 Azure 等等。

</br>
   <img width="700" src="/img/1649992663.png">
</br></br>

各个云厂商对云服务的叫法都不统一，这里统一以 AWS 为例。

S3 对象存储`Simple Storage Service`，简单的说就是一个类似网盘的东西，当然跟网盘是有一定区别的。

EC2 即弹性计算服务`Elastic Compute Cloud`，简单的说就是在云上的一台虚拟机。

RDS 云数据库`Relational Database Service`，简单的说就是云上的一个数据库。

IAM 身份和访问管理`Identity and Access Management`，简单的说就是云控制台上的一套身份管理服务，可以用来管理每个子账号的权限。

</br>

因为这些原本都放在本地的东西上了云，相应的就会产生对应的安全风险，因为便有了研究的意义。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>