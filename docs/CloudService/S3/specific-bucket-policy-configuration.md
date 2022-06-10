---
title: 特定的 Bucket 策略配置
---

<center><h1> 特定的 Bucket 策略配置</h1></center>

---

有些 Bucket 会将策略配置成只允许某些特定条件才允许访问，当我们知道这个策略后，就可以访问该 Bucket 的相关对象了。

例如下面这个策略：

</br>

<img width="1000" src="/img/1650007271.png"></br>

```python
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "TeamsSixFlagPolicy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::teamssix/flag",
            "Condition": {
                "StringLike": {
                    "aws:UserAgent": "TeamsSix"
                }
            }
        }
    ]
}
```

当直接访问 teamssix/flag 的时候会提示 AccessDenied

</br>

<img width="1200" src="/img/1650007290.png"></br>

而加上对应的 User-Agent 时，就可以正常访问了

</br>

<img width="1200" src="/img/1650007347.png"></br>

在实战中，可以去尝试读取对方的策略，如果对方策略没做读取的限制，也许就能读到。

其次在进行信息收集的时候，可以留意一下对方可能会使用什么策略，然后再去尝试访问看看那些原本是 AccessDenied 的对象是否能够正常访问。

> 参考资料：https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/access-policy-language-overview.html

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>