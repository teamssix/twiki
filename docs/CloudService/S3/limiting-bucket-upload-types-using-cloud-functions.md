---
title: 使用云函数限制存储桶上传类型

---

<center><h1>使用云函数限制存储桶上传类型</h1></center>

---

## 前言

相信不少师傅都挖到过存储桶任意文件上传的漏洞，不过由于存储桶的特性，这种任意文件上传的危害性相对传统站点要低一些，但仍然具备一定的风险，比如可以被拿来当做钓鱼或者挂黑页等等。

常规修复这类风险的办法是通过在后端代码里限制文件的上传类型，网上已经有了相应的文章，本文将探讨另外一个方法，即使用云函数去限制存储桶的文件上传类型。

本文将以限制存储桶只能上传图片的场景为例，至于怎么限制其他类型则只需要对函数代码稍加修改就能实现，为了更好的理解本文内容，这里简单绘制了一个流程图如下。

<img width="1000" src="/img/2000000033.jpg"></br>

## 操作步骤

这里以阿里云为例，首先在函数计算 FC 服务里创建一个事件函数，这里函数的区域需要和目标存储桶的区域保持一致。

<img width="1000" src="/img/2000000034.png"></br>

运行环境选择 Python，然后将下面的代码保存为 index.py 文件后压缩成 ZIP 包，再将 ZIP 包上传到云函数中。

```python
import os
import json
import oss2
import imghdr


def handler(event, context):
    # 获取临时访问凭证并进行认证
    creds = context.credentials
    auth = oss2.StsAuth(creds.access_key_id, creds.access_key_secret, creds.security_token)

    # 获取上传文件的相关信息
    evt_lst = json.loads(event)
    evt = evt_lst['events'][0]
    bucket_name = evt['oss']['bucket']['name']
    object_key = evt['oss']['object']['key']
    endpoint = 'oss-' + evt['region'] + '-internal.aliyuncs.com'
    bucket = oss2.Bucket(auth, endpoint, bucket_name)

    # 获取上传文件的后缀类型
    upload_file_suffix_type = os.path.splitext(object_key)[1].replace('.', '')

    # 获取上传文件的内容类型
    head_result = bucket.head_object(object_key)
    upload_file_content_type = head_result.headers.get('Content-Type')

    # 获取上传文件的文件头类型
    upload_file_content = bucket.get_object(object_key).read()
    upload_file_header_type = imghdr.what(None, h=upload_file_content[:32])

    print(f'[+] 文件上传路径：oss://{bucket_name}/{object_key}')
    print(f'[+] 文件头类型：{upload_file_header_type}')
    print(f'[+] 文件后缀类型：{upload_file_suffix_type}')
    print(f'[+] 文件 Content-Type：{upload_file_content_type}')

    # 允许上传的文件类型列表
    allowed_types = ['jpg', 'jpeg', 'png', 'gif']
    allowed_content_types = ['image/jpeg', 'image/png', 'image/gif']

    # 检查文件类型是否合规
    Compliant = 0
    print('[+] 正在检查上传的文件是否合规 ……')
    if upload_file_header_type not in allowed_types:
        print('[-] 文件头类型检查不通过。')
    else:
        print('[+] 文件头类型检查通过。')
        if upload_file_suffix_type not in allowed_types:
            print('[-] 文件后缀类型检查不通过。')
        else:
            print('[+] 文件后缀类型检查通过。')
            if upload_file_content_type not in allowed_content_types:
                print('[-] 文件 Content Type 检查不通过。')
            else:
                print('[+] 文件 Content Type 检查通过。')
                Compliant = 1

    # 删除不允许上传的文件
    if Compliant:
        print(f'[+] 文件 oss://{bucket_name}/{object_key} 检查通过。')
    else:
        print(f'[-] 文件 oss://{bucket_name}/{object_key} 检查不通过，正在删除该文件。')
        bucket.delete_object(object_key)
        print(f'[!] 文件 oss://{bucket_name}/{object_key} 已被删除。')
```

由于我们在这里的 Python 代码中需要调用到 GetObject 和 DeleteObject 的 API，因此还需要为这个函数配置一个至少具备这两个操作权限的角色。

这里我们在 IAM 里创建一个角色，这个角色的最低权限要求如下：

```json
{
  "Version": "1",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "oss:GetObject",
        "oss:DeleteObject"
      ],
      "Resource": "acs:oss:oss-<your_bucket_region>:<your_account_id>:<your_bucket_name>/*"
    }
  ]
}
```

信任策略如下：

```json
{
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "fc.aliyuncs.com"
        ]
      }
    }
  ],
  "Version": "1"
}
```

角色创建完成后，在「高级配置」这里选择我们在函数中要使用的角色名称，其他地方可以保持默认或者根据自己的需求进行修改，最后点击函数「创建」按钮。

<img width="1000" src="/img/2000000035.png"></br>

创建完云函数后，我们还需要为这个函数创建一个触发器，从而让存储桶有文件上传时能够触发这个函数的执行。

在函数配置页面中，选择「触发器」，点击「创建触发器」，触发类型选择 OSS，Bucket 名称选择自己需要限制文件上传类型的 Bucket，触发事件这里选择 PutObject，角色直接使用默认角色，最后点击「确定」，这样所有的配置就完成了。

<img width="1000" src="/img/2000000036.png"></br>

此时我们向存储桶上传一个正常的文件，可以看到三项检查都是通过的，这样文件是能正常上传的。

<img width="1000" src="/img/2000000037.png"></br>

如果上传一个后缀是 html 的文件，那么检查就是不通过的，此时云函数就会把这个文件从存储桶中删掉。

<img width="1000" src="/img/2000000038.png"></br>

如果上传的文件名是 png 后缀的，Content-Type 是 image/jpeg，但 Body 部分不是图片类型同样也会无法上传。

<img width="1000" src="/img/2000000039.png"></br>

到此为止，已经能够基本实现使用云函数去限制文件上传类型了，不过这里还有一些可以优化的地方以及一些局限性留给读者探讨。

**可以优化的地方：**

1. 如果想识别其他类型的文件，例如 zip、txt 等格式，这里使用的 imghdr 库就不够用了，imghdr 只能识别出图片文件的类型，这时可以使用第三方库，例如 python-magic 库。
2. 这里代码中采取的策略是检测到不合规的文件会直接执行删除操作，在实际场景中直接删除可能具有一定的风险性，尤其是存在存储桶同名称覆盖问题的时候，因此这里还是需要根据自身业务情况做适当的调整。

**存在局限性的地方：**

由于云函数里的 OSS 触发器只能采取异步的方式执行，因此云函数在触发时，文件就已经被上传到存储桶里了，所以没办法解决在上传同名称文件时被覆盖的问题，这个问题目前似乎只能通过后端代码去解决。

## 总结

本文为限制存储桶文件上传类型提供了一个新的解决方案，但也具备一定的局限性。

此外在当前存储桶策略里我注意到在资源路径下可以使用 *.png 来限制文件的上传后缀，不过目前还没办法限制 Content Type，在此也希望云厂商能够在存储桶策略里加上限制 Content Type 的策略，这样限制存储桶的文件上传类型就更方便了，提升存储桶的安全性也会变得更加简单。

不过如果想要有更严格的限制策略，那么还是云函数或者后端代码具有更高的自由度。


<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2024 年 6 月 9 日"
    }
  }
</script>