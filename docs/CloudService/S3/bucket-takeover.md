---
title: Bucket 接管


---

<center><h1>Bucket 接管</h1></center>

---

假如在进行渗透时，发现目标的一个子域显示如下内容

</br>

<img width="800" src="/img/1650005828.png"></br>

通过 cname 记录，可以判断出这是一个 Amazon 的 S3，而且页面显示 NoSuchBucket，说明这个 Bucket 可以接管的，同时 Bucket 的名称在页面中也告诉了我们，为 `test.teamssix.com`



那么我们就直接在 AWS 控制台里创建一个名称为 `test.teamssix.com` 的 Bucket 就可以接管了

</br>

<img width="800" src="/img/1650005891.png"></br>

创建完 Bucket 后，再次访问发现就显示 AccessDenied 了，说明该 Bucket 已经被我们接管了。

</br>

<img width="800" src="/img/1650005911.png"></br>

将该 Bucket 设置为公开，并上传个文件试试

</br>

<img width="1000" src="/img/1650005931.png"></br>

在该子域名下访问这个 test.txt 文件

</br>

<img width="800" src="/img/1650005950.png"></br>

可以看到通过接管 Bucket 成功接管了这个子域名的权限

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>

