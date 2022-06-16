---
title: Terraform 离线可视化


---

<center><h1>Terraform 离线可视化</h1></center>

---

如果 Terraform 项目比较复杂，那么可以利用 tfviz 这个工具，可视化 Terraform 项目，tfviz 项目地址：[https://github.com/steeve85/tfviz](https://github.com/steeve85/tfviz)

安装

```bash
GO111MODULE=on go get -u github.com/steeve85/tfviz
```

到 Terraform 项目目录下使用

```bash
tfviz -input ./ -output tfimg.png
```

   <img width="800" src="/img/1650012022.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>