---
title: 配置文件写入
---

## 配置文件写入

在第一次使用时，LC 会在 `$HOME/.config/lc` 目录下创建一个 `config.yaml`，因此在第一次执行 `lc` 命令后，将您的云访问凭证填写到 `$HOME/.config/lc/config.yaml` 文件中后，就可以开始正式使用 LC 了。

配置文件里的访问凭证支持明文和环境变量两种方式写入。

### 使用明文写入

```yaml
# 阿里云
- provider: aliyun
  id: aliyun_default
  access_key: xxxxxxxx
  secret_key: xxxxxxxx
  session_token:
```

### 使用环境变量

```yaml
# 阿里云
- provider: aliyun
  id: aliyun_default
  access_key: $ALIYUNACCESSKEY
  secret_key: $ALIYUNSECRETKEY
  session_token:
```

接着只需要在对应的环境变量中写入访问变量即可。

对于 Linux 或 MacOS

```sh
export ALIYUNACCESSKEY="xxxxxxxx"
export ALIYUNSECRETKEY="xxxxxxxx"
```

对于 Windows

```sh
set ALIYUNACCESSKEY="xxxxxxxx"
set ALIYUNSECRETKEY="xxxxxxxx"
```

### 完整的配置文件

下面是一个完整的配置文件。

```yaml
# lc (list cloud) 的云服务商配置文件

# 配置文件说明

# provider 是云服务商的名字
- provider: provider_name
  # id 是当前配置文件的名字
  id: test
  # access_key 是这个云的访问凭证 Key 部分
  access_key:
  # secret_key 是这个云的访问凭证 Secret 部分
  secret_key:
  # （可选）session_token 是这个云的访问凭证 session token 部分，仅在访问凭证是临时访问配置时才需要填写这部分的内容
  session_token:

# 阿里云
# 访问凭证获取地址：https://ram.console.aliyun.com
- provider: aliyun
  id: aliyun_default
  cloud_services: ecs,oss,rds,fc,domain
  access_key:
  secret_key:
  session_token:

# 腾讯云
# 访问凭证获取地址：https://console.cloud.tencent.com/cam
- provider: tencent
  id: tencent_cloud_default
  cloud_services: cvm,lh,cos
  access_key:
  secret_key:
  session_token:

# 华为云
# 访问凭证获取地址：https://console.huaweicloud.com/iam
- provider: huawei
  id: huawei_cloud_default
  cloud_services: obs
  access_key:
  secret_key:
  session_token:

# 天翼云
# 访问凭证获取地址：https://oos-cn.ctyun.cn/oos/ctyun/iam/dist/index.html#/certificate
- provider: tianyi
  id: tianyi_cloud_default
  cloud_services: oos
  access_key:
  secret_key:

# 百度云
# 访问凭证获取地址：https://console.bce.baidu.com/iam/
- provider: baidu
  id: baidu_cloud_default
  cloud_services: bos,bcc
  access_key:
  secret_key:
  session_token:

# 联通云
# 访问凭证获取地址：https://console.cucloud.cn/console/uiam
- provider: liantong
  id: liantong_cloud_default
  cloud_services: oss
  access_key:
  secret_key:
  session_token:

# 七牛云
# 访问凭证获取地址：https://portal.qiniu.com/developer/user/key
- provider: qiniu
  id: qiniu_cloud_default
  cloud_services: kodo
  access_key:
  secret_key:

# 移动云
# 访问凭证获取地址：https://console.ecloud.10086.cn/api/page/eos-console-web/CIDC-RP-00/eos/key
- provider: yidong
  id: yidong_cloud_default
  cloud_services: eos
  access_key:
  secret_key:
  session_token:
```

配置文件中的每个部分所表示的意思如下：

* `provider`：云服务商的名字
* `id`：当前配置文件的名字
* `access_key`：云访问凭证的 Key 部分
* `secret_key`：云访问凭证的 Secret 部分
* `session_token`：云访问凭证的 session token 部分，这是个可选项，仅在访问凭证是临时访问配置时才需要填写这部分的内容。


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 10 月 6 日"
    }
  }
</script>