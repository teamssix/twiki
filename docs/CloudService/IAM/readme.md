---
title: 利用 IAM 进行权限提升
---
<center><h1>利用 IAM 进行权限提升</h1></center>

---

如果当前用户具备编辑 IAM 策略的权限，但没有某些服务权限的话，那么可以在 IAM 中开启这个服务权限，以实现提权。

例如下面这个用户，在打开 EC2 时提示我们没有权限。

</br><img width="1000" src="/img/1651980039.png"></br>

但是这个用户是具有 IAM 的编辑权限的，因此我们可以将 AmazonEC2FullAccess 权限赋予给这个用户

</br><img width="800" src="/img/1651980063.png"></br>

此时再次访问 EC2 界面，发现就可以成功访问了，这样就实现了提权。

</br><img width="900" src="/img/1651980101.png"></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月8日"
    }
  }
</script>
