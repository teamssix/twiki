---
title: AWS 控制台接管

---

<center><h1>AWS 控制台接管</h1></center>

---

如果拿到了 AWS 凭证，可以进行控制台的接管，这里以 pacu 工具为例。

> 关于 AWS 凭证的获取可以看 [EC2 所面临的风险](/CloudService/EC2/) 部分的内容

pacu 工具里包含了很多 AWS 利用模块，首先使用 set_keys 命令将刚才获取到的 key 值添加到工具里。

</br><img width="600" src="/img/1649997441.png"></br>

接下来输入 console 命令，得到一个 URL。

</br>

<img width="600" src="/img/1649997451.png"></br>

将该 URL 粘贴到浏览器，就可以访问到目标的控制台了，这时就可以做很多操作了，比如连接到实例上执行命令。

</br>

<img width="1200" src="/img/1649997471.png"></br>

在 pacu 下使用 list 还可以查看到其他的模块，例如使用`run ec2__enum`可以枚举出当前账号下的所有的 EC2

</br>

<img width="500" src="/img/1649997486.png"></br>



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022 年 4 月 15 日"
    }
  }
</script>