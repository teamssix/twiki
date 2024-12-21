---
title: CF 云环境利用框架使用手册
---
<center><h1>CF 云环境利用框架使用手册</h1></center>

---

<p align="center">
<img width="500" src="/img/cf.png"><br><br>
<a href="https://github.com/teamssix/cf/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"/></a>
<a href="https://goreportcard.com/report/github.com/teamssix/cf"><img alt="Go Report Card" src="https://goreportcard.com/badge/github.com/teamssix/cf"/></a>
<a href="https://twitter.com/teamssix"><img alt="Twitter" src="https://img.shields.io/twitter/follow/teamssix?label=Followers&style=social" /></a>
<a href="https://github.com/teamssix"></a><br></br>
</p>

::: tip 通知

CF 于 2023 年 8 月 9 日转为私有仓库并在狼组安全团队内部维护，后续官方不再提供任何开源版本，CF 开源的版本号停止于 0.5.0 版本，关于各类非官方的 CF 衍生版本请大家在使用时留意是否安全。

**目前「云鉴」已经发布，对公有云利用工具有需求的师傅可以使用云鉴，云鉴项目地址：[github.com/wgpsec/cloudsword](https://github.com/wgpsec/cloudsword)**

:::

---

CF 是一个云环境利用框架，适用于在红队场景中对云上内网进行横向、SRC 场景中对 Access Key 即访问凭证的影响程度进行判定、企业场景中对自己的云上资产进行自检等等。

<details> <summary>CF 命令使用大全</summary><br>
<img width="1000" src="/img/1688145889.png"><br>
</details><br>

当前已支持的云：

* 阿里云
* 腾讯云
* AWS
* 华为云

## 安装
### HomeBrew 安装

```bash
brew tap teamssix/tap
brew install teamssix/tap/cf
```

### 下载二进制包

直接在 CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases) 中下载系统对应的压缩文件，解压后在命令行中运行即可。

<details> <summary>目前支持的系统</summary><br>

|            文件名            |  系统   |                架构                | 位数 |
| :--------------------------: | :-----: | :--------------------------------: | :--: |
| cf_x.x.x_darwin_amd64.tar.gz |  MacOS  |   AMD（适用于 Intel 芯片的 Mac）   |  64  |
| cf_x.x.x_darwin_arm64.tar.gz |  MacOS  | ARM（适用于苹果 M 系列芯片的 Mac） |  64  |
|  cf_x.x.x_linux_386.tar.gz   |  Linux  |                AMD                 |  32  |
| cf_x.x.x_linux_amd64.tar.gz  |  Linux  |                AMD                 |  64  |
| cf_x.x.x_linux_arm64.tar.gz  |  Linux  |                ARM                 |  64  |
|   cf_x.x.x_windows_386.zip   | Windows |                AMD                 |  32  |
|  cf_x.x.x_windows_amd64.zip  | Windows |                AMD                 |  64  |
|  cf_x.x.x_windows_arm64.zip  | Windows |                ARM                 |  64  |

</details>

## 使用案例

