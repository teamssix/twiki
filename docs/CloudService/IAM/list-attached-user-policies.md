---
title: 查看自己所拥有的权限

---

<center><h1>在 AWS 下查看自己所拥有的权限</h1></center>

---

## 我是谁？

当我们拿到 AWS 访问凭证后，往往会面临一个问题，我是谁？

通过下面这条命令就能看到自己当前是那个用户了，如果返回的是 root 用户，那么恭喜你，你拥有所有的权限。

```shell
aws iam get-user
```

```shell
> aws iam get-user
{
    "User": {
        "UserId": "0123456789",
        "Arn": "arn:aws:iam::0123456789:root",
        "CreateDate": "2022-01-01T01:01:01Z",
        "PasswordLastUsed": "2022-01-01T01:01:01Z"
    }
}
```

如果返回的不是 root 那么说明当前不是根用户

```shell
> aws iam get-user
{
    "User": {
        "Path": "/",
        "UserName": "test",
        "UserId": "ABCDEFGHIJKLMNOPQRST",
        "Arn": "arn:aws:iam::0123456789:user/test",
        "CreateDate": "2022-01-01T01:01:01Z",
        "PasswordLastUsed": "2022-01-01T01:01:01Z"
    }
}
```

## 我能做什么？

通过下面这条命令，就可以看到自己所拥有的权限了

```shell
aws iam list-attached-user-policies --user-name test
```

```shell
> aws iam list-attached-user-policies --user-name test
{
    "AttachedPolicies": [
        {
            "PolicyName": "IAMFullAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/IAMFullAccess"
        },
        {
            "PolicyName": "AmazonECS_FullAccess",
            "PolicyArn": "arn:aws:iam::aws:policy/AmazonECS_FullAccess"
        }
    ]
}
```

不过能看到自己权限的前提是需要先拥有 iam 的相关权限，不然就会返回 AccessDenied

```shell
> aws iam list-attached-user-policies --user-name test

An error occurred (AccessDenied) when calling the ListAttachedUserPolicies operation: User: arn:aws:iam::0123456789:user/test is not authorized to perform: iam:ListAttachedUserPolicies on resource: user test because no identity-based policy allows the iam:ListAttachedUserPolicies action
```

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年5月7日"
    }
  }
</script>