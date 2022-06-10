---
title: Object ACL 可写


---

<center><h1>Object ACL 可写</h1></center>

---

读取 Object 时提示被禁止

</br>

<img width="800" src="/img/1650006998.png"></br>

查看目标 Object 策略发现是可读的，且内容如下：

```bash
aws s3api get-object-acl --bucket teamssix --key flag
```

</br>

<img width="800" src="/img/1650007025.png"></br>

这个策略和上面的 Bucket ACL 策略一样，表示任何人都可以访问、写入当前 ACL，但是不能读取、写入对象



将权限修改为 FULL_CONTROL 后，Object ACL 策略如下：

```json
{
    "Owner": {
        "ID": "d24***5"
    },
    "Grants": [
	{
            "Grantee": {
                "Type": "Group", 
                "URI": "http://acs.amazonaws.com/groups/global/AllUsers"
            }, 
            "Permission": "FULL_CONTROL"
        } 
    ]
}
```

将该策略写入后，就可以读取对象了

```bash
aws s3api put-object-acl --bucket teamssix --key flag --access-control-policy file://acl.json
```

</br>

<img width="1000" src="/img/1650007059.png"></br>



<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>