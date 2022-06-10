---
title: TF入门以及在云上攻防中的作用

---

<center><h1>Terraform 使用入门以及在云上攻防中的作用</h1></center>

---

## 0x00 前言

Terraform 是一种资源编排工具，通过它可以很方便的去构建云服务资源，本文将以「在腾讯云上创建一个 COS 存储桶」为例进行演示。

## 0x01 Terraform 概述

Terraform 官方下载页面：[terraform.io/downloads](https://www.terraform.io/downloads) ，在这里找到自己的系统进行安装即可。

目前 Terraform 基本已经支持了大部分主流的云服务厂商，在 [registry.terraform.io/browse/providers](https://registry.terraform.io/browse/providers) 中可以看到其所支持的云服务厂商。

本文中将使用腾讯云作为演示，在平时使用 Terraform 时会频繁的去参考官方文档，其腾讯云的官方文档地址为：[registry.terraform.io/providers/tencentcloudstack/tencentcloud/latest/docs](https://registry.terraform.io/providers/tencentcloudstack/tencentcloud/latest/docs)

## 0x02 开始编写

首先创建一个文件夹（这里文件夹名称为 cos_bucket_demo），并新建以下文件。

```shell
.
└── cos_bucket_demo
    ├── README.md
    ├── main.tf
    ├── output.tf
    ├── terraform.tfvars
    ├── variables.tf
    └── version.tf
```

- README.md    描述文件
- main.tf    Terraform 主体代码文件
- output.tf    内容输出代码文件
- terraform.tfvars    参数文件
- variables.tf    变量声明文件
- version.tf    版本信息文件

可以看到在 cos_bucket_demo 文件夹中，有多个 tf 后缀的文件，其实这些 tf 文件里的代码都可以写到一个 tf 文件里，但一般为了规范些，还是建议分多个 tf 文件去写，一个文件夹对应一个 tf 场景。

接下来，我们来看看每个 tf 文件里都有哪些内容。

### version.tf

version.tf 一般是放和版本信息有关的代码，例如这里就是声明了 Provider 来源为 tencentcloud 且版本为 1.72.5，Provider 在这里可以理解成「提供云服务的厂商」的意思。

```json
terraform {
  required_providers {
    tencentcloud = {
      source  = "tencentcloudstack/tencentcloud"
      version = "1.72.5"
    }
  }
}
```

如果经常使用某个云的 Provider，建议指定固定的版本，这样在开启插件缓存后，每次初始化 Terraform 时，就不会因为 Provider 有更新了而要重新下载它，同时还会避免因为  Provider 更新导致代码不可用或者出现告警的情况。

开启插件缓存方法可以参考：[wiki.teamssix.com/CloudNative/Terraform/terraform-enable-plugin-cache.html](https://wiki.teamssix.com/CloudNative/Terraform/terraform-enable-plugin-cache.html)

### variables.tf

variables.tf 里一般会写上变量的声明，例如这里需要声明腾讯云的 secret id 和 secret key 变量。

```json
variable "tencentcloud_secret_id" {
  type        = string
  description = "Set Tencent Cloud secret id."
  sensitive   = true
  nullable    = false
}

variable "tencentcloud_secret_key" {
  type        = string
  description = "Set Tencent Cloud secret key."
  sensitive   = true
  nullable    = false
}
```

其中 variable 后面的是变量名称，type 指定变量类型，description 用来描述变量的用途，sensitive 用来指定变量是不是敏感信息，nullable 用来指定变量是不是可以为空。

### terraform.tfvars

terraform.tfvars 文件比较简单，在这里可以写上变量的值，这样在运行 Terraform 的时候，就不用从命令行中去指定变量了。

如果没有该文件，那么在执行 Terraform 代码时，Terraform 就会在命令行中提示输入这些变量。

```json
tencentcloud_secret_id  = "xxx"
tencentcloud_secret_key = "xxx"
```

### output.tf

output.tf 文件里一般会指定要输出的内容，这里要输出的是 COS Bucket 的地址。

```json
output "tencent_cloud_cos_bucket_name" {
  value       = "https://${tencentcloud_cos_bucket.cos_bucket_demo.cos_bucket_url}"
  description = "This is the bucket name of Tencent Cloud COS."
}
```

### main.tf

最后 main.tf 一个就是最核心的文件了。

```json
provider "tencentcloud" {
  secret_id  = var.tencentcloud_secret_id
  secret_key = var.tencentcloud_secret_key
  region     = "ap-beijing"
}

resource "tencentcloud_cos_bucket" "cos_bucket_demo" {
  bucket = "teamssix-${random_string.random_suffix.result}-${data.tencentcloud_user_info.foo.app_id}"
}

resource "random_string" "random_suffix" {
  length  = 7
  special = false
  upper   = false
}

data "tencentcloud_user_info" "foo" {}
```

首先在 provider 块中指定了腾讯云的 secret id 和 secret key 以及 region，接着使用 tencentcloud_cos_bucket resource 块用来创建存储桶。

由于腾讯云的 Bucket 名称中包含了使用者的 APP ID，所以这里还使用了 tencentcloud_user_info data 块，用来获取当前用户的 APP ID，同时为了避免 Bucket 名称重复，这里使用了 random_string resource 块用来生成一个随机数。



最后，就可以执行这些代码了。

## 0x03 执行代码

首先，将终端路径切到 cos_bucket_demo 文件夹下，运行初始化命令。

```json
terraform init
```

该命令会识别当前文件夹里的 tf 文件中所使用到的 Provider，然后去下载它。

如果提示 Error: Failed to install provider，大多数情况是因为网络的问题，可以在终端里设置代理后再次尝试。

然后运行以下命令，该命令会检查当前代码是否存在问题，如果没问题就会给出接下来将要执行的计划。

```json
terraform plan
```

最后，确认没问题后，就可以应用这个代码了。

```json
terraform apply
```

在执行该命令的时候，会提示 Enter a value，这时如果确认无误，就输入 yes 即可，最后就可以在 Outputs 中看到 Bucket 的 URL 了。

   <img width="1000" src="/img/1653896176.png">

这时，在腾讯云控制台的存储桶列表中，就可以看到我们刚才创建的存储桶了。

   <img width="1000" src="/img/1653896183.png">

这样，我们就完成了利用 Terraform 创建云服务资源的过程，如果想要销毁这个资源也很容易，直接运行以下命令即可。

```json
terraform destroy
```

## 0x04 在云上攻防中的作用

通过上面的内容，可以看到 Terraform 可以调用云厂商的 AK、SK 进行云服务资源的创建与获取，作为安全人员，我们可以利用这个特性进行云上服务的批量信息收集，下面以 COS、CVM、CAM 的信息收集为例。

将 output.tf 改为以下内容

```json
output "tencent_cloud_cos_bucket_list" {
  value = data.tencentcloud_cos_buckets.cos_buckets.bucket_list
}

output "tencent_cloud_cvm_instances_list" {
  value = data.tencentcloud_instances.cvm_instances.instance_list
}

output "tencent_cloud_cam_users_list" {
  value = data.tencentcloud_cam_users.cam_users.user_list
}
```

将 main.tf 改为以下内容

```json
provider "tencentcloud" {
  secret_id  = var.tencentcloud_secret_id
  secret_key = var.tencentcloud_secret_key
  region     = "ap-beijing"
}

data "tencentcloud_cos_buckets" "cos_buckets" {
}

data "tencentcloud_instances" "cvm_instances" {
}

data "tencentcloud_cam_users" "cam_users" {
}
```

然后应用代码，就可以获取到 COS、CVM、CAM 的相关信息了，如果想获取其他的信息，可以在 Provider 腾讯云官方文档中找到。

   <img width="800" src="/img/1653896190.png">

从站在安全人员的角度来说，我们完全可以通过 Terraform 打造一个独属于自己的全云场景覆盖的 AK、SK 利用工具，而且我们不用自己调取、调试任何 SDK，可以说是潜力无限了。

> 通过 Terraform 进行信息收集的这个想法来自 tanger 师傅

## 0x05 最后

Terraform 的内容远远不止上面说的这些，官方文档对它的介绍也足够详细，同时现在也有了由第三方翻译的中文文档：[lonegunmanb.github.io/introduction-terraform](https://lonegunmanb.github.io/introduction-terraform/)

另外在 T Wiki 中，还有一些 Terraform 其他资料，比如 Terraform 可视化、代码安全检查的方法等等，也可以作为扩展阅读：[wiki.teamssix.com/CloudNative/Terraform](https://wiki.teamssix.com/CloudNative/Terraform/)

如果你在编写 Terraform 代码的时候，想找一些其他人写的代码进行参考，那么不妨看看 TerraformGoat 这个项目：[github.com/HuoCorp/TerraformGoat](https://github.com/HuoCorp/TerraformGoat)

最后建议自己在编写 Terraform 代码的时候，多看官方文档，多用英文去搜索，多用官方文档的代码，可以在很大程度上提高自己的效率。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月30日"
    }
  }
</script>