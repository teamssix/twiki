---
title: Bucket 策略可写


---

<center><h1>Bucket 策略可写</h1></center>

---

## 修改策略获得敏感文件

现有以下 Bucket 策略

</br>

<img width="800" src="/img/1650007548.png"></br>

可以看到根据当前配置，我们可以对 Bucket 策略进行读写，但如果想读取 s3://teamssix/flag 是被禁止的

<img width="1000" src="/img/1650007587.png"></br>

因为当前策略允许我们写入 Bucket 策略，因此可以将策略里原来的 Deny 改为 Allow，这样就能访问到原来无法访问的内容了。

修改后的策略如下：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetBucketPolicy",
                "s3:PutBucketPolicy"
            ],
            "Resource": [
                "arn:aws:s3:::teamssix"
            ]
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::teamssix/flag"
            ]
        }
    ]
}
```

这里将第 20 行由原来的 Deny 改成了 Allow

<img width="800" src="/img/1650007686.png"></br>

当策略写入后，可以看到成功获取到了原本 Deny 的内容

<img width="500" src="/img/1650007708.png"></br>

## 修改网站引用的 s3 资源进行钓鱼

例如这样的一个页面

<img width="1200" src="/img/1650007731.png"></br>

查看源代码可以看到引用了 s3 上的资源

<img width="1200" src="/img/1650007750.png"></br>

查看 Bucket 策略，发现该 s3 的 Bucket 是可读可写的

<img width="1200" src="/img/1650007767.png"></br>

这时我们可以修改 Bucket 的静态文件，使用户输入账号密码的时候，将账号密码传到我们的服务器上

<img width="1200" src="/img/1650007791.png"></br>

当用户输入账号密码时，我们的服务器就会收到请求了

<img width="800" src="/img/1650007813.png"></br>

## 修改 Bucket 策略为 Deny 使业务瘫痪

当策略可写的时候，除了上面的将可原本不可访问的数据设置为可访问从而获得敏感数据外，也可以将原本可访问的资源权限设置为不可访问.

也就是说如果目标网站引用了某个 s3 上的资源文件，而且我们可以对该策略进行读写的话，就可以将原本可访问的资源权限设置为不可访问，这样就会导致网站瘫痪了。

例如这里将策略设置为 Deny

<img width="800" src="/img/1650007832.png"></br>

当策略 PUT 上去后，网站业务就无法正常使用了

<img width="1000" src="/img/1650007849.png"></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>