|                标题                | 所使用的 CF 版本 |                           文章地址                           |   作者   |  发布时间  |
| :--------------------------------: | :--------------: | :----------------------------------------------------------: | :------: | :--------: |
|    《CF 云环境利用框架最佳实践》    |      v0.4.5      | [wiki.teamssix.com/cf/cases/cf_best_practices](https://wiki.teamssix.com/cf/cases/cf_best_practices.html) | TeamsSix | 2023.6.4 |
|    《记一次打穿云上内网的攻防实战》    |      v0.4.5      | [zone.huoxian.cn/d/2766](https://zone.huoxian.cn/d/2766) | Walker 沃克 | 2023.5.21 |
|    《一次简单的"云"上野战记录》    |      v0.4.2      | [mp.weixin.qq.com/s/wi8CoNwdpfJa6eMP4t1PCQ](https://mp.weixin.qq.com/s/wi8CoNwdpfJa6eMP4t1PCQ) | carrypan | 2022.10.19 |
| 《记录一次平平无奇的云上攻防过程》 |      v0.4.0      | [zone.huoxian.cn/d/2557](https://zone.huoxian.cn/d/2557) | TeamsSix | 2022.9.14  |
|   《我用 CF 打穿了他的云上内网》   |      v0.2.4      | [zone.huoxian.cn/d/1341-cf](https://zone.huoxian.cn/d/1341-cf) | TeamsSix | 2022.7.13  |

## CF 使用答疑

在 CF 项目的 [Discussions](https://github.com/teamssix/cf/discussions) 板块里，我创建了一个答疑帖，如果你遇到和 CF 相关的使用问题，可以在这里提出，我会给出相应的解答，同时这里也汇总了之前一些人问过的一些问题。

CF 答疑帖地址：[github.com/teamssix/cf/discussions/250](https://github.com/teamssix/cf/discussions/250)

## 简单上手

<img width="900" src="/img/1665545933.png">

> 这里以阿里云为例，其他更多操作可以查看上面的使用手册。

配置访问配置

```bash
cf config
```

<img width="900" src="/img/1662541672.png">

一键列出当前访问凭证的权限

```bash
cf alibaba perm
```

<img width="750" src="/img/1662541990.png">

一键接管控制台

```bash
cf alibaba console
```

<img width="850" src="/img/1662542001.png">

一键列出当前访问凭证的云服务资源

```bash
cf alibaba ls
```

<img width="1000" src="/img/1662542020.png">

查看 CF 为实例执行命令的操作的帮助信息

```bash
cf alibaba ecs exec -h
```

<img width="1000" src="/img/1665546062.png">

一键为所有实例执行三要素，方便 HVV

```bash
cf alibaba ecs exec -b
```

<img width="800" src="/img/1662542141.png">

一键获取实例中的临时访问凭证数据

```bash
cf alibaba ecs exec -m
```

<img width="1000" src="/img/1662542336.png">

一键下载 OSS 对象存储数据

```bash
cf alibaba oss obj get
```

<img width="900" src="/img/1662542708.png">

一键创建 RDS 账号

```bash
cf alibaba rds account
```

<img width="900" src="/img/1688142590.png">

一键升级 CF 版本

```bash
cf upgrade
```

<img width="900" src="/img/1662542858.png">


如果感觉还不错的话，师傅记得给个 Star 呀 ~

## 贡献者

十分感谢各位师傅对 CF 的贡献~，如果你也想对 CF 贡献代码，请参见贡献说明：[CONTRIBUTING](https://github.com/teamssix/cf/blob/main/CONTRIBUTING.md)

<div align=center>
    <table>
        <tr>
            <td align="center">
                <a href="https://github.com/teamssix"><img alt="TeamsSix" src="/img/1662546884.jpeg" style="width: 100px;" /><br />TeamsSix</a>
            </td>
            <td align="center">
                <a href="https://github.com/Amzza0x00"><img alt="Amzza0x00" src="/img/1662546910.jpeg" style="width: 100px;" /><br />Amzza0x00</a>
            </td>
            <td align="center">
                <a href="https://github.com/Esonhugh"><img alt="Esonhugh" src="/img/1662546943.jpeg" style="width: 100px;" /><br />Esonhugh</a>
            </td>
            <td align="center">
                <a href="https://github.com/Dawnnnnnn"><img alt="Dawnnnnnn" src="/img/1662546995.jpeg" style="width: 100px;" /><br />Dawnnnnnn</a>
            </td>
            <td align="center">
                <a href="https://github.com/Belos-pretender"><img alt="Belos-pretender" src="/img/1688146213.jpeg" style="width: 100px;" /><br />Belos-pretender</a>
            </td>
            <td align="center">
                <a href="https://github.com/0xorOne"><img alt="Kfzz1" src="/img/1688146266.jpeg" style="width: 100px;" /><br />Kfzz1</a>
            </td>
        </tr>
        <tr>
            <td align="center">
                <a href="https://github.com/shadowabi"><img alt="shadowabi" src="/img/1688146300.jpeg" style="width: 100px;" /><br />shadowabi</a>
            </td>
            <td align="center">
                <a href="https://github.com/ruishawn"><img alt="ruishawn" src="/img/1692351882.jpeg" style="width: 100px;" /><br />ruishawn</a>
            </td>
        </tr>
    </table>
</div>

## 404星链计划

<img width="400" src="/img/startlink_logo.png">

CF 现已加入 [404星链计划](https://github.com/knownsec/404StarLink)

## 注意事项

* 本工具仅用于合法合规用途，严禁用于违法违规用途。
* 本工具中所涉及的风险点均属于租户责任，与云厂商无关。

<div align=center><img width="400" src="/img/1692624423.jpeg"></div><br>

<div align=center><b>感谢你使用我的工具</b></div>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023年4月29日"
    }
  }
</script>
