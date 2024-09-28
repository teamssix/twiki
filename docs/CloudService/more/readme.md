---
title: AccessKey 特征整理
---
<center><h1>云业务 AccessKey 标识特征整理</h1><h2>本文作者：曾哥</h2><br><br></center>
---

::: warning 注意

经读者提醒，文中部分正则存在一定的误判漏判，如果你发现了存在错误的地方，欢迎在底部评论或者直接点击文章底部的`编辑这个页面`按钮，通过为文库提交 PR 的方式来修改文章，十分感谢。

:::

对于云场景的渗透，现在已经层出不穷，获得AK和SK，也是云安全渗透中重要的一环。

通常，我们会在一些敏感的配置文件或者通过未授权访问、任意文件读取漏洞等方式，来寻找AK和SK。

但市面上，通过正则匹配式来寻找AK和SK的，如下：

```css
(?i)((access_key|access_token|admin_pass|admin_user|algolia_admin_key|algolia_api_key|alias_pass|alicloud_access_key|amazon_secret_access_key|amazonaws|ansible_vault_password|aos_key|api_key|api_key_secret|api_key_sid|api_secret|api.googlemaps AIza|apidocs|apikey|apiSecret|app_debug|app_id|app_key|app_log_level|app_secret|appkey|appkeysecret|application_key|appsecret|appspot|auth_token|authorizationToken|authsecret|aws_access|aws_access_key_id|aws_bucket|aws_key|aws_secret|aws_secret_key|aws_token|AWSSecretKey|b2_app_key|bashrc password|bintray_apikey|bintray_gpg_password|bintray_key|bintraykey|bluemix_api_key|bluemix_pass|browserstack_access_key|bucket_password|bucketeer_aws_access_key_id|bucketeer_aws_secret_access_key|built_branch_deploy_key|bx_password|cache_driver|cache_s3_secret_key|cattle_access_key|cattle_secret_key|certificate_password|ci_deploy_password|client_secret|client_zpk_secret_key|clojars_password|cloud_api_key|cloud_watch_aws_access_key|cloudant_password|cloudflare_api_key|cloudflare_auth_key|cloudinary_api_secret|cloudinary_name|codecov_token|config|conn.login|connectionstring|consumer_key|consumer_secret|credentials|cypress_record_key|database_password|database_schema_test|datadog_api_key|datadog_app_key|db_password|db_server|db_username|dbpasswd|dbpassword|dbuser|deploy_password|digitalocean_ssh_key_body|digitalocean_ssh_key_ids|docker_hub_password|docker_key|docker_pass|docker_passwd|docker_password|dockerhub_password|dockerhubpassword|dot-files|dotfiles|droplet_travis_password|dynamoaccesskeyid|dynamosecretaccesskey|elastica_host|elastica_port|elasticsearch_password|encryption_key|encryption_password|env.heroku_api_key|env.sonatype_password|eureka.awssecretkey)[a-z0-9_ .\-,]{0,25})(=|>|:=|\|\|:|<=|=>|:).{0,5}['\"]([0-9a-zA-Z\-_=]{8,64})['\"]
```

但这是通过匹配 AccessKey 开头的内容，比如 `access_token:AKID1AS893JF90AWK` 中 `access_token` 这个开头来进行正则匹配的，但如果没有这样的开头呢？那我们要怎么办？

那这里我就将不同厂商的 `Access Key` 内容特征，分别整理出来，欢迎各位师傅补充和纠错哈哈 ~

同时也能够根据不同厂商 Key 的不同特征，直接能判断出这是哪家厂商的 `Access Key` ，从而针对性进行渗透测试。

## Amazon Web Services

亚马逊云计算服务 (Amazon Web Services, AWS) 的 Access Key 开头标识一般是 "AKIA"。

```css
^AKIA[A-Za-z0-9]{16}$
```

- Access Key ID: 20个随机的大写字母和数字组成的字符，例如 AKHDNAPO86BSHKDIRYTE
- Secret Access Key ID: 40个随机的大小写字母组成的字符，例如 S836fh/J73yHSb64Ag3Rkdi/jaD6sPl6/antFtU（无法找回丢失的 Secret Access Key ID）。

## Google Cloud Platform

Google Cloud Platform (GCP) 的 Access Key 开头标识一般是 "GOOG"。

```css
^GOOG[\w\W]{10,30}$
```

