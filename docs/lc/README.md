---
title: LC 多云攻击面资产梳理工具
---
<div align=center><img width="600" src="/img/2000000031.png"></div>
<center><h1>LC（List Cloud）多云攻击面资产梳理工具</h1></center>

---
<p align="center">
<a href="https://github.com/wgpsec/lc/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-_red.svg"></a>
<a href="https://goreportcard.com/report/github.com/wgpsec/lc"><img src="https://goreportcard.com/badge/github.com/wgpsec/lc"></a>
<a href="https://github.com/wgpsec/lc/releases"><img src="https://img.shields.io/github/release/wgpsec/lc"></a>
<a href="https://github.com/wgpsec/lc"><img src="https://img.shields.io/github/stars/wgpsec/lc"></a>
<a href="https://twitter.com/teamssix"><img src="https://img.shields.io/twitter/follow/teamssix.svg?logo=twitter"></a>
<a href="https://twitter.com/wgpsec"><img src="https://img.shields.io/twitter/follow/wgpsec.svg?logo=twitter"></a>
</p>

<p align="center">
  <a href="#功能"><b>功能</b></a> •
  <a href="https://wiki.teamssix.com/lc/install"><b>安装</b></a> •
  <a href="https://wiki.teamssix.com/lc/install/config.html"><b>配置</b></a> •
  <a href="https://wiki.teamssix.com/lc/usage"><b>使用</b></a> •
  <a href="#支持列出的云服务"><b>支持的云服务商</b></a>
</p>

LC（List Cloud）是一个多云攻击面资产梳理的工具，使用 LC 可以让甲方蓝队在管理多云时快速梳理出可能暴露在公网上的资产。

