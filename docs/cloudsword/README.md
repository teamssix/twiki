---
title: 云鉴使用手册
---
<center><h1>云鉴 CloudSword 使用手册</h1></center>

---

<div align=center><img width="1000" src="/img/2000000054.jpg" div align=center/></div>

<h3 align="center">云鉴，让您的公有云环境更安全</h3>

<p align="center">
<img src="https://img.shields.io/github/go-mod/go-version/wgpsec/cloudsword">
<a href="https://github.com/wgpsec/cloudsword/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-apache-blue.svg"></a>
<a href="https://github.com/wgpsec/cloudsword/releases"><img src="https://img.shields.io/github/downloads/wgpsec/cloudsword/total"></a>
<a href="https://github.com/wgpsec/cloudsword/releases/"><img src="https://img.shields.io/github/release/wgpsec/cloudsword"></a>
<a href="https://github.com/wgpsec/cloudsword"><img src="https://img.shields.io/github/stars/wgpsec/cloudsword"></a>
<a href="https://twitter.com/wgpsec"><img src="https://img.shields.io/twitter/follow/wgpsec.svg?logo=twitter"></a>
<a href="https://twitter.com/teamssix"><img src="https://img.shields.io/twitter/follow/teamssix.svg?logo=twitter"></a>
</p>

---

云鉴 CloudSword 是一款帮助公有云租户快速发现云上风险、测试云上风险、增强云上防护能力的综合性开源工具。

作为一款面向安全人员的工具，云鉴可以帮助租户快速了解当前公有云环境中的资源信息、快速发现当前环境中可能存在的弱点从而方便安全人员进行修补，云鉴还预设了一些防御方法，方便安全人员快速部署从而增强云上的防御能力。

* 全局中文输出，没有使用压力。
* 命令补全提示，方便易于使用。
* MSF 使用逻辑，极低学习成本。
* 凭证不用落地，避免二次泄露。

## 开始使用

### HomeBrew 安装

安装

```bash
brew tap wgpsec/tap
brew install wgpsec/tap/cloudsword
```

更新

```bash
brew update
brew upgrade cloudsword
```

### 下载二进制包

