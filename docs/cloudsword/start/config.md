---
title: 配置凭证
---

## 环境变量

云鉴支持以下环境变量：

| 环境变量                      | 描述                             |
| :---------------------------- | :------------------------------- |
| CLOUD_SWORD_ACCESS_KEY_ID     | 访问凭证 ID                      |
| CLOUD_SWORD_ACCESS_KEY_SECRET | 访问凭证 Secret                  |
| CLOUD_SWORD_SECURITY_TOKEN    | 可选，访问凭证的临时令牌部分     |
| CLOUD_SWORD_DETAIL            | 详细内容输出（设置 no 或者 yes） |


对于 Mac 和 Linux 系统：


```bash
export CLOUD_SWORD_ACCESS_KEY_ID=xxxxxx
export CLOUD_SWORD_ACCESS_KEY_SECRET=xxxxxx
```

对于 Windows 系统：

```powershell
set CLOUD_SWORD_ACCESS_KEY_ID=xxxxxx
set CLOUD_SWORD_ACCESS_KEY_SECRET=xxxxxx
```

配置完环境变量后，在使用云鉴时，模块里对应的参数会自动配置为环境变量里的值。

## 程序启动后再配置

云鉴除了支持环境变量外，在程序启动后再配置凭证也是可以的。

云鉴启动后，使用 `use` 命令选择自己要使用的模块，再使用 `info` 命令可以查看当前模块需要配置的信息，如下所示：

```bash
> cloudsword

CloudSword > use 1201_aliyun_oss_list_buckets
CloudSword 阿里云 (1201_oss_list_buckets) > info

 操作：
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 名称             必选      当前设置                                  描述                                                  │
│─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ ak_id            true                                             访问凭证 ID                                            │
│ ak_secret        true                                             访问凭证 Secret                                         │
│ ak_token         false                                            可选，访问凭证的临时令牌部分                               │
│ detail           true      false                                  设置详细输出模式（true 或 false）                         │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```

可以看到在这个模块里，有三个必选项，分别是 `ak_id`、`ak_secret` 和 `detail`，其中 `detail` 默认是 `false` 的，这里我们仅需手动配置 `ak_id` 和 `ak_secret`，具体配置需要使用 `set` 命令，如下所示：

```bash
CloudSword 阿里云 (1201_oss_list_buckets) > set ak_id xxxxxx
ak_id ==> xxxxxx
CloudSword 阿里云 (1201_oss_list_buckets) > set ak_secret xxxxxx
ak_secret ==> xxxxxx
CloudSword 阿里云 (1201_oss_list_buckets) > info

 操作：
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 名称             必选      当前设置                                  描述                                                  │
│─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ ak_id            true      xxxxxx                                 访问凭证 ID                                            │
│ ak_secret        true      xxxxxx                                 访问凭证 Secret                                        │
│ ak_token         false                                            可选，访问凭证的临时令牌部分                              │
│ detail           true      false                                  设置详细输出模式（true 或 false）                        │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 12 月 21 日"
    }
  }
</script>