项目地址：[github.com/wgpsec/lc](https://github.com/wgpsec/lc)

## 功能

 - 列出多个配置的云资产
 - 支持多个云服务商
 - 支持多个云服务
 - 支持过滤内网 IP
 - 高度可扩展性，可方便添加更多云服务商和云服务
 - 可以使用管道符和其他工具结合使用

运行截图：

<div align=center><img width="1000" src="/img/2000000029.png"></div></br>


### 支持列出的云服务

| 序号 | 云服务商 |    服务名称     |
|:--:|:----:|:-----------:|
| 1  | 阿里云  |  ECS 云服务器   |
| 2  | 阿里云  |  OSS 对象存储   |
| 3  | 阿里云  |   RDS 数据库   |
| 4  | 阿里云  |   FC 函数计算   |
| 5  | 阿里云  | Domain 域名服务 |
| 6  | 腾讯云  |  CVM 云服务器   |
| 7  | 腾讯云  | LH 轻量应用服务器  |
| 8  | 腾讯云  |  COS 对象存储   |
| 9  | 华为云  |  OBS 对象存储   |
| 10 | 天翼云  |  OOS 对象存储   |
| 11 | 百度云  |  BOS 对象存储   |
| 12 | 百度云  |  BCC 云服务器   |
| 13 | 联通云  |  OSS 对象存储   |
| 14 | 七牛云  |  Kodo 对象存储  |
| 15 | 移动云  |  EOS 对象存储   |

## 使用手册

详细使用手册请参见：[LC 使用手册](https://wiki.teamssix.com/lc)

## 安装

### 方法一：使用 brew 安装

安装

```bash
brew tap wgpsec/tap
brew install wgpsec/tap/lc
```

更新

```bash
brew update
brew upgrade lc
```

### 方法二：下载二进制文件

直接在 LC 下载地址：[github.com/wgpsec/lc/releases](https://github.com/wgpsec/lc/releases) 中下载系统对应的压缩文件，解压后在命令行中运行即可。

## 用法

```sh
lc -h
```

使用 `-h` 参数查看 lc 的帮助信息，这是目前 lc 所支持的用法。

```yaml
lc (list cloud) 是一个多云攻击面资产梳理工具

Usage:
  lc [flags]

Flags:
配置:
  -c, -config string  指定配置文件路径 (default "$HOME/.config/lc/config.yaml")
  -t, -threads int    指定扫描的线程数量 (default 3)

过滤:
  -cs, -cloud-services string[]  指定要列出的服务 (default ["all"])
  -i, -id string[]        指定要使用的配置（以逗号分隔）
  -p, -provider string[]  指定要使用的云服务商（以逗号分隔）
  -ep, -exclude-private   从输出的结果中排除私有 IP

输出:
  -o, -output string  将结果输出到指定的文件中
  -s, -silent         只输出结果
  -v, -version        输出工具的版本
  -debug              输出调试日志信息
```

## 简单上手

在第一次使用时，LC 会在 `$HOME/.config/lc` 目录下创建一个 `config.yaml`，因此在第一次执行 `lc` 命令后，将您的云访问凭证填写到 `$HOME/.config/lc/config.yaml` 文件中后，就可以开始正式使用 LC 了。

直接运行 `lc` 命令来列举您的云上资产。

```sh
lc
```

如果没有列举出结果，那么可能是因为本身云上没有资产，或者访问凭证的权限不足，这里我们建议为访问凭证赋予全局可读权限即可。

如果要排除结果中的内网 IP，只需要加上 `-ep` 参数。

```sh
lc -ep
```

如果想把 LC 和其他工具结合使用，例如使用 httpx 检测资产是否能从公网访问，那么可以使用下面的命令。

```sh
lc -ep -s | httpx -sc -title -silent
```

<div align=center><img width="800" src="/img/2000000028.png"></div></br>

更多用法可以查看 [LC 使用手册](https://wiki.teamssix.com/lc)

## 贡献

十分欢迎各位师傅为 LC 项目贡献代码，如果您想为该项目贡献代码，请参见贡献说明：[CONTRIBUTING](https://github.com/wgpsec/lc/blob/main/CONTRIBUTING.md)

<div align=center>
    <table>
        <tr>
            <td align="center">
                <a href="https://github.com/teamssix"><img alt="TeamsSix" src="/img/49087564.jpeg" style="width: 100px;" /><br />TeamsSix</a>
            </td>
            <td align="center">
                <a href="https://github.com/ShuBo6"><img alt="ShuBo6" src="/img/41125338.png" style="width: 100px;" /><br />ShuBo6</a>
            </td>
            <td align="center">
                <a href="https://github.com/tarihub"><img alt="tari" src="/img/39155974.jpeg" style="width: 100px;" /><br />tari</a>
            </td>
        </tr>
    </table>
</div>

## 致谢

十分感谢 [projectdiscovery](https://github.com/projectdiscovery) 的 [cloudlist](https://github.com/projectdiscovery/cloudlist) 项目以及 projectdiscovery 团队的开源精神，得益于 cloudlist 的 MIT 协议，这为本项目起到了非常大的帮助。

本项目也以 MIT 协议开源，共同助力人类开源事业的进步与发展。

## 协议

LC 在 [MIT](https://github.com/wgpsec/lc/blob/main/LICENSE) 协议下授权使用。

## 更多

下面这个是我们狼组安全团队的公众号，欢迎师傅关注，有想法一起加入狼组的师傅也可以投递简历至 admin#wgpsec.org 加入我们。

> 发送邮件时，注意将 # 改为 @

<div align=center><img width="700" src="/img/2000000030.png"></div><br>

如果你对云安全比较感兴趣，可以看我的另外一个项目 [Awesome Cloud Security](https://github.com/teamssix/awesome-cloud-security)，这里收录了很多国内外的云安全资源，另外在我的[云安全文库](https://wiki.teamssix.com/)里有大量的云安全方向的笔记和文章，这应该是国内还不错的云安全学习资料。

下面这个是我的个人微信公众号，在 TeamsSix 公众号里可以与我进行联系，后续关于 LC 的动态我也会发布到我的公众号里。

<div align=center><img width="700" src="/img/2000000024.png"></div></br>

如果您感觉这个项目还不错，也欢迎扫描下面打赏码进行赞赏。

<div align=center><img width="600" src="/img/2000000023.png"></div><br>

<div align=center><b>感谢您使用我的工具</b></div>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 10 月 6 日"
    }
  }
</script>