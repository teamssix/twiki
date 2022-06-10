---
title: S3 任意文件上传

---

<center><h1>S3 任意文件上传</h1></center>

---

如果对象存储配置不当，比如公共读写，那么可能就会造成任意文件上传与文件覆盖。

</br>

<img width="1000" src="/img/1652255086.png"></br>

如果目标的对象存储支持 html 解析，那就可以利用任意文件上传进行 XSS 钓鱼、挂暗链、挂黑页、供应链投毒等操作。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月11日"
    }
  }
</script>