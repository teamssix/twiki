---
title: Bucket Object 遍历

---

<center><h1>Bucket Object 遍历</h1></center>

---

在 s3 中如果在 Bucket 策略处，设置了 s3:ListBucket 的策略，就会导致 Bucket Object 遍历

</br>

<img width="1000" src="/img/1652254813.png"></br>

将 Key 里的值拼接到目标站点后，就能访问该 Bucket 里相应的对象了

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月11日"
    }
  }
</script>