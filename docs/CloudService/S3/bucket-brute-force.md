---
title: Bucket 爆破

---

<center><h1>Bucket 爆破</h1></center>

---

当不知道 Bucket 名称的时候，可以通过爆破获得 Bucket 名称，这有些类似于目录爆破，只不过目录爆破一般通过状态码判断，而这个通过页面的内容判断。

当 Bucket 不存在时有两种返回情况，分别是 InvalidBucketName 和 NoSuchBucket

</br>

<img width="700" src="/img/1650005494.png"></br>

</br>

<img width="700" src="/img/1650005540.png"></br>

当 Bucket 存在时也会有两种情况，一种是列出 Object

</br>

<img width="700" src="/img/1650005558.png"></br>

另一种是返回 AccessDenied

</br>

<img width="700" src="/img/1650005584.png"></br>

这样通过返回内容的不同，就可以进行 Bucket 名称爆破了，知道 Bucket 名称后，Key 的爆破也就很容易了。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>