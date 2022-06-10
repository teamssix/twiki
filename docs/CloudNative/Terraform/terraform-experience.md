---
title: Terraform 初体验

---

<center><h1>Terraform 初体验</h1></center>

---

在使用 Terraform 之前，需要先在对应的云厂商控制台上生成一个 Access Key，这里以在 AWS 上创建一个 S3 服务为例。

首先新建一个文件夹，例如 demo 文件夹，接着在里面创建一个 s3demo.tf 文件，文件内容如下：

```json
 provider "aws" {
   region     = "us-west-1"
   access_key = "your-access-key"
   secret_key = "your-secret-key"
 }
 
 resource "aws_s3_bucket" "b" {
   bucket = "my-tf-test-bucket-asdqqsdasd"
 
   tags = {
     Name        = "My bucket"
     Environment = "Dev"
   }
 }
 
 resource "aws_s3_bucket_acl" "example" {
   bucket = aws_s3_bucket.b.id
   acl    = "private"
 }
```

tf 文件采用的是 HCL 格式，HCL 格式是 Terraform 所属公司 HashiCorp 自己设计的一套配置语言

在 demo 文件夹下，运行一下初始化命令，这时 Terraform 会通过官方插件仓库下载对应的 Provider 插件

```bash
 terraform init
```

   <img width="1000" src="/img/1650009336.png">

因为我们这里的 s3demo.tf 里的 Provider 是 AWS，所以在初始化时，Terraform 就会去下载 AWS 的 Provider 插件

在 https://registry.terraform.io/browse/providers 可以看到 Terraform 所支持的厂商，这里基本上是涵盖了大部分云厂商的。

   <img width="1200" src="/img/1650009369.png">

接着使用 plan 命令查看接下来将要产生的变更

```bash
 terraform plan
```

   <img width="1000" src="/img/1650011645.png">

如果没什么问题，就可以应用了

```bash
 terraform apply
```

   <img width="1000" src="/img/1650011657.png">

中途会提示确认，输入 yes 即可

在 Terraform 执行完之后，查看 AWS 下的 S3 就可以看到刚刚通过 Terraform 创建的资源了。

   <img width="1000" src="/img/1650011705.png">

这样就完成了使用 Terraform 部署云资源的一个过程，想要清理刚刚创建的资源也非常简单，直接 destroy 即可

```bash
 terraform destroy
```

   <img width="1000" src="/img/1650011740.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>
