---
title: EC2 所面临的风险
---
<center><h1>EC2 所面临的风险</h1></center>

---

## 1、凭证泄露

云场景下的凭证泄露可以分成以下几种：

- 控制台账号密码泄露，例如登录控制台的账号密码
- 临时凭证泄露
- 访问密钥泄露，即 AccessKeyId、SecretAccessKey 泄露
- 实例登录凭证泄露，例如 AWS 在创建 EC2 生成的证书文件遭到泄露

对于这类凭证信息的收集，一般可以通过以下几种方法进行收集：

- Github 敏感信息搜索
- 反编译目标 APK、小程序
- 目标网站源代码泄露

## 2、元数据

元数据服务是一种提供查询运行中的实例内元数据的服务，当实例向元数据服务发起请求时，该请求不会通过网络传输，如果获得了目标 EC2 权限或者目标 EC2 存在 SSRF 漏洞，就可以获得到实例的元数据。

在云场景下可以通过元数据进行临时凭证和其他信息的收集，在 AWS 下的元数据地址为：`http://169.254.169.254/latest/meta-data` 或者 `http://instance-data/latest/meta-data`，直接 curl 请求该地址即可。

通过元数据，攻击者除了可以获得 EC2 上的一些属性信息之外，有时还可以获得与该实例绑定角色的临时凭证，并通过该临时凭证获得云服务器的控制台权限，进而横向到其他机器。

通过访问元数据的 `/iam/security-credentials/<rolename>` 路径可以获得目标的临时凭证，进而接管目标服务器控制台账号权限，前提是目标需要配置 IAM 角色才行，不然访问会 404

```shell
curl http://169.254.169.254/latest/meta-data/iam/security-credentials
```

<img width="900" src="/img/1649996601.png">

通过元数据获得目标的临时凭证后，就可以接管目标账号权限了，这里介绍一些对于 RT 而言价值相对较高的元数据：

```
mac    实例 MAC 地址
hostname    实例主机名
iam/info    获取角色名称
local-ipv4    实例本地 IP
public-ipv4    实例公网 IP
instance-id    实例 ID
public-hostname    接口的公有 DNS (IPv4)
placement/region    实例的 AWS 区域
public-keys/0/openssh-key    公有密钥
/iam/security-credentials/<rolename>    获取角色的临时凭证
```

## 3、账号劫持

如果云厂商的控制台存在漏洞的话，用户账号也会存在一定的风险。

例如 AWS 的控制台曾经出现过一些 XSS 漏洞，攻击者就可能会使用这些 XSS 漏洞进行账号劫持，从而获得目标云服务器实例的权限。

## 4、恶意的镜像

AWS 在创建实例的时候，用户可以选择使用公共镜像或者自定义镜像，如果这些镜像中有恶意的镜像，那么目标使用该镜像创建实例就会产生风险。

以 CVE-2018-15869 为例，关于该漏洞的解释是：当人们通过 AWS 命令行使用「ec2 describe-images」功能时如果没有指定 --owners 参数，可能会在无意中加载恶意的 Amazon 系统镜像 ( AMI），导致 EC2 被用来挖矿。

对此，在使用 AWS 命令行时应该确保自己使用的是不是最新版的 AWS 命令行，同时确保从可信的来源去获取 Amazon 系统镜像。

## 5、其他的初始访问方法

除了以上云场景下的方法外，还可以通过云服务上的应用程序漏洞、SSH 与 RDP 的弱密码等传统场景下的方法进入目标实例。

> 参考资料：
>
> https://cloud.tencent.com/developer/article/1931560
>
> https://summitroute.com/blog/2018/09/24/investigating_malicious_amis/
>
> https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/instancedata-data-categories.html

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 8 月 25 日"
    }
  }
</script>