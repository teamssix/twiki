---
title: 使用用户数据执行命令


---

<center><h1>使用用户数据执行命令</h1></center>

---

## 前言

在创建云服务器时，用户可以通过指定自定义数据，进行配置实例，当云服务器启动时，自定义数据将以文本的方式传递到云服务器中，并执行该文本，而且文本里的命令默认以 root 权限执行。

通过这一功能，攻击者可以修改实例的用户数据并向其中写入待执行的命令，这些代码将会在实例每次启动时自动执行。

## 控制台

在控制台界面可以直接编辑实例的用户数据。

在 AWS 下，修改用户数据需要停止实例，在 AWS 下停止实例会擦除实例存储卷上的所有数据，如果没设置弹性 IP，实例的公有 IP 也会变化，因此停止实例需谨慎。

修改用户数据的位置在：操作-> 实例设置->编辑用户数据

</br>

<img width="400" src="/img/1649998078.png"></br>

这里以执行 touch 命令为例，如果用户数据设置为以下内容，那么实例只有才第一次启动才会运行

```bash
#!/bin/bash
touch /tmp/teamssix.txt
```

如果用户数据设置为以下内容，那么实例只要重启就会运行

```bash
Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:
- [scripts-user, always]

--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
touch /tmp/teamssix.txt
--//--
```

</br>

<img width="800" src="/img/1649998187.png"></br>

保存用户数据后启动实例，这时进入实例，就可以看到刚才创建的文件了，这说明刚才的命令已经被执行了

</br>

<img width="600" src="/img/1649998204.png"></br>

## 命令行

除了在控制台上操作的方式外，也可以使用 aws cli 操作

```bash
aws ec2 run-instances --image-id ami-abcd1234 --count 1 --instance-type m3.medium \
--key-name my-key-pair --subnet-id subnet-abcd1234 --security-group-ids sg-abcd1234 \
--user-data file://my_script.txt
```

`my_script.txt`就是要执行的脚本

查看实例用户数据

```bash
aws ec2 describe-instance-attribute --instance-id i-1234567890abcdef0 --attribute userData --output text --query "UserData.Value" | base64 --decode
```

> 参考资料：
>
> https://aws.amazon.com/cn/premiumsupport/knowledge-center/execute-user-data-ec2/

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年4月15日"
    }
  }
</script>