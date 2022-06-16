---
title: Terraform 在线可视化


---

<center><h1>Terraform 在线可视化</h1></center>

---

如果 Terraform 项目比较复杂，那么可以利用 Terraform Visual 这个网站，可视化 Terraform 项目，Terraform Visual 站点地址：[https://hieven.github.io](https://hieven.github.io)

首先在本地的 Terraform 场景目录下运行以下两条命令：

```bash
$ terraform plan -out=plan.out
$ terraform show -json plan.out > plan.json
```

然后将生成的 plan.json 上传到这个网站里即可

</br><img width="1000" src="https://github.com/hieven/terraform-visual/raw/master/docs/demo.gif"></br>

不过目前这个站点还只支持 aws 的场景。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月16日"
    }
  }
</script>