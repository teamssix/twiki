---
title: Terraform 代码安全性检查


---

<center><h1>Terraform 代码安全性检查</h1></center>

---

如果想知道自己写的 Terraform 项目代码有没有什么安全风险，那么可以使用 tfsec 这个工具，tfsec 项目地址：https://github.com/aquasecurity/tfsec

Mac 可以直接使用 brew 安装

```bash
brew install tfsec
```

或者使用 go install 安装

```bash
go install github.com/aquasecurity/tfsec/cmd/tfsec@latest
```

使用也非常简单，直接来到 Terraform 项目目录下，使用 tfsec . 命令即可

```bash
tfsec .
```

   <img width="900" src="/img/1650012117.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>