云鉴下载地址：[github.com/wgpsec/cloudsword/releases](https://github.com/wgpsec/cloudsword/releases)

下载系统对应的压缩文件，解压后在命令行中运行即可。

## 使用手册

完整用法与介绍可以查看 [云鉴使用手册](https://wiki.teamssix.com/cloudsword)

## 集成模块

以下是云鉴目前所支持使用的模块：

| 序号 | ID   | 云提供商 | 推荐评级 | 模块名称                      | 描述                                 |
| :--- | :--- | :------- | :------- | :---------------------------- | :----------------------------------- |
| 1    | 1101 | 阿里云   | ★★★★     | list_cloud_assets             | 列出  OSS、ECS、RAM、Domain 服务资产 |
| 2    | 1201 | 阿里云   | ★★       | oss_list_buckets              | 列出阿里云  OSS 对象存储桶           |
| 3    | 1202 | 阿里云   | ★★★★     | oss_search_objects            | 搜索阿里云  OSS 对象                 |
| 4    | 1203 | 阿里云   | ★★★      | oss_bucket_only_upload_images | 使用云函数限制存储桶只允许上传图片   |
| 5    | 1301 | 阿里云   | ★★       | ecs_list_instances            | 列出阿里云  ECS 弹性计算实例         |
| 6    | 1401 | 阿里云   | ★★       | ram_list_users                | 列出阿里云  RAM 用户                 |
| 7    | 1402 | 阿里云   | ★        | ram_list_roles                | 列出阿里云  RAM 角色                 |
| 8    | 1403 | 阿里云   | ★        | ram_create_user               | 创建阿里云  RAM 用户                 |
| 9    | 1404 | 阿里云   | ★        | ram_attach_policy_to_user     | 为阿里云  RAM 用户添加策略           |
| 10   | 1405 | 阿里云   | ★★★      | ram_create_login_profile      | 创建阿里云  RAM 用户 Web 登录配置    |
| 11   | 1406 | 阿里云   | ★        | ram_create_access_key         | 创建阿里云  RAM 用户访问凭证         |
| 12   | 1501 | 阿里云   | ★        | domain_list_domains           | 列出阿里云  Domains 域名资产         |
| 13   | 2101 | 腾讯云   | ★★★★     | list_cloud_assets             | 列出  COS、EVM、LH、RAM 服务资产     |
| 14   | 2102 | 腾讯云   | ★★★★★    | create_honey_token            | 创建腾讯云访问凭证蜜标               |
| 15   | 2201 | 腾讯云   | ★★       | cos_list_buckets              | 列出腾讯云 COS 对象存储桶            |
| 16   | 2301 | 腾讯云   | ★★       | cvm_list_instances            | 列出腾讯云 CVM 弹性计算实例          |
| 17   | 2302 | 腾讯云   | ★        | lh_list_instances             | 列出腾讯云 LH 轻量应用服务器         |
| 18   | 2401 | 腾讯云   | ★★       | cam_list_users                | 列出腾讯云 CAM 用户                  |
| 19   | 2402 | 腾讯云   | ★        | cam_list_roles                | 列出腾讯云 CAM 角色                  |
| 20   | 2403 | 腾讯云   | ★        | cam_create_user               | 创建腾讯云 CAM 用户                  |
| 21   | 2404 | 腾讯云   | ★        | cam_attach_policy_to_user     | 为腾讯云 CAM 用户添加策略            |
| 22   | 2405 | 腾讯云   | ★★★      | cam_create_login_profile      | 创建腾讯云 CAM 用户 Web 登录配置     |
| 23   | 2406 | 腾讯云   | ★        | cam_create_access_key         | 创建腾讯云 CAM 用户访问凭证          |
| 24   | 3201 | 华为云   | ★★       | obs_list_buckets              | 列出华为云  OBS 对象存储桶           |
| 25   | 4201 | 百度云   | ★★       | bos_list_buckets              | 列出百度云  BOS 对象存储桶           |

> 推荐评级最高 5 颗星，推荐评级根据模块的复杂程度、受欢迎程度、价值程度等因素综合判定。

## 快速上手

查看帮助信息

```bash
CloudSword > help

全局命令
========

	一级命令		描述
	--------	----
	help		查看帮助信息
	list		列出模块
	quit		退出程序
	search		搜索模块
	use			使用模块


二级命令
========

	二级命令		描述
	--------	----
	info		查看模块使用方法
	run			运行模块
	set			设置运行参数
	unset		取消设置运行参数


环境变量
========

	环境变量							描述
	--------						----
	CLOUD_SWORD_ACCESS_KEY_ID		访问凭证 ID
	CLOUD_SWORD_ACCESS_KEY_SECRET	访问凭证 Secret
	CLOUD_SWORD_SECURITY_TOKEN		可选，访问凭证的临时令牌部分
	CLOUD_SWORD_DETAIL				详细内容输出（设置 no 或者 yes）
```

列出阿里云  OSS 对象存储桶

```bash
CloudSword > use 1201_aliyun_oss_list_buckets

CloudSword 阿里云 (1201_oss_list_buckets) > set ak_id XXXXXXXXXXXX
ak_id ==> XXXXXXXXXXXX

CloudSword 阿里云 (1201_oss_list_buckets) > set ak_secret XXXXXXXXXXXX
ak_secret ==> XXXXXXXXXXXX

CloudSword 阿里云 (1201_oss_list_buckets) > run
[INFO] 2024-12-20 23:23:23 正在运行 1201_aliyun_oss_list_buckets 模块。
[INFO] 2024-12-20 23:23:23 找到以下存储桶：
XXXXXXXX
XXXXXXXX
```

<div align=center><img width="1000" src="/img/2000000053.gif" div align=center/></div>

## 加入云鉴问题讨论群

在「WgpSec 狼组安全团队」公众号菜单栏点击「加群」，添加「WgpSecBot」微信。

<div align=center><img width="700" src="/img/2000000059.png"></div><br>

添加「WgpSecBot」微信后，给机器人发送「云鉴」关键词，机器人就会自动给您发送进群链接了。

<div align=center><img width="700" src="/img/2000000060.png"></div><br>

## 贡献者

十分感谢各位师傅对云鉴的贡献~，如果你也想对云鉴贡献代码或想法，请参见贡献说明：[CONTRIBUTING](https://github.com/wgpsec/cloudsword/blob/master/CONTRIBUTING.md)


<div align=center>
    <table>
        <tr>
            <td align="center">
                <a href="https://github.com/teamssix"><img alt="TeamsSix" src="/img/1662546884.jpeg" style="width: 100px;" /><br />TeamsSix</a>
            </td>
            <td align="center">
                <a href="https://github.com/keac"><img alt="Keac" src="/img/2000000055.jpeg" style="width: 100px;" /><br />Keac</a>
            </td>
            <td align="center">
                <a href="https://github.com/shadowabi"><img alt="shadowabi" src="/img/1688146300.jpeg" style="width: 100px;" /><br />shadowabi</a>
            </td>
        </tr>
    </table>
</div>

## 使用答疑

我在云鉴使用手册里介绍了为什么写云鉴、云鉴未来的计划以及大家可能关心的问题，感兴趣的师傅可以移步[云鉴使用答疑](https://wiki.teamssix.com/cloudsword/more)查看。

## 协议

云鉴在 [Apache-2.0](https://github.com/wgpsec/cloudsword?tab=Apache-2.0-1-ov-file#Apache-2.0-1-ov-file) 协议下授权使用。

## 更多

下面这个是我们狼组安全团队的公众号，欢迎师傅关注，有想法一起加入狼组的师傅也可以投递简历至 admin#wgpsec.org 加入我们。

> 发送邮件时，注意将 # 改为 @

<div align=center><img width="700" src="/img/2000000030.png"></div><br>

如果你对云安全比较感兴趣，可以看我的另外一个项目 [Awesome Cloud Security](https://github.com/teamssix/awesome-cloud-security)，这里收录了很多国内外的云安全资源，另外在我的[云安全文库](https://wiki.teamssix.com/)里有大量的云安全方向的笔记和文章，这应该是国内还不错的云安全学习资料。

下面这个是我的个人微信公众号，在 TeamsSix 公众号里可以与我进行联系，后续关于云鉴的动态我也会发布到我的公众号里。

<div align=center><img width="700" src="/img/2000000024.png"></div><br>

如果您感觉这个项目还不错，也欢迎扫描下面打赏码进行赞赏。

<div align=center><img width="600" src="/img/2000000023.png"></div><br>

> 赞赏行为纯属自愿，旨在表达对开源软件作者或贡献者的支持和感谢，并非购买商品或服务的交易行为。赞赏者应当清楚理解，赞赏款项不享有任何商品或服务的保证，也不构成任何形式的合同关系。

<div align=center><b>感谢您使用我的工具</b></div>


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
