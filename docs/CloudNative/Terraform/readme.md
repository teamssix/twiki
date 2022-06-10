---
title: Terraform 介绍与安装

---

<center><h1>Terraform 介绍与安装</h1></center>

---

## 介绍

Terraform 是一种安全有效地构建、更改和版本控制基础设施的工具(基础架构自动化的编排工具)。

简单的说就是可以通过编写一些类似于 JSON 格式的文件，直接创建一批云上的服务资源，Terraform 和  AWS 的 CloudFormation 产品有些类似，但 CloudFormation 只支持 AWS，于是 HashiCorp 公司打造了一个多云 (Multi Cloud) 的开源的基础设施即代码 (IaC) 工具，即 Terraform

## 安装

Terraform 的安装很简单，不同操作系统的安装命令如下：

- Ubuntu

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository -y "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install -y terraform
```

- Centos

```bash
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/RHEL/hashicorp.repo
sudo yum -y install terraform
```

- Mac

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

- Windows

```bash
choco install terraform
```

或者直接到 Terraform 官网下载可执行文件使用，官方下载地址：https://www.terraform.io/downloads

> 参考资料：https://www.cnblogs.com/sparkdev/p/10052310.html

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>