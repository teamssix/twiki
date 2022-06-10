---
title: RDS 信息收集
---
<center><h1>RDS 信息收集</h1></center>

---

## 通知邮箱

在 AWS RDS 的控制台处，可以在编辑警报处看到目标配置的通知邮箱地址，这种邮箱地址可能是目标公司的安全部门人员邮箱，应该予以关注。

</br><img width="800" src="/img/1651979355.png"></br>

## 性能详情

在 AWS RDS 控制台中，可以通过数据库性能详情信息，收集到目标 RDS TOP SQL 语句、TOP 连接主机、TOP 用户等信息。

</br><img width="800" src="/img/1651979406.png"></br>

## 共享快照

对于 AWS RDS，可以在共享快照中，根据快照名称判断查找，看看是否有和目标相关联的快照，然后再通过还原快照的方式，获得快照中 RDS 的数据。

</br><img width="1000" src="/img/1651979469.png"></br>



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月8日"
    }
  }
</script>