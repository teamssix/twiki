---
title: 利用 aws cli 执行命令
---
<center><h1>利用 aws cli 执行命令</h1></center>

---

当目标实例被 AWS Systems Manager 代理后，除了在控制台可以执行命令外，拿到凭证后使用 AWS 命令行也可以在 EC2 上执行命令。

列出目标实例 ID

```bash
aws ec2 describe-instances --filters "Name=instance-type,Values=t2.micro" --query "Reservations[].Instances[].InstanceId"
```

在对应的实例上执行命令，注意将 instance-ID 改成自己实例的 ID

```bash
aws ssm send-command \
    --instance-ids "instance-ID" \
    --document-name "AWS-RunShellScript" \
    --parameters commands=ifconfig \
    --output text
```

获得执行命令的结果，注意将 $sh-command-id 改成自己的 Command ID

```bash
aws ssm list-command-invocations \
    --command-id $sh-command-id \
    --details
```

   <img width="1000" src="/img/1657788829.png">

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年7月14日"
    }
  }
</script>