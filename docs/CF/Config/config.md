---
title: 配置与管理凭证
---

## 配置凭证

CF 支持两种配置访问凭证的方法，一种是利用永久的访问凭证去配置，一种是利用临时的访问凭证去配置。

### 配置凭证

```bash
cf config
```

在配置凭证的时候 `Access Key ID` 和 `Access Key Secret` 参数是必填的，只有当配置临时访问凭证时，才需要填 `STS Token` 参数。

> 配置文件被会存储在 `~/.config/cf/cache.db` 中

在 v0.4.3 版本中，对 config 命令加入了自动识别本地访问密钥的功能，当用户在配置访问密钥的时候，CF 会自动识别本地是否存在访问密钥，如果存在的话，则会提示用户是否将其导入到 CF，CF 所识别的文件地址和环境变量如下：

| 云提供商 |   类型   |                             对象                             |
| :------: | :------: | :----------------------------------------------------------: |
|  阿里云  | 配置文件 |                    ~/.aliyun/config.json                     |
|  阿里云  | 环境变量 | ALIBABACLOUD_ACCESS_KEY_ID, ALIBABACLOUD_ACCESS_KEY_SECRET, SECURITY_TOKEN |
|  腾讯云  | 配置文件 |                    ~/.tccli/*.credential                     |
|  腾讯云  | 环境变量 |       TENCENTCLOUD_SECRET_ID, TENCENTCLOUD_SECRET_KEY        |
|   AWS    | 配置文件 |                      ~/.aws/credentials                      |
|   AWS    | 环境变量 | AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN  |
|  华为云  | 配置文件 |                  ~/.huaweicloud/credentials                  |
|  华为云  | 环境变量 | HUAWEICLOUD_SDK_AK, HUAWEICLOUD_SDK_SK, HUAWEICLOUD_SDK_SECURITY_TOKEN |
|  华为云  | 环境变量 | OBS_ACCESS_KEY_ID, OBS_SECRET_ACCESS_KEY, OBS_SECURITY_TOKEN |

### 删除凭证

```bash
cf config del
```

### 查看凭证

```bash
cf config ls
```

使用 ls 命令列出配置的时候，如果配置内容过长，这时输出内容会进行部分省略展示，如果想列出凭证的全部内容，可以使用 `-a` 或者`--all`命令。

```
cf config ls -a
```

### 修改配置

```bash
cf config mf
```

### 扫描本地配置

```bash
cf config scan
```

### 切换配置

```bash
cf config sw
```

### 查询配置所属云厂商

目前已支持腾讯云、阿里云、AWS、华为云、百度云、火山引擎、金山云、京东云、GCP、七牛云、UCloud 的 AK 识别。

```bash
cf config query -a <your_access_key_id>
```

`-a` 参数用来指定 Access Key Id，该参数是必填的，当只填该参数时会仅通过正则判断所属云厂商。

如果加上了 `-s` 参数指定 Secret Access Key ，或者同时加上了 `-t` 参数指定 Session Token ，则除了会调用正则外，还会调用相关接口用来判断 AK 是否可用，从而能更准确的判断 AK 所属厂商。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 1 日"
    }
  }
</script>
