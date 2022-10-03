---
title: CF 云环境利用框架使用手册
---
<center><h1>CF 云环境利用框架使用手册</h1></center>

---

<p align="center">
<img width="500" src="/img/cf.png"><br><br>
<a href="https://github.com/teamssix/cf/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/teamssix/cf"/></a>
<a href="https://github.com/teamssix/cf/releases"><img alt="GitHub releases" src="https://img.shields.io/github/release/teamssix/cf"/></a>
<a href="https://github.com/teamssix/cf/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"/></a>
<a href="https://github.com/teamssix/cf/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/teamssix/cf/total?color=brightgreen"/></a>
<a href="https://goreportcard.com/report/github.com/teamssix/cf"><img alt="Go Report Card" src="https://goreportcard.com/badge/github.com/teamssix/cf"/></a>
<a href="https://twitter.com/intent/tweet/?text=CF%2C%20an%20amazing%20cloud%20exploitation%20framework%0Ahttps%3A%2F%2Fgithub.com%2Fteamssix%2Fcf%0A%23cloud%20%23security%20%23cloudsecurity%20%23cybersecurtiy"><img alt="tweet" src="https://img.shields.io/twitter/url?url=https://github.com/teamssix/cf" /></a>
<a href="https://twitter.com/teamssix"><img alt="Twitter" src="https://img.shields.io/twitter/follow/teamssix?label=Followers&style=social" /></a>
<a href="https://github.com/teamssix"><img alt="Github" src="https://img.shields.io/github/followers/TeamsSix?style=social" /></a><br></br>
</p>



---

CF 是一个云环境利用框架，适用于在红队场景中对云上内网进行横向、SRC 场景中对 Access Key 即访问凭证的影响程度进行判定、企业场景中对自己的云上资产进行自检等等。

CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases)

<img width="1000" src="/img/1663940597.png"><br>

当前已支持的云：

* 阿里云
* 腾讯云
* AWS（预计在 2022 年 10 月 14 日前支持）
* 华为云（预计在 2022 年 12 月 14 日前支持）

功能排期可参考：[github.com/teamssix/cf/discussions/130](https://github.com/teamssix/cf/discussions/130)

## 安装

直接在 CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases) 中下载系统对应的压缩文件，解压后在命令行中运行即可，目前支持以下系统：

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

### MacOS && Linux

> 注意将下面命令中的地址和文件名替换成 [releases](https://github.com/teamssix/cf/releases) 里的值。

```bash
wget https://github.com/teamssix/cf/releases/download/xxx/cf_xxx_xxx_xxx.tar.gz
tar zxvf cf_xxx_xxx_xxx.tar.gz
chmod +x cf
./cf
```

### Windows

直接在 CF 下载地址：[github.com/teamssix/cf/releases](https://github.com/teamssix/cf/releases) 中下载系统对应的 ZIP 文件，解压后，在命令行中运行即可。

## 使用案例

|                标题                | 所使用的 CF 版本 |             文章地址              | 发布时间  |
| :--------------------------------: | :--------------: | :-------------------------------: | :-------: |
| 《记录一次平平无奇的云上攻防过程》 |      v0.4.0      |  [https://zone.huoxian.cn/d/2557](https://zone.huoxian.cn/d/2557)   | 2022.9.14 |
|   《我用 CF 打穿了他的云上内网》   |      v0.2.4      | [https://zone.huoxian.cn/d/1341-cf](https://zone.huoxian.cn/d/1341-cf) | 2022.7.13 |

## 简单上手

<img width="900" src="/img/1662366701.png">

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

<img width="1000" src="/img/1662542058.png">

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

一键升级 CF 版本

```bash
cf upgrade
```

<img width="900" src="/img/1662542858.png">


如果感觉还不错的话，师傅记得给个 Star 呀 ~

## 贡献者

十分感谢各位师傅对 CF 的贡献~，如果你也想对 CF 贡献代码，请参见贡献说明：[CONTRIBUTING](https://github.com/teamssix/cf/blob/main/CONTRIBUTING.md)

<table>
    <tr>
        <td align="center"><a href="https://github.com/teamssix"><img alt="TeamsSix"
                    src="/img/1662546884.jpeg" style="width: 100px;"/><br />TeamsSix</a></td>
        <td align="center"><a href="https://github.com/Amzza0x00"><img alt="Amzza0x00"
                    src="/img/1662546910.jpeg"  style="width: 100px;" /><br />Amzza0x00</a></td>
        <td align="center"><a href="https://github.com/Esonhugh"><img alt="Esonhugh"
                    src="/img/1662546943.jpeg"  style="width: 100px;" /><br />Esonhugh</a></td>
        <td align="center"><a href="https://github.com/Dawnnnnnn"><img alt="Dawnnnnnn"
                    src="/img/1662546995.jpeg"  style="width: 100px;" /><br />Dawnnnnnn</a></td>
        <td align="center"><a href="https://github.com/Belos-pretender"><img alt="Belos-pretender"
                    src="/img/1662547016.jpeg"  style="width: 100px;" /><br />Belos-pretender</a></td>
		</tr>
</table>

<a href="https://github.com/teamssix"><img src="https://repobeats.axiom.co/api/embed/30b8de6c059cbe83fe0ba44fff91136270a39ab9.svg"></a>

## 404星链计划

<img width="400" src="/img/startlink_logo.png">

CF 现已加入 [404星链计划](https://github.com/knownsec/404StarLink)

## 云安全交流群

在[关于文库](/About/#云安全交流群)中，有`云安全交流群`的添加方式，在这里可以一起交流 CF 的使用和问题的反馈。

<div align=center><img src="https://api.star-history.com/svg?repos=teamssix/cf&type=Timeline" div align=center/></div>


## 注意事项

* 本工具仅用于合法合规用途，严禁用于违法违规用途。
* 本工具中所涉及的风险点均属于租户责任，与云厂商无关。

<div align=center><b>感谢你使用我的工具</b></div>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年10月3日"
    }
  }
</script>
