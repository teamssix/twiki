---
title: 利用信任策略枚举云上用户与角色

---

<center><h1>利用信任策略枚举云上用户与角色</h1></center>

---

本文介绍一种枚举云上用户和角色的方法，这个方法属于云平台的正常功能，不属于漏洞也不属于配置错误，本文仅可用于技术交流分享目的。

## 原理

以阿里云为例，一个常见的角色信任策略如下所示：

```json
{
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "RAM": [
          "acs:ram::1234567890123456:user/test"
        ]
      }
    }
  ],
  "Version": "1"
}
```

在这个策略中，Principal 的 RAM 中包含的是 ARN 信息，即 Aliyun Resource Name，格式一般有如下几种：

```bash
acs:ram::${AccountId}:root
acs:ram::${AccountId}:user/${UserName}
acs:ram::${AccountId}:role/${RoleName}
acs:ram::${AccountId}:policy/${PolicyName}
```

> 关于 ARN，AWS 的 ARN 全称是 Amazon Resource Name，我注意到腾讯云也叫 ARN，不过就不知道它的全称是什么了

如果角色的信任策略能够成功保存，就说明 ARN 是有效的。例如如果上面的策略能够成功保存，说明账号 1234567890123456 下的 test 用户是存在的，那么下面来看看这个具体是怎么操作的。

## 具体步骤

首先，根据上面的原理，我们想要构造对方的 ARN 值，就需要先知道对方的 Account ID 值，有了这个值我们才知道要枚举那个云上用户，账号 ID 这个值可以通过 GitHub 等常规信息收集方法去获取，这里就不多赘述了，那么接下来，就开始枚举用户吧。

依然以阿里云为例，首先我们需要创建一个角色，打开阿里云的「RAM 访问控制」页面，找到「身份管理」-「角色」页面，然后点击「创建角色」- 选择「阿里云账号」类型 - 随便输入角色的名称 - 在「选择信任的云账户」处选择「当前云账号」- 点击「完成」- 最后点击「关闭」。

<div align=center><img width="900" src="/img/image-20231027174123419.png" div align=center/></div></br>

这样一个角色就创建好了，我们来到角色的「信任策略管理」页面，点击「修改信任策略」，这里我们尝试将策略里的 ARN 修改为 `acs:ram::1234567890123456:user/test`，点击保存发现提示 `策略格式错误`，无法保存成功。

<div align=center><img width="900" src="/img/image-20231027174403985.png" div align=center/></div></br>

这时，我们输入一个正确的用户 ARN，就能保存成功了，通过这个特性，我们就能枚举用户名称了。

<div align=center><img width="900" src="/img/image-20231027174607282.png" div align=center/></div></br>

枚举角色也是一样的道理，只需要将 ARN 中 user 改成 role 就行。

## 脚本批量枚举

手动一点点枚举比较麻烦，这里用 Python 简单写个批量枚举的脚本。

```python
import json
from aliyunsdkcore.client import AcsClient
from aliyunsdkram.request.v20150501 import UpdateRoleRequest


def get_input():
    account = input("请输入账号 ID: ")
    type_ = input("请输入类型: ")
    role = input("请输入要修改信任策略的角色名称：")
    dict = input("请输入字典文件: ")
    with open(dict, 'r') as file:
        names = file.readlines()
    return account, type_, names, role


def update_role_policy(account, type_, name, client, role):
    policy = {
        "Statement": [
            {
                "Action": "sts:AssumeRole",
                "Effect": "Allow",
                "Principal": {
                    "RAM": [f"acs:ram::{account}:{type_}/{name.strip()}"]
                }
            }
        ],
        "Version": "1"
    }

    request = UpdateRoleRequest.UpdateRoleRequest()
    request.set_RoleName(role.strip())
    request.set_NewAssumeRolePolicyDocument(json.dumps(policy))

    try:
        client.do_action_with_exception(request)
        print(f"[+] SUCCEEDED\t{name.strip()}")
    except Exception as e:
        print(f"[-] FAILED\t{name.strip()} -> {str(e)}")


def main():
    ACCESS_KEY = 'YOUR_ACCESS_KEY'
    SECRET_KEY = 'YOUR_SECRET_KEY'
    REGION = 'cn-hangzhou'

    client = AcsClient(ACCESS_KEY, SECRET_KEY, REGION)

    account, type_, names, role = get_input()

    for name in names:
        update_role_policy(account, type_, name, client, role)


if __name__ == "__main__":
    main()
```

注意脚本里的 Access Key 需要手动修改一下，然后使用 pip 安装第三方库后就可以使用了。

```bash
pip install aliyunsdkcore aliyun-python-sdk-ram
python enum_arn.py
```

<div align=center><img width="500" src="/img/image-20231027202307000.png" div align=center/></div></br>


遍历角色也可以，只需要把输入类型改为 role 即可。

<div align=center><img width="500" src="/img/image-20231027202407196.png" div align=center/></div>

## 最后

这样，通过返回状态的不同我们就能判断目标账号下是否存在对应的角色与用户了，其实这里还有许多其他可玩的技巧，例如判断账号 ID 是否有效，枚举这个账号可能使用了哪些云服务等等，这些就留给读者自行探索了。

另外，如果字典太大的话，用上面的脚本枚举起来就会比较慢，所以如果你感兴趣的话，不妨试试将它改成多线程，上述的操作因为都是在我们自己的云账户中进行的，所以我们所枚举的目标账号是不会有任何感知的，只要用脚本枚举的时候，线程不超过云平台的速率限制就行。

> 此文已同步更新到我的公众号：TeamsSix

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 10 月 28 日"
    }
  }
</script>