- 服务账号的JSON文件中包含了Access Key和密钥的信息，其中Access Key为`client_email`，其长度不固定，由字母、数字和特殊字符组成。
- 密钥（Key）的长度为256个字符，由字母、数字和特殊字符组成。

## Microsoft Azure

Microsoft Azure 的 Access Key 开头标识一般是 "AZ"。

```css
^AZ[A-Za-z0-9]{34,40}$
```

- Azure AD Application的Client ID通常用作Access Key，长度为36个字符，由字母和数字组成。
- 对于Azure AD Application的密钥（Secret），长度为44个字符，由字母、数字和特殊字符组成。

## IBM Cloud

IBM 云 (IBM Cloud) 的 Access Key 开头标识一般是 "IBM"。

```css
^IBM[A-Za-z0-9]{10,40}$
```

或者是以下规则：

```css
[a-zA-Z0-9]{8}(-[a-zA-Z0-9]{4}){3}-[a-zA-Z0-9]{12}$
```

## Oracle Cloud

Oracle云 (Oracle Cloud) 的 Access Key 开头标识一般是 "OCID"。

```css
^OCID[A-Za-z0-9]{10,40}$
```

## 阿里云

阿里云 (Alibaba Cloud) 的 Access Key 开头标识一般是 "LTAI"。

```css
^LTAI[A-Za-z0-9]{12,20}$
```

- Access Key ID长度为16-24个字符，由大写字母和数字组成。
- Access Key Secret长度为30个字符，由大写字母、小写字母和数字组成。

## 腾讯云

腾讯云 (Tencent Cloud) 的 Access Key 开头标识一般是 "AKID"。

```css
^AKID[A-Za-z0-9]{13,20}$
```

- SecretId长度为17个字符，由字母和数字组成。
- SecretKey长度为40个字符，由字母和数字组成。

## 华为云

华为云 (Huawei Cloud) 的 Access Key 是20个随机大写字母和数字组成，较难用正则表达式匹配。

```css
[A-Z0-9]{20}
```

## 百度云

百度云 (Baidu Cloud) 的 Access Key 开头标识一般是 "AK"。

```css
^AK[A-Za-z0-9]{10,40}$
```

## 京东云

京东云 (JD Cloud) 的 Access Key 开头标识一般是 "JDC_"。

```css
^JDC_[A-Z0-9]{28,32}
```

## 字节跳动火山引擎

字节跳动火山引擎 (Volcengine) 的 Access Key 开头标识一般是 "AKLT"，长度小于256位。

```css
^AKLT[a-zA-Z0-9-_]{0,252}
```

## UCloud

UCloud (UCloud) 的 Access Key 开头标识一般是 "UC"

```css
^UC[A-Za-z0-9]{10,40}$
```

## 青云

青云 (QingCloud) 的 Access Key 开头标识一般是 "QY"。

```css
^QY[A-Za-z0-9]{10,40}$
```

## 金山云

金山云 (Kingsoft Cloud) 的 Access Key 开头标识一般是 "AKLT"。

```css
^AKLT[a-zA-Z0-9-_]{16,28}
```

## 联通云

联通云 (China Unicom Cloud) 的 Access Key 开头标识一般是 "LTC"。

```css
^LTC[A-Za-z0-9]{10,60}$
```

## 移动云

移动云 (China Mobile Cloud) 的 Access Key 开头标识一般是 "YD"。

```css
^YD[A-Za-z0-9]{10,60}$
```

## 电信云

中国电信云 (China Telecom Cloud) 的 Access Key 开头标识一般是 "CTC"。

```css
^CTC[A-Za-z0-9]{10,60}$
```

## 一云通

一云通 (YiYunTong Cloud) 的 Access Key 开头标识一般是 "YYT"。

```css
^YYT[A-Za-z0-9]{10,60}$
```

## 用友云

用友云 (Yonyou Cloud) 的 Access Key 开头标识一般是 "YY"。

```css
^YY[A-Za-z0-9]{10,40}$
```

## 南大通用云

南大通用云 (OUCDC) 的 Access Key 开头标识一般是 "CI"。

```css
^CI[A-Za-z0-9]{10,40}$
```

## G-Core Labs

G-Core Labs 的 Access Key 开头标识一般是 "gcore"

```css
^gcore[A-Za-z0-9]{10,30}$
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 8 月 9 日"
    }
  }
</script>
