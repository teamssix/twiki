---
title: 使用云访问凭证蜜标及时发现入侵行为
---
<center><h1>使用云访问凭证蜜标及时发现入侵行为</h1></center>
---

## 前言

云上访问凭证（Access Key）的泄露一直以来是云安全事件中最常出现也是最难解决的问题之一，目前主流云厂商都具备一定的访问凭证被恶意利用的检测能力。虽然云厂商自身具备一定的入侵行为检测能力，但依然存在检测规则被绕过、低危操作不触发告警的可能。那么作为云的使用者，在面对攻击者的入侵行为时，我们能做点什么呢？

我们都知道现在企业经常会使用蜜罐 Honeypot 来判断此时是否有人在攻击自己，有些企业还会使用蜜标 Honeytokens（也可以叫做金丝雀凭证 Canary tokens）来快速发现凭证的泄露行为。如果说蜜罐是渔网，那么蜜标就是鱼饵，蜜标通常会伪装成一个合法的凭证或者机密信息，一旦攻击者使用了蜜标，不论是高危操作还是低危操作都会触发告警，企业就可以及时知道自己的凭证或机密信息被泄露了。

使用蜜标发现入侵行为这种方法在云环境中依然适用，本文将以腾讯云为例，介绍一种通过云访问凭证蜜标发现企业云上入侵行为的方法。

## 实现效果

在介绍怎么实现之前，先来看看云访问凭证蜜标可以实现什么样的效果。

第一个场景，如果此刻你正在使用真实的访问凭证，那么可以将蜜标凭证和真实凭证放在一起，这样当蜜标凭证出现告警时，就意味着真实的访问凭证可能已经被泄露了。

第二个场景，将蜜标凭证放在服务器、工作电脑等设备中，例如放到环境变量、程序代码、配置文件等易于发现的位置，这样当蜜标凭证出现告警时，就意味着你的服务器或工作电脑可能已经被入侵了。

攻击者使用蜜标到出现告警的过程如下图所示，攻击者在调用蜜标凭证时，会被操作审计 Cloud Audit 服务记录，操作审计服务会将攻击者的操作记录传递到日志服务 CLS 中，当触发日志服务的告警策略后，日志服务就会将告警通知发送给云租户。

<div align=center><img width="1000" src="/img/2000000044.png" div align=center/></div>

现在我们已经知道了最终能够达到的效果以及从发起攻击到租户收到通知的大概流程，下面将介绍如何创建一个蜜标凭证以及部署操作审计服务和日志服务的步骤。

## 实现步骤

在访问管理 CAM 中创建一个没有任何权限的用户，并且为该用户创建访问凭证（即 API 密钥），这里建议使用一个全新的云账号操作，和自己的生产环境进行分开。

<div align=center><img width="900" src="/img/2000000045.png" div align=center/></div><br>

如果你希望让这个访问凭证看起来更可信，可以为这个访问凭证赋予一些常用服务的权限，例如 CVM、COS 的可读权限等较低权限。

接下来，在操作审计界面中，创建跟踪集，事件类型选择全部，投递位置选择日志服务。

<div align=center><img width="1000" src="/img/2000000046.png" div align=center/></div><br>

打开日志服务，在监控告警功能中创建一个集成配置，通知渠道可以设置成企业微信、钉钉、飞书、自定义接口，这里以飞书为例。

<div align=center><img width="1000" src="/img/2000000047.png" div align=center/></div><br>

> 关于飞书机器人 Webhook 地址的生成方法可以查看飞书官方文档 《自定义机器人使用指南》https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot

为了让通知格式更加美观，这里创建一个通知内容模版。

**告警触发通知模版**

**标题：**【紧急告警】蜜标凭证被调用，发现入侵行为

**正文：**

```yaml
告警策略：{{.Alarm}}
告警级别：{{.Level_zh}}
攻击 IP：{{.QueryLog[0][0].content.sourceIPAddress}}
攻击区域：{{.QueryLog[0][0].content.eventRegion}}
攻击服务：{{.QueryLog[0][0].content.resourceType}}
攻击操作：{{.QueryLog[0][0].content.eventName}}
攻击结果：{{.QueryLog[0][0].content.errorMessage}}
攻击请求头：{{.QueryLog[0][0].content.userAgent}}
触发时间：{{.StartTime}}

详细报告：[{{.DetailUrl}}]({{.DetailUrl}})
查询数据：[{{.QueryUrl}}]({{.QueryUrl}})
{{- if .CanSilent}}
屏蔽告警：[{{.SilentUrl}}]({{.SilentUrl}})
{{- end}}
```

**告警恢复通知模版**

**标题：** 攻击者已停止调用蜜标凭证

**正文：**

```yaml
告警策略：{{.Alarm}}
告警级别：{{.Level_zh}}
触发时间：{{.StartTime}}
恢复时间：{{.NotifyTime}}

详细报告：[{{.DetailUrl}}]({{.DetailUrl}})
查询数据：[{{.QueryUrl}}]({{.QueryUrl}})
{{- if .CanSilent}}
屏蔽告警：[{{.SilentUrl}}]({{.SilentUrl}})
{{- end}}
```

<div align=center><img width="1000" src="/img/2000000048.png" div align=center/></div><br>

接着创建一个通知渠道组，这里设置的通知规则是当检测到有紧急事件的告警时，向飞书发送通知消息。

<div align=center><img width="1000" src="/img/2000000049.png" div align=center/></div><br>

最后在监控告警功能中，创建一个告警策略，监控任务里的执行语句设置为 userIdentity.secretId: <your_secretid> 的格式，查询时间范围 10 分钟，触发条件里的告警等级设置成紧急。

<div align=center><img width="1000" src="/img/2000000050.png" div align=center/></div><br>

执行周期设置为 5 分钟，告警频率设置成 5 分钟，最后将刚刚创建的通知渠道组关联上即可。

<div align=center><img width="1000" src="/img/2000000051.png" div align=center/></div><br>

此时，当这个访问凭证被调用时，过几分钟等待攻击者的调用记录被投递到日志服务里并且触发告警策略后，我们就能收到告警消息了。

<div align=center><img width="700" src="/img/2000000052.png" div align=center/></div><br>

## 总结

在上述的实现步骤中，读者可以根据自身情况选择使用飞书还是钉钉等平台进行通知，通知的模版和告警频率也可以自行修改。

通过这样的方法，安全人员可以在一些可能被入侵的位置分别放上不同的蜜标凭证，在通知模版里再写上蜜标凭证放置的位置等信息，这样企业就能够在几分钟内收到蜜标被调用的告警通知，也就可以及时发现哪个位置被入侵了。

由于现在攻击者普遍会采用自动化工具去执行信息收集、内网扫描、云上横向等操作，因此企业越快知道被入侵、越快做出响应，就越有可能将影响降到最低，最后希望通过这个文章让你的云环境更加安全。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 8 日"
    }
  }
</script>