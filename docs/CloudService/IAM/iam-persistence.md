---
title: 利用 IAM 进行权限维持
---
<center><h1>利用 IAM 进行权限维持</h1></center>

---

利用 IAM 进行权限维持的原理也比较简单，直接在 IAM 中创建一个拥有高权限的用户即可。

例如这里选择添加用户，访问类型选择控制台密码

</br><img width="800" src="/img/1651980416.png"></br>

「设置权限」选择「直接附加现有策略」，策略选择「AdministratorAccess」，即表示附加所有策略

</br><img width="800" src="/img/1651980443.png"></br>

创建完成后，会提供自动生成的密码与登录地址，使用这个登录地址和密码直接登录即可，这时我们就制作好了一个后门账户。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月8日"
    }
  }
</script>
